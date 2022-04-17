import styled from 'styled-components';

const StyledSvg = styled.svg`
    display: none;
`;

function SVGFilters(props) {
    return (
        <StyledSvg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
                <filter id="shadowed-goo">
                    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                    <feColorMatrix in="blur" mode="matrix" values="
                            1 0 0 0 0  
                            0 1 0 0 0  
                            0 0 1 0 0  
                            0 0 0 20 -10" result="goo" />
                    <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
                    <feColorMatrix in="shadow" mode="matrix" values="
                            0 0 0 0 0  
                            0 0 0 0 0  
                            0 0 0 0 0  
                            0 0 0 1 -0.2" result="shadow" />
                    <feOffset in="shadow" dx="1" dy="1" result="shadow" />
                    <feComposite in2="shadow" in="goo" result="goo" />
                    <feComposite in2="goo" in="SourceGraphic" result="mix" />
                </filter>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                    <feColorMatrix in="blur" mode="matrix" values="
                            1 0 0 0 0  
                            0 1 0 0 0  
                            0 0 1 0 0  
                            0 0 0 20 -10" result="goo" />
                    <feComposite in2="goo" in="SourceGraphic" result="mix" />
                </filter>
            </defs>
        </StyledSvg>
    )
}

export default SVGFilters;