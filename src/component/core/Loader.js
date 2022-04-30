import styled, { keyframes } from "styled-components";

const spinner = keyframes`
    100% { transform: rotate(360deg); }
`;
const StyledPage = styled.main`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;
const StyledLoader = styled.div`
    --size: 30vw;
    --thickness: 0.5vw;
    --line-size: calc(var(--size) - var(--thickness) * 2) / 9;
    width: var(--size);
    aspect-ratio: 1;
    padding: var(--thickness);
    overflow: hidden;
    position: relative;

    .spinner-ring {
        position: absolute;
        border-radius: 50%;
        border: var(--thickness) solid transparent;
        border-top-color: #ff1d5e;
        animation: ${spinner} 1500ms cubic-bezier(0.680, -0.750, 0.265, 1.750) infinite forwards;
        margin: auto;
        inset: 0;
    }

    .spinner-ring:nth-child(1) {
        height: calc(var(--line-size) + 0 * var(--line-size));
        width: calc(var(--line-size) + 0 * var(--line-size));
        animation-delay: calc(50ms * 1);
    }

    .spinner-ring:nth-child(2) {
        height: calc(var(--line-size) + 1 * var(--line-size));
        width: calc(var(--line-size) + 1 * var(--line-size));
        animation-delay: calc(50ms * 2);
    }

    .spinner-ring:nth-child(3) {
        height: calc(var(--line-size) + 2 * var(--line-size));
        width: calc(var(--line-size) + 2 * var(--line-size));
        animation-delay: calc(50ms * 3);
    }

    .spinner-ring:nth-child(4) {
        height: calc(var(--line-size) + 3 * var(--line-size));
        width: calc(var(--line-size) + 3 * var(--line-size));
        animation-delay: calc(50ms * 4);
    }

    .spinner-ring:nth-child(5) {
        height: calc(var(--line-size) + 4 * var(--line-size));
        width: calc(var(--line-size) + 4 * var(--line-size));
        animation-delay: calc(50ms * 5);
    }

    .spinner-ring:nth-child(6) {
        height: calc(var(--line-size) + 5 * var(--line-size));
        width: calc(var(--line-size) + 5 * var(--line-size));
        animation-delay: calc(50ms * 6);
    }

    .spinner-ring:nth-child(7) {
        height: calc(var(--line-size) + 6 * var(--line-size));
        width: calc(var(--line-size) + 6 * var(--line-size));
        animation-delay: calc(50ms * 7);
    }

    .spinner-ring:nth-child(8) {
        height: calc(var(--line-size) + 7 * var(--line-size));
        width: calc(var(--line-size) + 7 * var(--line-size));
        animation-delay: calc(50ms * 8);
    }

    .spinner-ring:nth-child(9) {
        height: calc(var(--line-size) + 8 * var(--line-size));
        width: calc(var(--line-size) + 8 * var(--line-size));
        animation-delay: calc(50ms * 9);
    }
`;

function Loader() {
    return (
        <StyledPage>
            <StyledLoader>
                <div className="spinner-ring" />
                <div className="spinner-ring" />
                <div className="spinner-ring" />
                <div className="spinner-ring" />
                <div className="spinner-ring" />
                <div className="spinner-ring" />
                <div className="spinner-ring" />
                <div className="spinner-ring" />
                <div className="spinner-ring" />
            </StyledLoader>
        </StyledPage>
    )
}

export default Loader;