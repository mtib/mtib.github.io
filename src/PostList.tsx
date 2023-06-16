import styled from "@emotion/styled";
import * as React from "react";
import { parseFilename } from "./Post.utils";
import { useRouter } from "./Router";

type PostData = {
    url: string,
} & ReturnType<typeof parseFilename>;

const PostList: React.FC<{ url: string }> = ({ url }) => {
    const [posts, setPosts] = React.useState<null | PostData[]>(null);

    React.useEffect(() => {
        const key = `post-${url}`;
        const cachedPosts = localStorage.getItem(key);
        if (cachedPosts) {
            try {
                setPosts(JSON.parse(cachedPosts));
            } catch {
                // ignore
            }
        }
        fetch(url)
            .then(response => response.json())
            .then((data: { url: string }[]) => {
                const parsedData = data.map(post => {
                    const parsed_data = parseFilename(post['url']);
                    Object.assign(parsed_data, post)
                    return parsed_data as PostData;
                })
                parsedData.sort((a, b) => b.date.t - a.date.t);
                setPosts(parsedData);
                localStorage.setItem(key, JSON.stringify(parsedData));
            });
    }, [url])

    if (posts == null) {
        return (
            <div>
                <p>Loading from {url}</p>
            </div>
        );
    } else {
        return (
            <div>
                <ul>
                    {posts.map((m) => <li key={m.url}><PostEntry url={m.url} date={m.date} title={m.title} /></li>)}
                </ul>
            </div>
        );
    }
};

const DateSpan = styled.span({
    fontFamily: 'monospace',
    flexShrink: 0,
});

const PostEntryLink = styled.a({
    display: 'inline-flex',
    gap: '10px',
});

const PostEntry: React.FC<PostData> = ({ url, title, date }) => {
    const slug = React.useMemo(() => url.slice(0, -3), [url]);
    const { setPost } = useRouter();
    const onClick = React.useCallback((event: React.MouseEvent) => {
        event.preventDefault();
        setPost(url);
    }, [setPost, url]);
    return (
        <PostEntryLink
            onClick={onClick}
            href={`/${slug}`}
        >
            <DateSpan className="d-none d-sm-inline">
                {date.y}-{date.m.toString().padStart(2, '0')}-{date.d.toString().padStart(2, '0')}
            </DateSpan>
            <span className="d-none d-sm-inline">&mdash;</span>
            <span>
                {title}
            </span>
        </PostEntryLink>
    );
}

export default PostList;
