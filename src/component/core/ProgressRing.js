import React from "react";
import styled from "styled-components";

const StyledFrame = styled.svg`
    position: absolute;
    transform: rotate(-85deg);
    transition: all 0.5s ease;
`;

const StyledRing = styled.circle`
    stroke: ${props => props.color || "white"};
    fill: transparent;
    stroke-width: ${props => props.stroke || 5};
    stroke-linecap: round;
    stroke-dasharray: ${props => props.circumference};
    stroke-dashoffset: ${props => props.strokeDashoffset};
    transition: all 1s ease;
`;

function ProgressRing(props) {
    const { radius, stroke, progress, color, pRef } = props;

    // 
    const cRadius = radius + stroke / 2;
    const normalizedRadius = cRadius - stroke;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - progress / 100 * circumference;

    return (
        <StyledFrame
            ref={pRef}
            height={cRadius * 2}
            width={cRadius * 2}
            viewBox={`0 0 ${cRadius * 2} ${cRadius * 2}`}
            {...props}
        >
            <StyledRing
                color={color}
                stroke={stroke}
                circumference={circumference}
                strokeDashoffset={strokeDashoffset}
                r={normalizedRadius}
                cx={cRadius}
                cy={cRadius}
            />
        </StyledFrame>
    );
}

export default ProgressRing;