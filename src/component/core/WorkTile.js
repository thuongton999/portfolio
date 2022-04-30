import styled from "styled-components";
import LazyImage from './LazyImage';
import useStore from "../../hook/useStore";

const StyledWorkTile = styled.div`
    display: flex;
    flex-direction: ${props => props.isEven ? 'row' : 'row-reverse'};
    width: 100%;
    min-height: 150px;
    overflow: hidden;
    // mobile
    @media (max-width: 1023px) {
        position: relative;
        min-height: 200px;
        margin-bottom: 2rem;
        border: 2px solid var(--primary);
        border-radius: 1rem;
    }
`;

const StyledContentBox = styled.a`
    --padding: 1rem;
    text-decoration: none;
    position: relative;
    cursor: pointer;
    color: var(--text);
    width: 50%;
    height: 100%;
    padding: var(--padding);
    font-size: 1rem;
    font-family: var(--textFont);
    word-break: break-word;
    overflow-y: scroll;
    ::after {
        content: '';
        position: absolute;
        inset: calc(var(--padding) / 2);
        ${props => props.isEven ? 'border-left: ' : 'border-right: '}2px solid var(--text);
        border-top-${props => props.isEven ? 'left' : 'right'}-radius: 1rem;
        height: 100%;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
    // mobile
    @media (max-width: 426px) {
        position: absolute;
        z-index: 1;
        width: 100%;
        backdrop-filter: contrast(0.5) blur(2px);
        font-size: 1.5rem;
        text-shadow: 0 0 2px var(--primary);
    }
`;
const StyledIndex = styled.h1`
    font-family: var(--headerFont);
    font-size: 5rem;
    float: right;
`;

const StyledImageBox = styled.div`
    width: 50%;
    height: 100%;
    background-color: var(--primary);
    overflow: hidden;
    // mobile
    @media (max-width: 1023px) {
        width: 100%;
    }
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
            <StyledContentBox href={url} isEven={index % 2 === 0}>
                <StyledIndex>{index}</StyledIndex>
                {title}
            </StyledContentBox>
            <StyledImageBox onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <StyledLazyImage src={image}/>
            </StyledImageBox>
        </StyledWorkTile>
    );
}

export default WorkTile;