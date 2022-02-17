import React from "react";
import styled from "styled-components";
import Copyright from "./Copyright";
import Contact from "./Contact";
import useStore from "../../hook/useStore";

const StyledFooter = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: var(--footerHeight);
    color: #6a6b72;
    user-select: none;
    z-index: 99999;
    background-color: var(--background);
    overflow: hidden;
`;

const StyledNavBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: var(--footerHeight);
    padding: 0 20px;
`;

const StyledNavs = styled.div`
    display: flex;
    height: 100%;
    position: relative;
    align-items: center;
    justify-content: center;
    font-family: var(--headerFont);
    font-weight: 800;
`;

const StyledNavUnderline = styled.div`
    position: absolute;
    bottom: 0;
    width: 50px;
    height: 5px;
    background-color: var(--secondary);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    z-index: 9999;
    transition: all 0.8s ease-in-out;
`;

const StyledNav = styled.div`
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: ${props => props.active ? 'var(--secondary)' : 'currentColor'};
    transition: all 0.2s ease-in-out;

    & > * {
        pointer-events: none;
    }
`;

function Navs(props) {
    const cursorEl = useStore(state => state.cursorRef);
    const currentIndex = useStore(state => state.slideIndex);
    const setIndex = useStore(state => state.setPage);
    const underlineEl = React.useRef(null);
    const tabRefs = React.useRef([]);

    const onMouseEnter = mouseEnterEvent => {
        if (!cursorEl || !cursorEl.current) return;
        cursorEl.current.setAttribute('hover', true);
    }
    const onMouseLeave = mouseLeaveEvent => {
        if (!cursorEl || !cursorEl.current) return;
        cursorEl.current.removeAttribute('hover');
    }
    const moveUnderline = refElement => {
        if (!underlineEl) return;
        if (!underlineEl.current) return;
        if (!refElement) return;
        underlineEl.current.style.width = `${refElement.offsetWidth}px`;
        underlineEl.current.style.left = `${refElement.offsetLeft}px`;
    }

    React.useEffect(() => {
        const tabEl = tabRefs.current[currentIndex];
        moveUnderline(tabEl);
    }, [currentIndex]);

    return (
        <StyledNavs onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <StyledNavUnderline ref={underlineEl} />
            {props.children.map((child, index) => 
                <StyledNav 
                    key={index} 
                    ref={el => tabRefs.current.push(el)} 
                    onClick={() => (index !== currentIndex && setIndex(index))}
                    active={index === currentIndex}>
                    {child}
                </StyledNav>)}
        </StyledNavs>
    );
}

function Footer(props) {
    return (
        <StyledFooter>
            <StyledNavBar>
                <Copyright />
                {/* navs must equal to slideshow childrens */}
                <Navs {...props}>
                    <p>Me</p>
                    <p>Hello</p>
                    <p>Work</p>
                </Navs>
                <Contact />
            </StyledNavBar>
        </StyledFooter>
    );
}

export default React.memo(Footer);