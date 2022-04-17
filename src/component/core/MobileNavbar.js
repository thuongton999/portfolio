import styled from 'styled-components';
import React from 'react';
import Link from './RouterLink';
import IonIcon from './IonIcon';
import { degToRad, round } from '../utils/_Math';

const StyledMobileNavbar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: var(--footerHeight);
    border-top: 2px solid var(--text);
    background-color: var(--background);
    box-shadow: var(--background) 0px 10px 30px;
    padding: 0 5vw;
    opacity: ${props => props.hide ? 0 : 1};
    font-size: 1.5rem;
    font-family: var(--codeFont);
    transition: all 0.2s ease-in-out;

    & > svg {
        display: none;
    }

    & > a {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const StyledSwitcher = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    bottom: 50%;
    border-radius: 50%;
    border: 2px solid var(--text);
    color: ${props => props.active ? 'var(--text)' : 'var(--secondary)'};
    background-image: url('https://media1.giphy.com/media/2aQbzz02eLbJAZWbdY/giphy.gif');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: transform 0.25s ease;

    &:active {
        transform: scale(1.1);
    }
`;

const StyledNavs = styled.div`
    font-size: ${props => props.active ? 1 : 0}em;
    position: absolute;
    inset: 0;
    filter: url(#shadowed-goo);
    transition: opacity 0.5s ease;
`;

const StyledNavLink = styled(Link)`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: calc(${props => props.active ? props.position.y : 0}% + 50%);
    left: calc(${props => props.active ? props.position.x : 0}% + 50%);
    pointer-events: ${props => props.active ? 'auto' : 'none'};
    color: ${props => `/${props.current}` === props.to ? 'var(--secondary)' : 'var(--text)'};
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 2px solid var(--text);
    background-image: url(${props => props.gif});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: drop-shadow(0 0 3px var(--text));
    transition: all calc(${props => round(props.index * 0.15, 2)} * 1s) cubic-bezier(.45,.24,.29,.47);
`;

function Navs(props) {
    const { radius, arc, offsetY, active, current } = props;
    const childCount = React.Children.count(props.children);
    const center = childCount / 2;
    const getPosition = (index) => {
        const angle = degToRad(Math.round(index - center) * (arc / childCount) - 90);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle) + offsetY;
        return { x, y };
    }
    return (
        <StyledNavs active={active}>
            {React.Children.map(props.children, (child, index) => {
                return React.cloneElement(child, { position: getPosition(index), active, current, index: index + 1 });
            })}
        </StyledNavs>
    )
}

function MobileNavbar(props) {
    const [active, setActive] = React.useState(false);
    const [hide, setHide] = React.useState(false);
    let touch = 0;

    const getPage = () => {
        const path = window.location.pathname;
        const pathArray = path.split('/');
        return pathArray[pathArray.length - 1];
    }

    const onTouchStart = () => {
        touch++;
    }

    const onTouchMove = () => {
        touch++;
    }

    const onTouchEnd = () => {
        if (touch === 1) setHide(false);
        else if (!hide) setHide(true);
        touch = 0;
    }

    React.useEffect(() => {
        window.addEventListener('touchstart', onTouchStart);
        window.addEventListener('touchend', onTouchEnd);
        window.addEventListener('touchmove', onTouchMove);
        return () => {
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchend', onTouchEnd);
            window.removeEventListener('touchmove', onTouchMove);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <StyledMobileNavbar hide={hide}>
            <Link to='/info'>
                <IonIcon icon='information' />
            </Link>
            <StyledSwitcher onClick={() => setActive(!active)} active={active}>
                <Navs radius={300} arc={100} offsetY={150} active={active} current={getPage()}>
                    <StyledNavLink to='/about' gif='https://i.imgur.com/j5aiJqF.gif'>
                        <IonIcon icon='person' />
                    </StyledNavLink>
                    <StyledNavLink to='/' gif='https://i.gifer.com/1fq7.gif'>
                        <IonIcon icon='planet' />
                    </StyledNavLink>
                    <StyledNavLink to='/works' gif='https://i.gifer.com/NC9V.gif'>
                        <IonIcon icon='briefcase' />
                    </StyledNavLink>
                </Navs>
                <IonIcon icon="layers" />
            </StyledSwitcher>
            <Link to='/contact'>
                <IonIcon icon='share-social' />
            </Link>
        </StyledMobileNavbar>
    );
}

export default MobileNavbar;