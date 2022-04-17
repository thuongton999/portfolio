import styled from "styled-components";
import { Link } from "react-router-dom";
import useStore from "../../hook/useStore";

const StyledRouterLink = styled(Link)`
    color: ${props => props.color || "currentColor"};
    cursor: pointer;
    text-decoration: none;
`;

function RouterLink(props) {
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
        <StyledRouterLink 
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={props.className}
            to={props.to}>
            {props.children}
        </StyledRouterLink>
    );
}

export default RouterLink;