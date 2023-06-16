import * as React from 'react';

type RouterContextType = {
    post: string | null;
    setPost: (nextPost: string | null) => void;
};

const RouterContext = React.createContext<RouterContextType | null>(null);

const navigationEvents = ['load', 'hashchange', 'popstate', 'pushstate', 'pageshow', 'beforeunload'] as const

const Router: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
    const [post, setPost] = React.useState<null | string>(null);
    const updateFromLocation = React.useCallback((url: URL) => {
        if (url.hash && url.hash !== '#') {
            setPost(`${decodeURIComponent(url.hash.slice(1))}.md`);
        } else {
            setPost(null);
        }
    }, []);

    React.useEffect(() => {
        const callback = (event?: Event) => {
            try {
                updateFromLocation(new URL(window.location.href));
                if (event) {
                    event.preventDefault();
                }
            } catch {
                // Ignore
            }
        }
        callback();
        navigationEvents.forEach((event) => {
            addEventListener(event, callback);
        })
        return () => {
            navigationEvents.forEach((event) => {
                removeEventListener(event, callback);
            })
        };
    }, [updateFromLocation]);

    const guardedSetPost = React.useCallback((nextPost: string | null) => {
        if (nextPost === null) {
            window.location.hash = "";
            setPost(null);
        } else {
            const slug = nextPost.slice(0, -3);
            const targetUrl = new URL(window.location.href);
            targetUrl.hash = slug;
            history.pushState(undefined, '', targetUrl);
            setPost(nextPost)
        }
    }, []);

    const value = React.useMemo(() => ({
        post,
        setPost: guardedSetPost,
    }), [guardedSetPost, post]);

    return (
        <RouterContext.Provider value={value}>
            {children}
        </RouterContext.Provider>
    )
}

export const useNullableRouter = () => React.useContext(RouterContext);
export const useRouter = () => {
    const context = useNullableRouter();
    if (context === null) {
        throw new Error('Cannot use router outside of RouterContext');
    }
    return context;
}

export default Router;
