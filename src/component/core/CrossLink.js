import styled from 'styled-components';
import useStore from '../../hook/useStore';

const StyledCrossLink = styled.a`
    color: ${props => props.color || "currentColor"};
    cursor: pointer;
    text-decoration: none;
`;

function CrossLink(props) {
    const cursorEl = useStore(state => state.cursorRef);
    const onMouseEnter = () => {
        if (!cursorEl || !cursorEl.current) return;
        cursorEl.current.setAttribute('hover', true);
    };
    const onMouseLeave = () => {
        if (!cursorEl || !cursorEl.current) return;
        cursorEl.current.removeAttribute('hover');
    };
    return (
        <StyledCrossLink 
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={props.className}
            href={props.href}>
            {props.children}
        </StyledCrossLink>
    );
}

export default CrossLink;