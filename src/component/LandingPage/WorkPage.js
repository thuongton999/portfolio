import React from "react";
import styled from 'styled-components';
import StyledLandingPage from '../core/LandingPage';
import Maintain from '../core/Maintain';
import WorkTile from '../core/WorkTile';
import PageSwitcher from '../core/PageSwitcher';
import useStore from "../../hook/useStore";
import TextAround from "../core/TextAround";
import { vh } from "../utils/_CSSUnits";
import { getWorks } from '../utils/_FetchData';

const StyledWorkPage = styled(StyledLandingPage)`
    display: flex;
    gap: 10%;
    justify-content: flex-end;
    align-items: start;
    padding-right: 5vw;
    background-image: url(${process.env.PUBLIC_URL}/images/works-desktop-cover.gif);

    position: relative;
    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background-color: var(--background);
        opacity: 0.5;
    }
`;

const StyledWorks = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    aspect-ratio: 8 / 10;
    border-left: 5px solid var(--primary);
    border-right: 5px solid var(--primary);
    box-shadow: 0px 0px 20px var(--background);
    transition: transform 0.5s ease-in-out;
    padding-bottom: var(--footerHeight);
    scroll-behavior: smooth;
    backdrop-filter: contrast(0.5);

    // active scrollbar but hidden
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const StyledSwitcher = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const StyledMaintain = styled(Maintain)`
    margin-top: 50px;
`;

const sample = [
    {title: "", image: " ", url: ""},
    {title: "", image: " ", url: ""},
    {title: "", image: " ", url: ""},
    {title: "", image: " ", url: ""},
    {title: "", image: " ", url: ""},
];
function WorkPage(props) {
    const { componentIndex, center, moveSlide } = props;
    const [hoverIndex, setHoverIndex] = React.useState(0);
    const [works, setWorks] = React.useState(sample);
    const goToNextPage = useStore(state => state.nextPage);
    const goToPrevPage = useStore(state => state.prevPage);
    const index = useStore(state => state.slideIndex);
    const worksEl = React.useRef(null);
    const sections = [...new Set(works.map(project => project.section))];

    const isOnPage = () => {
        return index === componentIndex;
    }
    const onClick = () => {
        if (index < componentIndex) goToNextPage();
        else goToPrevPage();
    };
    const getSectionIndex = () => sections.indexOf(works[hoverIndex]?.section);

    React.useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/data/works.json`)
            .then(res => res.json())
            .then(data => getWorks(data)
                .then(works => setWorks(works)));
    }, []);

    React.useEffect(() => {
        moveSlide(index);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    return (
        <StyledWorkPage>
            <StyledSwitcher>
                {React.useMemo(() => <PageSwitcher
                    activeScrollBar={true}
                    refEl={worksEl}
                    centerIndex={center}
                    pageIndex={componentIndex}
                    active={isOnPage()}
                    onClick={onClick}
                // eslint-disable-next-line react-hooks/exhaustive-deps
                />, [index])}
                <TextAround
                    texts={sections}
                    activeAt={getSectionIndex()}
                    active={isOnPage()}
                    radius={vh(18)}
                />
            </StyledSwitcher>
            <StyledMaintain componentIndex={componentIndex}>
                <h1>Work</h1>
                <p>There are 10 types of people in the world, those who understand binary codes, and those who don't.</p>
            </StyledMaintain>
            <StyledWorks ref={worksEl}>
                {React.useMemo(() => {
                    return works.map((work, index) => (
                        <WorkTile
                            key={index}
                            index={index}
                            title={work.title}
                            image={work.image}
                            url={work.url}
                            onMouseEnter={() => setHoverIndex(index)}
                        />
                    ))
                }, [works])}
            </StyledWorks>
        </StyledWorkPage>
    )
}

export default React.memo(WorkPage);