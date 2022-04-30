import styled, { keyframes } from "styled-components";
import React from "react";
import Introdution from "../core/Introdution";
import PopularsPost from "../core/PopularPosts";
import TechStack from "../core/TechStack";

const StyledContent = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    // hide scrollbar
    overflow-x: hidden;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
    scroll-behavior: smooth;
    color: var(--text);
    padding-bottom: var(--footerHeight);

    & > p {
        font-family: var(--textFont);
    }
`;

const gradient = keyframes`
    0% {background-position: 0% 50%;}
    50% {background-position: 100% 50%;}
    100% {background-position: 0% 50%;}
`;
const StyledHeader = styled.header`
    position: sticky;
    top: 0;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 3.5rem;
    font-family: var(--headerFont);
    background-color: var(--background);
    z-index: 1;
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 0px 10px var(--background);

    ::after {
        content: "${props => props.sub}";
        font-size: 1.5rem;
        font-family: var(--textFont);
        width: 100%;
        padding: 5px 0;
        background-size: 400% 400%;
        background-image: linear-gradient(
            -45deg,
            #fc6c8f,
            #ff2ced,
            #ffb86c,
            #2cccff,
            #20e3b2,
            #ffcc70,
            #c850c0,
            #4158d0
        );
        text-align: center;
        animation: ${gradient} 10s ease infinite;
        transition: all 0.3s ease;
    }

    &[minimize=true] {
        font-size: 2.5rem;
        ::after {
            font-size: 0;
        }
    }
`;

const StyledFixedBackground = styled.div`
    width: 100%;
    min-height: 15rem;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    background-image: url(${process.env.PUBLIC_URL}/images/about-mobile-cover.gif);
`;

function MobileAboutPage(props) {
    const headerEl = React.useRef(null);
    const pageEl = React.useRef(null);
    
    React.useEffect(() => {
        const header = headerEl.current;
        const onScroll = () => {
            if (pageEl.current.scrollTop <= 50) header.setAttribute("minimize", false);
            else header.setAttribute("minimize", true);
        }
        window.addEventListener('touchmove', onScroll);
        return () => {
            window.removeEventListener('touchmove', onScroll);
        }
    }, []);

    return (
        <StyledContent ref={pageEl}>
            <StyledHeader ref={headerEl} sub='Gruhhhhhhh'>About Me</StyledHeader>
            <StyledFixedBackground />
            <Introdution />
            <TechStack />
            <PopularsPost />
        </StyledContent>
    );
}

export default MobileAboutPage;