const fs = require('fs/promises');
const path = require('path');
const marked = require('marked').marked;
const hljs = require('highlight.js');

/**
 * @param {string[]} end
 */
const distPath = (...end) => {
    return path.join(__dirname, '../../dist', ...end);
};

const outputFile = distPath('posts/list.json');

(async () => {
    const files = await fs.readdir(distPath('posts'));
    const mdfiles = files.filter(file => file.endsWith('.md'));
    for (let file of mdfiles) {
        const mdContents = (await fs.readFile(distPath('posts', file))).toString('utf-8');
        const markedHtmlContent = marked(mdContents, {
            highlight: function (code, lang) {
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                return hljs.highlight(code, { language }).value;
            },
        });
        const basename = file.replace(/\.md$/, '');
        const data = `<html>
    <head>
        <meta charset="UTF-8">
        <title>${basename.replace(/-/g, ' ')}</title>
        <link rel="canonical" href="https://blog.mtib.dev/#${basename}" />
        <style>body, :root {background-color: black; color: white;}</style>
        <meta http-equiv="Refresh" content="0; url='https://blog.mtib.dev/#${basename}'" />
    </head>
    <body>${markedHtmlContent}</body>
</html>`;
        fs.writeFile(distPath(file.replace(/\.md$/, '.html')), data);
    }
    const now = new Date();
    const sitemapxml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://blog.mtib.dev/</loc>
        <lastmod>${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}</lastmod>
    </url>
${mdfiles.map(file => file.replace(/\.md$/, ''))
            .map(htmlfile => (
                `   <url>
        <loc>https://blog.mtib.dev/${htmlfile}</loc>
        <lastmod>${htmlfile.slice(0, 10)}</lastmod>
    </url>
    <url>
        <loc>https://blog.mtib.dev/#${htmlfile}</loc>
        <lastmod>${htmlfile.slice(0, 10)}</lastmod>
    </url>
`)).join('')}</urlset>`;
    await fs.writeFile(distPath('sitemap.xml'), sitemapxml);
    mdfiles.sort();
    const data = JSON.stringify(mdfiles.map(file => ({ url: file })), null, 4);
    await fs.writeFile(outputFile, data);
})();
