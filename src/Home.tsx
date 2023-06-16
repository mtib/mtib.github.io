import styled from '@emotion/styled';
import * as React from 'react';
import PostList from './PostList';
import ToggleMode from './ToggleMode';

type Link = {
    title: string;
    url: `http${'s' | ''}://${string}` | `assets/${string}` | `posts/${string}`;
};

const linkData = [
    {
        title: "GitHub",
        url: "https://github.com/mtib",
    },
    {
        title: "LinkedIn",
        url: "https://www.linkedin.com/in/mtib/",
    },
    {
        title: "CV",
        url: "assets/hiring/cv.pdf",
    },
    {
        title: "RSS Feed",
        url: "posts/feed.rss",
    },
] as const satisfies readonly Link[];

type Papers = {
    title: string;
    paper: string;
    slide: string;
    slideLinks?: readonly { title: string; link: string }[],
};

const publishData = [
    {
        title: "Resilient Byzantine Fault-Tolerance using Multiple Trusted Execution Environments",
        paper: "assets/papers/splitbft_resilient_consensus.pdf",
        slide: "assets/slides/splitbft_resilient_consensus_slides.pdf",
        slideLinks: [{
            title: "Presentation",
            link: "https://www.youtube.com/watch?v=6fuUlrk3IDg"
        }],
    },
    {
        title: "Microsecond Replication for Microsecond Applications",
        paper: "assets/papers/ms_consensus.pdf",
        slide: "assets/slides/ms_consensus_slides.pdf",
    },
    {
        title: "Low Latency Byzantine Agreement using RDMA",
        paper: "assets/papers/rdma_consensus.pdf",
        slide: "assets/slides/rdma_consensus_slides.pdf",
    },
] as const satisfies readonly Papers[];

const certsData = [
    {
        title: "Master of Science in Computer Science",
        relURL: "assets/certs/ma_cert.pdf"
    },
    {
        title: "TT38 Talent Test",
        relURL: "assets/certs/tt38_talent_test.pdf"
    },
    {
        title: "Predictive Index: Behaviour",
        relURL: "assets/certs/pi_behaviour.pdf"
    },
    {
        title: "Predictive Index: Cognitive",
        relURL: "assets/certs/pi_cognitive.pdf"
    },
] as const;

const HomeNavBar = styled.div({
    display: 'flex',
    gap: '10px',
    justifyContent: 'space-between',
});

const Home: React.FC = () => {
    const links = React.useMemo(() => linkData.map(item => (<li key={item.url}><a href={item.url}>{item.title}</a></li>)), []);
    const papers = React.useMemo(() => publishData.filter(item => item.paper != null).map(item => (<li key={item.paper}><a href={item.paper}>{item.title}</a></li>)), []);
    const slides = React.useMemo(() => publishData.filter(item => item.slide != null).map(item => (<li key={item.slide}><a href={item.slide}>{item.title}</a>{'slideLinks' in item && <ul>{item.slideLinks.map(({ title, link }) => <li key={link}><a href={link}>{title}</a></li>)}</ul>}</li>)), []);
    const certs = React.useMemo(() => certsData.map(item => (<li key={item.relURL}><a href={item.relURL}>{item.title}</a></li>)), []);

    return (
        <>
            <HomeNavBar className="py-3">
                <span className="h1">
                    blog.mtib.dev
                </span>
                <ToggleMode />
            </HomeNavBar>
            <h2>links</h2>
            <ul>
                {links}
            </ul>
            <h2>posts</h2>
            <PostList url="/posts/list.json" />
            <h2>papers</h2>
            <ul>
                {papers}
            </ul>
            <h2>slides</h2>
            <ul>
                {slides}
            </ul>
            <h2>certs</h2>
            <ul>
                {certs}
            </ul>
        </>
    );
}

export default Home;
