import styled from "styled-components";
import React from "react";
import ProgressRing from "./ProgressRing";

const BORDER_WIDTH = 3;
const TRACK_SIZE = window.innerWidth / 3.5;
const TRACK_RADIUS = TRACK_SIZE / 2;

const StyledScrollBarTrack = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: ${TRACK_SIZE}px;
    height: ${TRACK_SIZE}px;
    top: 50%;
    left: 50%;
    opacity: 0.5;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: ${BORDER_WIDTH}px solid var(--primary);
    transition: all 1s ease-in-out;

    &[active="true"] {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.2);
    }
`;

function RadialScrollBar(props) {
    const { left, refEl, active } = props;   
    const trackEl = React.useRef(null);    
    const ringEl = React.useRef(null);
    const scrollBarWidthPercentage = active ? 8 : 0;
    // mỗi đầu của track sẽ chừa lại 5% khoảng trống để scrollbar sẽ không bị tràn
    // -> 180 - 5 * 2 = 170
    const angleArc = 170 - (360 * scrollBarWidthPercentage / 100);
    
    const onScroll = (event) => {
        const el = event?.target;
        const clientHeight = el ? el.clientHeight : 0;
        const scrollTop = el ? el.scrollTop : 0;
        const scrollHeight = el ? el.scrollHeight : 0;
        const scrollPercent = scrollTop / (scrollHeight - clientHeight);
        // mặc định scroll bar sẽ đặt tại 0 độ (chính giữa bên phải vòng tròn)
        // vậy nên ta phải trừ đi 90 độ để đặt nó về chính giữa trên cùng
        // nhưng phải chừa lại 5% khoảng trống nên thay vì - 90% thì ta sẽ trừ 90 - 5 = 85%
        // và hướng ngược lại thì ta sẽ cộng 85%
        if (!left) ringEl.current.style.transform = `rotate(${angleArc * scrollPercent - 85}deg)`;
        else ringEl.current.style.transform = `rotate(-${angleArc * scrollPercent + 85}deg)`;
    }

    React.useEffect(() => {
        const ref = refEl?.current;
        const trackNode = trackEl.current;
        if (ref) ref.addEventListener("scroll", onScroll);
        else window.addEventListener("scroll", onScroll);
        trackNode.setAttribute("active", active);
        return () => {
            if (ref) ref.removeEventListener("scroll", onScroll);
            else window.removeEventListener("scroll", onScroll);
            trackNode.removeAttribute("active");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refEl, active]);

    return (
        <StyledScrollBarTrack ref={trackEl}>
            <ProgressRing
                stroke={4} 
                // ta cộng thêm một nửa border để đặt scrollbar
                // xoay theo chính giữa của track
                radius={TRACK_RADIUS + BORDER_WIDTH/4}
                progress={scrollBarWidthPercentage}
                pRef={ringEl}
            />
        </StyledScrollBarTrack>
    );
}

export default RadialScrollBar;