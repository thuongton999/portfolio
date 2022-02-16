import styled from 'styled-components';
import Link from "../core/Link";
import RandomQuote from './RandomQuote';

const StyledLink = styled(Link)`
    color: var(--secondary);
`;

const StyledIntrodution = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    line-height: 1.3;
    font-family: var(--textFont);
    & > h1 {
        font-size: 2rem;
        text-align: center;
    }
    & > h2 {
        font-size: 1.5rem;
        margin-top: 1rem;
    }
    & > ul {
        position: relative;
        padding: 1.5rem 1rem;
        list-style: none;
        width: 90%;
        border: 2px solid var(--text);
        & > h3 {
            position: absolute;
            top: 100%;
            left: 50%;
            padding: 0.5rem;
            transform: translate(-50%, -50%);
            text-align: center;
            background-color: var(--background);
        }
        & > li {
            text-indent: 1rem;
        }
    }
`;

function Introdution(props) {
    return (
        <StyledIntrodution>
            <h1>Hi everyone, I'm Vu Tung Minh<br />(a.k.a thuongton999)</h1>
            <RandomQuote />
            <h2>Who am I?</h2>
            <ul>
                <li>📄 A web dev.</li>
                <li>🎮 Working for a game startup with a MMORPG game product.</li>
                <li>📚 Studying at Luong Van Chanh High School.</li>
                <h3>IT'S ME</h3>
            </ul>
            <h2>#trytobefunny</h2>
            <ul>
                <li>I am also a member of
                    <StyledLink href='https://fct-club.com/'> FCTC (FPT-Software Computer Talents Club)</StyledLink>.
                    You can see my dumb face <StyledLink href='https://fct-club.com/2020-members/'>here</StyledLink>, my member code is 01.35.
                </li>
            </ul>
            <h2>Achievements</h2>
            <ul>
                <li>Second Prize 🥈 in
                    <StyledLink href='https://codelearn.io/fights/detail/5064803'> FPT Techday 2020 Code Warrior.</StyledLink>
                </li>
            </ul>
        </StyledIntrodution>
    )
}

export default Introdution;