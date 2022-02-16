import styled from "styled-components";
import LazyImage from "./LazyImage";

const StyledTechStack = styled.div`
    display: flex;
    gap: 0.5rem;
    padding: 0 2rem;
    flex-wrap: wrap;
    margin-top: 2rem;
    width: 100%;

    & > h1 {
        font-size: 1.5rem;
        font-weight: bold;
        font-family: var(--headerFont);
    }

    & > img {
        min-width: 2rem;
        min-height: 28px;
        background-color: var(--primary);
        transition: transform 0.2s ease-in-out;
        :hover {
            transform: scale(1.1);
        }
    }
`;

function TechStack(props) {
    return (
        <StyledTechStack>
            <h1>TechStack :</h1>
            <LazyImage src="https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&amp;logo=c&amp;logoColor=white" alt="C" />
            <LazyImage src="https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&amp;logo=c-sharp&amp;logoColor=white" alt="C#" />
            <LazyImage src="https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&amp;logo=c%2B%2B&amp;logoColor=white" alt="C++" />
            <LazyImage src="https://img.shields.io/badge/ruby-%23CC342D.svg?style=for-the-badge&amp;logo=ruby&amp;logoColor=white" alt="Ruby" />
            <LazyImage src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&amp;logo=python&amp;logoColor=ffdd54" alt="Python" />
            <LazyImage src="https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&amp;logo=markdown&amp;logoColor=white" alt="Markdown" />
            <LazyImage src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&amp;logo=java&amp;logoColor=white" alt="Java" />
            <LazyImage src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&amp;logo=javascript&amp;logoColor=%23F7DF1E" alt="JavaScript" />
            <LazyImage src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&amp;logo=html5&amp;logoColor=white" alt="HTML5" />
            <LazyImage src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&amp;logo=css3&amp;logoColor=white" alt="CSS3" />
            <LazyImage src="https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&amp;logo=azure-devops&amp;logoColor=white" alt="Azure" />
            <LazyImage src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&amp;logo=Cloudflare&amp;logoColor=white" alt="Cloudflare" />
            <LazyImage src="https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&amp;logo=firebase" alt="Firebase" />
            <LazyImage src="https://img.shields.io/badge/glitch-%233333FF.svg?style=for-the-badge&amp;logo=glitch&amp;logoColor=white" alt="Glitch" />
            <LazyImage src="https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&amp;logo=.net&amp;logoColor=white" alt=".Net" />
            <LazyImage src="https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&amp;logo=django&amp;logoColor=white" alt="Django" />
            <LazyImage src="https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&amp;logo=django&amp;logoColor=white&amp;color=ff1709&amp;labelColor=gray" alt="DjangoREST" />
            <LazyImage src="https://img.shields.io/badge/Electron-191970?style=for-the-badge&amp;logo=Electron&amp;logoColor=white" alt="Electron.js" />
            <LazyImage src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&amp;logo=fastapi" alt="FastAPI" />
            <LazyImage src="https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&amp;logo=npm&amp;logoColor=white" alt="NPM" />
            <LazyImage src="https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&amp;logo=jquery&amp;logoColor=white" alt="jQuery" />
            <LazyImage src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&amp;logo=node.js&amp;logoColor=white" alt="NodeJS" />
            <LazyImage src="https://img.shields.io/badge/opencv-%23white.svg?style=for-the-badge&amp;logo=opencv&amp;logoColor=white" alt="OpenCV" />
            <LazyImage src="https://img.shields.io/badge/p5.js-ED225D?style=for-the-badge&amp;logo=p5.js&amp;logoColor=FFFFFF" alt="p5js" />
            <LazyImage src="https://img.shields.io/badge/less-2B4C80?style=for-the-badge&amp;logo=less&amp;logoColor=white" alt="Less" />
            <LazyImage src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&amp;logo=react&amp;logoColor=%2361DAFB" alt="React" />
            <LazyImage src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&amp;logo=react-router&amp;logoColor=white" alt="React Router" />
            <LazyImage src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&amp;logo=SASS&amp;logoColor=white" alt="SASS" />
            <LazyImage src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&amp;logo=socket.io&amp;badgeColor=010101" alt="Socket.io" />
            <LazyImage src="https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&amp;logo=spring&amp;logoColor=white" alt="Spring" />
            <LazyImage src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&amp;logo=styled-components&amp;logoColor=white" alt="Styled Components" />
            <LazyImage src="https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&amp;logo=webpack&amp;logoColor=black" alt="Webpack" />
            <LazyImage src="https://img.shields.io/badge/threejs-black?style=for-the-badge&amp;logo=three.js&amp;logoColor=white" alt="Threejs" />
            <LazyImage src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&amp;logo=nginx&amp;logoColor=white" alt="Nginx" />
            <LazyImage src="https://img.shields.io/badge/Microsoft%20SQL%20Sever-CC2927?style=for-the-badge&amp;logo=microsoft%20sql%20server&amp;logoColor=white" alt="MicrosoftSQLServer" />
            <LazyImage src="https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&amp;logo=mysql&amp;logoColor=white" alt="MySQL" />
            <LazyImage src="https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&amp;logo=sqlite&amp;logoColor=white" alt="SQLite" />
            <LazyImage src="https://img.shields.io/badge/-Arduino-00979D?style=for-the-badge&amp;logo=Arduino&amp;logoColor=white" alt="Arduino" />
            <LazyImage src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&amp;logo=postman&amp;logoColor=white" alt="Postman" />
            <LazyImage src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&amp;logo=eslint&amp;logoColor=white" alt="ESLint" />
        </StyledTechStack>
    )
}

export default TechStack;