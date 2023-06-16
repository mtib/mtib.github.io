import * as React from "react";
import Post from "./Post";
import { useRouter } from "./Router";
import Home from "./Home";
import Theme from "./Theme";
import ToggleMode from "./ToggleMode";
import styled from "@emotion/styled";

const PostNavBar = styled.div({
  display: 'flex',
  gap: '10px',
  justifyContent: 'space-between',
});

const App: React.FC = () => {
  const {
    post,
    setPost,
  } = useRouter();

  const buildTime = React.useMemo(() => {
    if (process.env.BUILD_DATE) {
      return Number.parseInt(process.env.BUILD_DATE, 10);
    }
    return new Date().getTime() / 1000;
  }, []);
  const buildDate = React.useMemo(() => {
    const date = new Date();
    date.setTime(buildTime * 1000);
    return date;
  }, [buildTime]);

  return (
    <Theme>
      <div className="container">
        {post === null
          ? <Home />
          : (
            <>
              <PostNavBar className="pt-3">
                <a href="/" onClick={(e) => { e.preventDefault(); setPost(null); }}>Home</a>
                <ToggleMode />
              </PostNavBar>
              <Post url={post} />
            </>
          )}
        <div className="p-3 d-flex flex-column" style={{ textTransform: 'uppercase', fontWeight: 100 }}>
          {[
            ['last update', buildDate.toLocaleString()],
          ].map(([k, v]) => (
            <div key={k} className="d-flex flex-row" style={{ gap: '10px' }}>
              <div>{k}</div>
              <div className="flex-grow-1">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </Theme>
  );
}

export default App;
