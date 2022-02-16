import styled from "styled-components";
import LazyImage from './LazyImage';
import Link from './Link';
import useStore from "../../hook/useStore";

const StyledWorkTile = styled.div`
    display: flex;
    flex-direction: ${props => props.isEven ? 'row' : 'row-reverse'};
    width: 100%;
    max-height: 175px;
`;

const StyledContentBox = styled(Link)`
    display: flex;
    align-items: end;
    color: var(--text);
    width: 50%;
    padding: 10px;
`;
const StyledIndex = styled.h1`
    font-family: var(--headerFont);
    font-size: 5rem;
`;
const StyledTitle = styled.h2`
    font-size: 1rem;
    font-family: var(--textFont);
    word-break: break-word;
`;

const StyledImageBox = styled.div`
    width: 50%;
    background-color: var(--background);
    overflow: hidden;
`;
const StyledLazyImage = styled(LazyImage)`
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease-in-out;
    &:hover {
        transform: scale(1.1);
    }
`;

function WorkTile(props) {
    const { index, title, image, url } = props;
    const cursorEl = useStore(state => state.cursorRef);
    const onMouseEnter = () => {
        if (!cursorEl?.current) return;
        cursorEl.current.setAttribute('hover', true);
    };
    const onMouseLeave = () => {
        if (!cursorEl?.current) return;
        cursorEl.current.removeAttribute('hover');
    };
    return (
        <StyledWorkTile isEven={index % 2 === 0} {...props}>
            <StyledContentBox href={url}>
                <StyledTitle>{title}</StyledTitle>
                <StyledIndex>{index}</StyledIndex>
            </StyledContentBox>
            <StyledImageBox onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <StyledLazyImage src={image}/>
            </StyledImageBox>
        </StyledWorkTile>
    );
}

export default WorkTile;