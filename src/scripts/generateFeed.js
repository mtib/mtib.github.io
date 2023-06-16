const fs = require('fs/promises');
const path = require('path');
const hash = require('crypto');

const outputFile = path.join(__dirname, '../../dist/posts/feed.rss');
const postDir = path.join(__dirname, '../../dist/posts');

/**
 * 
 * @param {string} unsafe 
 * @returns {string}
 */
const escapeHTML = function (unsafe) {
    return unsafe.replace(/[&<"'>]/g, function (m) {
        switch (m) {
            case '&':
                return '&amp;';
            case '<':
                return '&lt;';
            case '"':
                return '&quot;';
            default:
                return '&#039;';
        }
    });
};

fs.readdir(postDir)
    .then(async (files) => {
        const mdfiles = files.filter(file => file.endsWith('.md'));
        mdfiles.sort().reverse();
        const data = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
    <atom:link href="https://blog.mtib.dev/posts/feed.rss" rel="self" type="application/rss+xml" />
    <title>blog.mtib.dev</title>
    <link>https://blog.mtib.dev/</link>
    <description>Markus' Blog</description>
    ${(await Promise.all(mdfiles.map(async filename => `<item>
        <title>${filename}</title>
        <pubDate>${new Date(filename.slice(0, 10)).toUTCString()}</pubDate>
        <link>https://blog.mtib.dev/?post=${encodeURIComponent(filename)}</link>
        <description>${await fs.readFile(path.join(postDir, filename), { encoding: 'utf8' }).then(escapeHTML).then(content => content.split('\n')[0] + '...')}</description>
        <guid>https://blog.mtib.dev/?post=${encodeURIComponent(filename)}?${hash.createHash('sha256').update(filename).update(await fs.readFile(path.join(postDir, filename), { encoding: 'utf8' })).digest('hex')}</guid>
    </item>`))).join('\n    ')}
</channel>
</rss>`;
        return data;
    })
    .then((data) => {
        return fs.writeFile(outputFile, data);
    });
