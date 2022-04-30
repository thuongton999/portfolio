import React from 'react';
import styled from 'styled-components';
import LazyImage from './LazyImage';
import IonIcon from './IonIcon';

const StyledRandomMeme = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px solid var(--text);
`;

const StyledImage = styled(LazyImage)`
    display: flex;
    justify-content: center;
    border-top: 2px solid var(--text);
`;

const StyledRedirect = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    background-color: var(--text);
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    text-align: center;
    font-weight: bold;
    color: var(--background);
    span {
        color: var(--ew);
        display: flex;
        align-items: center;
    }
`;

const StyledAuthor = styled.span`
    margin: 0 auto;
    border-top: 2px solid var(--text);
    border-bottom: 2px solid var(--text);
    padding: 0.2rem 0.5rem;
    width: 100%;
    a {
        text-decoration: none;
        color: var(--secondary);
    }
`;

const StyledTitle = styled.p`
    padding: 0.2rem 0.5rem;
`;

const sample = {
    postLink: "",
    subreddit: "",
    title: "",
    url: "",
    author: ""
}
const iconStyles = {
    fontSize: '1.2em',
    backgroundColor: 'var(--ew)',
    color: 'var(--text)',
    padding: '3px',
    borderRadius: '50%',
    marginLeft: '0.5rem'
};

function RandomMeme({ className }) {
    const [meme, setMeme] = React.useState(sample);
    React.useEffect(() => {
        fetch("https://meme-api.herokuapp.com/gimme")
            .then(res => res.json())
            .then(data => setMeme(data))
            .catch(console.error);
    }, []);

    return (
        <StyledRandomMeme>
            <StyledTitle>{meme.title}</StyledTitle>
            <StyledImage src={meme.url} alt="meme" className={className} />
            <StyledAuthor>{meme.author} at
                <a href={`https://www.reddit.com/r/${meme.subreddit}`}> r/{meme.subreddit}</a>
            </StyledAuthor>
            <StyledRedirect href={meme.postLink}>
                View on <span>Reddit<IonIcon icon='logo-reddit' {...iconStyles}/></span>
            </StyledRedirect>
        </StyledRandomMeme>
    );
}

export default RandomMeme;