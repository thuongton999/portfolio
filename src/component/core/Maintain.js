import styled from 'styled-components'; 
import React from 'react';
import useStore from '../../hook/useStore';

const StyledMaintain = styled.div`
    width: min-content;
    opacity: ${props => props.active ? 1 : 0};
    filter: drop-shadow(0 0 10px var(--background));
    transform: ${props => props.active ? 
        'translateX(0)' : 
        props.left ? 'translateX(-100%)' : 'translateX(100%)'};
    transition: all 1.2s ease-in-out;

    & > * {
        color: var(--text);
    }

    & > h1 {
        font-size: 4em;
        font-weight: 800;
        font-family: var(--headerFont);
    }

    & > code {
        font-family: var(--codeFont);
    }

    & > p {
        display: flex;
        transform: translateY(1em);
        text-align: left;
        font-family: var(--textFont);
        vertical-align: middle;        

        &::before {
            content: "-";
            transform: translateY(-35%);
            font-size: 5em;
            height: 100%;
        }
    }
`;

function Maintain(props) {
    const { componentIndex } = props;
    const index = useStore(state => state.slideIndex);

    return (
        <StyledMaintain 
            active={index === componentIndex} 
            left={index > componentIndex}
            {...props}>
            {props.children}
        </StyledMaintain>
    );
}

export default React.memo(Maintain);