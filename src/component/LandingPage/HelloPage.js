import styled, { keyframes } from "styled-components";
import React from "react";
import StyledLandingPage from "../core/LandingPage";
import Maintain from "../core/Maintain";
import TextAround from "../core/TextAround";
import AudioSphere from "../core/AudioSphere";
import useStore from "../../hook/useStore";
import { vh } from "../utils/_CSSUnits";

const Rotate = keyframes`
    0% {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
`;

const StyledHelloPage = styled(StyledLandingPage)`
    --ringBorder: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(https://www.wykop.pl/cdn/c3201142/comment_OAqGsPLvilIHGJLggfIbUe6i4lT2fDZ2.gif);

    &::before {
        content: '';
        position: absolute;
        width: 75vh;
        height: 75vh;
        /* gradient border with radius (trick) */
        border: var(--ringBorder) solid transparent;
        background:
            linear-gradient(to right, 
                #FE6A50, 
                #ED00AA, 
                #2FE3FE, 
                #8900FF),
            border-box;
        background-size: calc(100% + var(--ringBorder) * 2) calc(100% + var(--ringBorder) * 2);
        background-position: center;
        -webkit-mask:
            linear-gradient(#fff 0 0) padding-box, 
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        border-radius: 50%;
        mask-composite: exclude;
        /* end trick */
        margin: auto;
        z-index: 1;
        animation: ${Rotate} 10s alternate infinite;
    }

    &::after {
        content: '';
        position: absolute;
        width: 100vw;
        height: 100vh;
        background-color: var(--background);
        opacity: 0.5;
        z-index: 0;
    }
`;

const StyledHelloWorld = styled.div`
    position: absolute;
    top: 50%;
    left: 25%;
    transform: translate(-50%, -50%);
    z-index: 1;
`;

const mySkills = [
    'Back-end',
    'Front-end',
    'Computer Science',
    'Game Dev',
    'Gamer',
]

function HelloPage(props) {
    const { componentIndex } = props;
    const index = useStore(state => state.slideIndex);
    
    return (
        <StyledHelloPage>
            {React.useMemo(() => {return <AudioSphere src={`${process.env.PUBLIC_URL}/audios/paradise_circus.mp3`} />}, [])}
            <TextAround 
                texts={mySkills} 
                radius={vh(40)}
                active={index === componentIndex} />
            <StyledHelloWorld>
                <Maintain componentIndex={componentIndex}>
                    <h1>Hello, World!</h1>
                    <p>
                        I'm Vu Tung Minh aka thuongton999<br /><br />
                        I have a passion for programming and I'm currently learning web development.
                    </p>
                </Maintain>
            </StyledHelloWorld>
        </StyledHelloPage>
    );
}
export default HelloPage;