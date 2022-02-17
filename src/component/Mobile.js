import styled from 'styled-components';
import LandingPage from './core/LandingPage';

const StyledMobile = styled(LandingPage)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--text);
    overflow: hidden;
    background-image: url(https://images.squarespace-cdn.com/content/v1/53c54574e4b046e5507a54a7/1540910164814-VCU579ZJU0TWIOQDMV5W/image-asset.octet-stream?format=500w);
`;

const StyledMessage = styled.div`
    font-size: 1.5rem;
    font-family: var(--headerFont);
    backdrop-filter: blur(10px);
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    box-shadow: 0px 0px 30px var(--background);
    padding: 1rem;
`;

function Mobile(props) {
    return (
        <StyledMobile>
            <StyledMessage>This screen was not supported, please use a desktop screen.</StyledMessage>
        </StyledMobile>
    );
}

export default Mobile;