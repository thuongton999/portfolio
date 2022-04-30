import styled, { keyframes } from "styled-components";
import React from "react";
import StyledLandingPage from "../core/LandingPage";
import PageSwitcher from "../core/PageSwitcher";
import useStore from "../../hook/useStore";
import LazyImage from "../core/LazyImage";
import Introdution from "../core/Introdution";
import TechStack from "../core/TechStack";
import PopularsPost from "../core/PopularPosts";

const StyledAboutPage = styled(StyledLandingPage)`
    display: flex;
    align-items: center;
    position: relative;
`;

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    width: 50%;
    height: 100%;
    // hide scrollbar
    overflow-x: hidden;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
    scroll-behavior: smooth;
    padding-bottom: calc(var(--footerHeight) * 2);
    color: var(--text);
    border-right: 3px solid var(--text);

    & > p {
        font-family: var(--textFont);
    }
`;

const StyledImage = styled(LazyImage)`
    width: 50%;
    height: 100%;
    background-color: var(--primary);
`;

const moving = keyframes`
    0% {background-position: 0% 50%;}
    100% {background-position: 100% 50%;}
`;

const StyledHeader = styled.h1`
    position: sticky;
    display: flex;
    flex-direction: column;
    top: 0;
    width: 100%;
    color: currentColor;
    font-size: 5rem;
    font-family: var(--headerFont);
    font-weight: 700;
    text-align: center;    
    white-space: nowrap;
    padding-top: 5px;
    padding-bottom: 5px;
    z-index: 1;
    transition: 
        font-size 0.3s ease-in-out,
        text-align 0.3s ease-in-out;

    &::after {
        content: '${props => props.sub}';
        font-size: 1.5rem;
        font-family: var(--codeFont);
        width: 100%;
        padding: 5px;
        box-sizing: border-box;
        white-space: nowrap;
        filter: drop-shadow(0 0 10px var(--background));
        background-size: 200% 200%;
        background-image: repeating-linear-gradient(
            -55deg,
            #000,
            #000 20px,
            #ffb101 20px,
            #ffb101 40px
        );
        text-shadow: 0 0 15px var(--background);
        animation: ${moving} 5s alternate infinite;
        transition: width 0.3s ease-in-out;
    }
    
    &[minimize=true] {
        background-color: var(--background);
        font-size: 3rem;
        &::after {
            content: '';
            width: 0;
            padding: 0;
        }
    }
`;

const switcherStyles = {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    left: '100%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
}

function AboutPage(props) {
    const { componentIndex, center, moveSlide } = props;
    const headerEl = React.useRef(null);
    const goToNextPage = useStore(state => state.nextPage);
    const goToPrevPage = useStore(state => state.prevPage);
    const index = useStore(state => state.slideIndex);

    const onClick = () => {
        if (index > componentIndex) goToPrevPage();
        else goToNextPage();
    };

    const onScroll = (scrollEvent) => {
        if (!headerEl?.current) return;
        headerEl.current.setAttribute('minimize', scrollEvent.target.scrollTop > 0);
    }

    React.useEffect(() => {
        moveSlide(index);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    return (
        <StyledAboutPage>
            <PageSwitcher
                centerIndex={center}
                pageIndex={componentIndex}
                modelUrl=''
                onClick={onClick}
                active={index === componentIndex}
                style={switcherStyles}
            />
            {React.useMemo(() => (
                <StyledContent onScroll={onScroll}>
                    <StyledHeader ref={headerEl} sub='...?'>About Me</StyledHeader>
                    <Introdution />
                    <TechStack />
                    <PopularsPost />
                </StyledContent>
            ), [])}
            <StyledImage src={process.env.PUBLIC_URL+"/images/about-desktop-cover.gif"} />
        </StyledAboutPage>
    );
}

export default React.memo(AboutPage);