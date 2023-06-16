import { marked } from "marked";
import * as React from "react";
import hljs from "highlight.js";
import "highlight.js/styles/dark.css";
import { parseFilename } from "./Post.utils";
import styled from "@emotion/styled";

type MarkdownCode = string & { type: 'markdown-code' };

const MarkdownContainer = styled.div({
    img: {
        maxWidth: '100%',
    }
})

const Post: React.FC<{ url: string }> = ({ url }) => {
    const { date, title } = React.useMemo(() => parseFilename(url), [url]);
    const [markdownSource, setMarkdownSource] = React.useState<null | MarkdownCode>(null);
    const [error, setError] = React.useState<null | Error>(null);

    React.useEffect(() => {
        fetch(`posts/${url}`)
            .then(result => {
                if (result.status !== 200) {
                    throw new Error("Post not found");
                }
                return result.text();
            })
            .then((markdown) => {
                if (markdown.startsWith('<!DOCTYPE html>')) {
                    throw new Error("Post not formatted correctly");
                }
                setMarkdownSource(markdown as MarkdownCode);
            })
            .catch((error: Error) => {
                setError(error);
            })
    }, [url])

    const key = `html-content-${url}`;
    const [htmlContent, setHtmlContent] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (markdownSource) {
            const markedHtmlContent = marked(markdownSource, {
                highlight: function (code, lang) {
                    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                    return hljs.highlight(code, { language }).value;
                },
            });
            localStorage.setItem(key, markedHtmlContent);
            setHtmlContent(markedHtmlContent);
        }
    }, [key, markdownSource])

    React.useEffect(() => {
        setHtmlContent(current => current || localStorage.getItem(key));
    }, [key]);

    if (error !== null) {
        return (
            <div>
                <h2>{error.name}: {error.message}</h2>
            </div>
        )
    }

    return (
        <MarkdownContainer>
            <h2>{title}</h2>
            <div>{new Date(date.t).toDateString()}</div>
            <hr />
            {htmlContent && (
                <div dangerouslySetInnerHTML={{
                    __html: htmlContent,
                }}></div>
            )}
        </MarkdownContainer>
    );
}


export default Post;
