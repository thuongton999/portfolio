import styled from "styled-components";
import React from "react";

const StyledAvatar = styled.div`
    position: absolute;
    display: flex;
    width: 525px;
    height: 525px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    
    &::before {
        content: "";
        position: absolute;
        width: 250px;
        height: 250px;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0px 2px 150px 0px rgba(255, 255, 255, 0.25);
        z-index: -1;
    }
`;

function Avatar(props) {
    const avatarEl = React.useRef(null);

    return (
        <StyledAvatar ref={avatarEl}>
        </StyledAvatar>
    );
}

export default Avatar;