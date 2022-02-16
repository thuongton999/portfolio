import styled from "styled-components";
import React from "react";

const AVG_ANGLE = 5;

const StyledTextAround = styled.ul`
    display: flex;
    position: absolute;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    pointer-events: none;
`;

const StyledText = styled.li`
    --opacity: 1;
    position: absolute;
    width: 100px;
    color: var(--text);
    opacity: calc(var(--opacity) * 1);
    font-family: var(--codeFont);
    font-weight: bold;
    filter: drop-shadow(0 0 10px var(--background));
    z-index: 9999999;
    transition: all 0.5s ease;
`;

function TextAround(props) {
    const { 
        texts, 
        xOffset, yOffset, 
        radius, 
        active,
        activeAt } = props;
    const textEls = React.useRef([]);
    const textCount = texts.length;
    const center = (activeAt || activeAt === 0) ? activeAt : textCount / 2;
    const cRadius = radius;

    const getAngle = (index) => {
        const offset = Math.round(index - center);
        return offset * AVG_ANGLE;
    }

    const getPosition = (index) => {
        const angle = getAngle(index);
        const x = (cRadius + (xOffset || 20)) * Math.cos(angle * Math.PI / 90);
        const y = (cRadius + (yOffset || 0)) * Math.sin(angle * Math.PI / 180);
        return { x, y };
    }

    React.useEffect(() => {
        const els = textEls.current;
        els.forEach((el, index) => {
            let { x, y } = getPosition(active ? index : 0);
            let opacity = 1;
            if (activeAt || activeAt === 0) {
                const offset = Math.round(index - activeAt);
                opacity = 1 - (Math.abs(offset) / textCount);
            }
            el.style.setProperty("--opacity", active ? opacity : 0);
            el.style.transform = `translate(calc(${x}px + 50%), ${y * 2}px)`;
        });
        return () => {
            els.forEach(el => el?.removeAttribute('active'));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, activeAt]);

    return (
        <StyledTextAround {...props}>
            {texts?.map((text, index) => {
                return (
                    <StyledText
                        key={index}
                        ref={ref => textEls.current[index] = ref}>
                        {text}
                    </StyledText>
                );
            })}
        </StyledTextAround>
    )
}

export default React.memo(TextAround);