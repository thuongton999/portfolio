import styled from "styled-components";
import React from "react";
import useStore from "../../hook/useStore";

const StyledCursor = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    pointer-events: none;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.2s ease, height 0.2s ease;
    backdrop-filter: grayscale(100%) invert(1);
    z-index: 999999999;

    &[hover=true] {
        width: 40px;
        height: 40px;
    }
`;

function Cursor(props) {
    const cursorEl = React.useRef(null);
    const setGlobalCursorRef = useStore(state => state.setCursorRef);

    const setPosition = (x, y) => {
        const el = cursorEl.current;
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
    }

    React.useEffect(() => {
        setGlobalCursorRef(cursorEl);
        const onMouseMove = (e) => {
            setPosition(e.clientX, e.clientY);
        };
        window.addEventListener('mousemove', onMouseMove);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <StyledCursor ref={cursorEl}/>;
}

export default Cursor;