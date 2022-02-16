import styled from "styled-components";
import React from "react";
import useStore from "../../hook/useStore";
import RadialScrollBar from "./RadialScrollBar";

const StyledSwitcher = styled.div`
    border-radius: 50%;
    z-index: 99999;

    --rotate: ${props => props.left ? "180" : "0"};
    
    &::before {
        --rotateCal: calc(var(--rotate) * 1deg);
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 15vh;
        height: 30vh;
        border-top-right-radius: calc(15vh + 10px);
        border-bottom-right-radius: calc(15vh + 10px);

        /* gradient border with radius (trick) */
        border: 10px solid transparent;
        background: 
            linear-gradient(
                transparent, 
                ${props => props.primaryColor || 'silver'}, 
                ${props => props.secondaryColor || 'white'}, 
                ${props => props.primaryColor || 'silver'}, 
                transparent) 
            border-box;
        -webkit-mask:
            linear-gradient(#fff 0 0) padding-box, 
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        /* end trick */

        border-left: 0;
        transform-origin: 0% 50%;
        transform: translateY(-50%) rotate(var(--rotateCal));
        transition: 
            transform 1s ease-in-out, 
            width 0.3s ease, 
            height 0.3s ease, 
            border-top-right-radius 0.3s ease,
            border-bottom-right-radius 0.3s ease;
    }

    &:hover {
        &::before {
            width: 17vh;
            height: 34vh;
            border-top-right-radius: calc(17vh + 10px);
            border-bottom-right-radius: calc(17vh + 10px);
        }
        &::after {
            width: 31vh;
            height: 31vh;
        }
    }

    &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 30vh;
        height: 30vh;
        transform: translate(-50%, -50%);
        transition: width 0.3s ease, height 0.3s ease;
        border-radius: 50%;
        box-shadow: 
            rgba(149, 157, 165, 0.3) 0px 0px 100px,
            rgba(149, 157, 165, 0.2) 0px 0px 100px inset;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url(https://thumbs.gfycat.com/AromaticRecklessCaecilian-size_restricted.gif);
    }
`;

function PageSwitcher(props) {
    const {
        centerIndex,
        pageIndex,
        active,
        refEl,
        activeScrollBar,
        placeLeftScrollBar
    } = props;
    const index = useStore(state => state.slideIndex);
    const cursorEl = useStore(state => state.cursorRef);
    const onMouseEnter = () => {
        if (!cursorEl?.current) return;
        cursorEl.current.setAttribute('hover', true);
    };
    const onMouseLeave = () => {
        if (!cursorEl?.current) return;
        cursorEl.current.removeAttribute('hover');
    };
    const switcherEl = React.useRef(null);

    const isLeftDirection = () => {
        // negative will be left, positive will be right
        const pageDiff = pageIndex - centerIndex;
        if (pageDiff < 0) return index <= pageIndex;
        return !(index >= pageIndex);
    }

    React.useEffect(() => {
        switcherEl.current.style.setProperty("--rotate", isLeftDirection() ? "180" : "0");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    return (
        <StyledSwitcher 
            ref={switcherEl} 
            onMouseEnter={onMouseEnter} 
            onMouseLeave={onMouseLeave} 
            {...props}>
            {activeScrollBar &&
                <RadialScrollBar
                    active={active}
                    left={placeLeftScrollBar}
                    refEl={refEl} />}
        </StyledSwitcher>
    )
}

export default React.memo(PageSwitcher);