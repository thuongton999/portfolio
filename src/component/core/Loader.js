import styled from "styled-components";
import StyledLandingPage from "./LandingPage";

const Loader = styled(StyledLandingPage)`
    filter: grayscale(100%);
    background-image: url(https://www.wykop.pl/cdn/c3201142/comment_OAqGsPLvilIHGJLggfIbUe6i4lT2fDZ2.gif);
    &::before {
        content: 'LOADING';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 10rem;
        font-family: var(--headerFont);
        color: white;
    }
`;

export default Loader;