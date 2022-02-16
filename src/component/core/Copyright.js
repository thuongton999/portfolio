import styled from "styled-components";

const StyledCopyright = styled.div`
    font-family: var(--textFont);
`;

function Copyright(props) {
    return (
        <StyledCopyright {...props}>
            thuongton999
        </StyledCopyright>
    );
}

export default Copyright;