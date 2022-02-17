import React from "react";
import styled from "styled-components";
import useStore from "../../hook/useStore";

const StyledQuote = styled.div`
    padding: 1rem;
    color: var(--background);
    background-color: var(--text);
    h1 {
        font-family: var(--headerFont);
        color: currentColor;
        filter: brightness(0.7);
    }
    p {
        font-family: var(--codeFont);
        ::before {
            content: '<';
            color: var(--success);
        }
        ::after {
            content: '/>';
            color: var(--success);
        }
    }
`;

function RandomQuote(props) {
    const [quote, setQuote] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const cursorEl = useStore(state => state.cursorRef);
    const onMouseEnter = () => {
        if (!cursorEl?.current) return;
        cursorEl.current.setAttribute('hover', true);
    }
    const onMouseLeave = () => {
        if (!cursorEl?.current) return;
        cursorEl.current.removeAttribute('hover');
    }

    React.useEffect(() => {
        fetch('https://programming-quotes-api.herokuapp.com/quotes/random')
            .then(res => res.json())
            .then(data => {
                setQuote(data.en);
                setAuthor(data.author);
            })
            .catch(console.error);
    }, []);
    
    return (
        <StyledQuote 
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            {...props}>
            <h1>{author} :</h1>
            <p>{quote}</p>
        </StyledQuote>
    );
}

export default React.memo(RandomQuote);