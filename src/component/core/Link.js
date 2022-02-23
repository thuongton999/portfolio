import styled from "styled-components";
import useStore from "../../hook/useStore";

const StyledLink = styled.a`
    color: ${props => props.color || "currentColor"};
    cursor: pointer;
    text-decoration: none;
`;

function Link(props) {
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
        <StyledLink 
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            {...props}>
            {props.children}
        </StyledLink>
    );
}

export default Link;