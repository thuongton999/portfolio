import styled from 'styled-components';
import LazyImage from './LazyImage';
import React from 'react';
import createObserver from '../utils/_LazyLoad';
import CrossLink from './CrossLink';
import { getPopularPosts } from '../utils/_FetchData';
const StyledPopularPosts = styled.div`
    display: flex;
    flex-direction: column;
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

    // mobile
    @media (max-width: 376px) {
        flex-direction: column;
    }
`;

const StyledPostOverview = styled(CrossLink)`
    font-family: var(--textFont);
    // width = 50% - gap/2
    width: calc(50% - 5px);

    // mobile
    @media (max-width: 376px) {
        width: 100%;
    }
`;

const StyledImage = styled(LazyImage)`
    width: 100%;
    aspect-ratio: 16 / 9;
`;

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

const sample = [
    {title: "", image: " ", url: ""},
    {title: "", image: " ", url: ""},
]
function PopularsPost(props) {
    const [posts, setPosts] = React.useState(sample);
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