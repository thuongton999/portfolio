import styled from 'styled-components';
import LazyImage from './LazyImage';
import Link from './Link';
import React from 'react';
import createObserver from '../utils/_LazyLoad';
import { getMeta } from '../utils/SEO';

const StyledPopularPosts = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 2rem;
    padding: 0 2rem;
    width: 100%;
    & > h1 {
        font-size: 2rem;
        font-weight: bold;
        font-family: var(--headerFont);
    }
`;

const StyledPosts = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
`;

const StyledPostOverview = styled(Link)`
    font-family: var(--textFont);
    // width = 50% - gap/2
    width: calc(50% - 5px);
`;

const StyledImage = styled(LazyImage)`
    width: 100%;
    max-height: 175px;
    background-color: var(--primary);
`;

async function getPopularPosts(postsUrl) {
    try {
        const metaData = await Promise.all(postsUrl.map(url => getMeta(url)));
        return metaData.map((meta, index) => ({
            url: postsUrl[index],
            ...meta
        }));
    } catch (message) {
        return console.error(message);
    }
}

function PostOverview(props) {
    const { title, url, image } = props;
    // if image url not contain url host
    // then add url host to image url
    const host = url.split('/')[2];
    let imageUrl = image;
    if (!imageUrl.includes(host)) {
        imageUrl = url.includes('https://') ? `https://${host}${imageUrl}` : `http://${host}${imageUrl}`;
    }
    return (
        <StyledPostOverview href={url}>
            <StyledImage src={imageUrl} alt={title} />
            <h2>{title}</h2>
        </StyledPostOverview>
    )
}

function PopularsPost(props) {
    const [posts, setPosts] = React.useState([]);
    const postsContainer = React.useRef(null);

    React.useEffect(() => {
        const observer = createObserver((entry) => {
            if (!entry.isIntersecting) return;
            fetch(`${process.env.PUBLIC_URL}/data/posts.json`)
                .then(res => res.json())
                .then(urls => getPopularPosts(urls)
                    .then(posts => setPosts(posts)))
            observer.unobserve(entry.target);
        });
        observer.observe(postsContainer.current);
    }, [props.container]);
    return (
        <StyledPopularPosts ref={postsContainer}>
            <h1>Blogs</h1>
            <StyledPosts>
                {posts.map((post, index) => (
                    <PostOverview key={index} {...post} />
                ))}
            </StyledPosts>
        </StyledPopularPosts>
    );
}

export default PopularsPost;