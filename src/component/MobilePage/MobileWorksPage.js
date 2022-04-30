import styled from 'styled-components'; 
import React from 'react';
import { getWorks } from '../utils/_FetchData';
import WorkTile from '../core/WorkTile';

const StyledPage = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    padding: 1rem 2rem 2rem var(--footerHeight);
    overflow-y: scroll;
`;

const StyledHeader = styled.header`
    text-align: center;
    font-family: var(--headerFont);
    font-size: 5rem;
    margin-bottom: 2rem;
    p {
        text-align: left;
        font-size: 1.5rem;
        font-family: var(--codeFont);
        color: var(--primary);
    }
    h1 {
        background-image: url(${process.env.PUBLIC_URL}/images/works-mobile-header-background.gif);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        filter: drop-shadow(0px 0px 5px var(--primary));
    }
`;

const TwoSideShadow = styled.div`
    position: absolute;
    inset: 0 -1px 0 -1px;
    pointer-events: none;
    box-shadow: var(--background) -1rem 0 20px 5px inset;
    transition: box-shadow 0.2s ease-in-out;
    ::after {
        content: "→";
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(50%, -50%);
        font-size: 1.5rem;
        font-weight: bold;
    }
    &[side="left"] {
        box-shadow: var(--background) -1rem 0 20px 5px inset;
        ::after {
            content: "→";
            transform: translate(50%, -50%);
        }
    }
    &[side="right"] {
        box-shadow: var(--background) 1rem 0 20px 5px inset;
        
        ::after {
            content: "←";
            right: 100%;
            transform: translate(50%, -50%);
        }
    }
`;

const StyledSectionsBar = styled.div`
    width: 100%;
    min-height: 4rem;
    padding: 1rem 0 1rem 0;
    border-top: 2px solid var(--primary);
    border-bottom: 2px solid var(--primary);
    scroll-behavior: smooth;
    position: relative;
    margin-bottom: 2rem;
`;

const StyledSections = styled.ul`
    display: flex;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const StyledSection = styled.li`
    white-space: nowrap;
    font-family: var(--textFont);
    font-size: 1.5rem;
    margin-right: 0.5rem;
    background-color: var(--primary);
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
    ::before {
        content: '${props => props.count} ';
        font-weight: bold;
        color: var(--secondary);
    }
`;
const sample = [
    {title: "", image: " ", url: ""},
    {title: "", image: " ", url: ""},
    {title: "", image: " ", url: ""},
    {title: "", image: " ", url: ""},
    {title: "", image: " ", url: ""},
];

function MobileWorksPage(props) {
    const [works, setWorks] = React.useState(sample);
    const shadow = React.useRef(null);
    let sections = {};
    for (const work of works) {
        if (!sections[work.section])
            sections[work.section] = 1;
        else
            sections[work.section]++;
    }
    React.useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/data/works.json`)
            .then(res => res.json())
            .then(data => getWorks(data)
                .then(works => setWorks(works)));
    }, [])

    const onSectionBarScroll = (scrollEvent) => {
        if (!shadow?.current) return;
        let scrollX = Math.round(scrollEvent.target.scrollLeft);
        let scrollWidth = scrollEvent.target.scrollWidth - scrollEvent.target.clientWidth;
        // left shadow
        if (scrollX === scrollWidth) {
            shadow.current.setAttribute("side", "right");
        } else if (scrollX === 0) {
            shadow.current.setAttribute("side", "left");
        }
    }

    return (
        <StyledPage>
            <StyledHeader>
                <h1>Works</h1>
                <p>There are 10 types of people in the world, those who understand binary codes, and those who don't.</p>
            </StyledHeader>
            <StyledSectionsBar>
                <StyledSections onScroll={onSectionBarScroll}>
                    {Object.keys(sections).map(section => <StyledSection key={section} count={sections[section]}>{section}</StyledSection>)}
                </StyledSections>
                <TwoSideShadow ref={shadow}/>
            </StyledSectionsBar>
            {React.useMemo(() => {
                return works.map((work, index) => (
                    <WorkTile
                        key={index}
                        index={index}
                        title={work.title}
                        image={work.image}
                        url={work.url}/>
                ))
            }, [works])}
        </StyledPage>
    )
}

export default MobileWorksPage;