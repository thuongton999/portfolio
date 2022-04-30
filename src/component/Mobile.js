import styled from 'styled-components';
import React from 'react';
import MobileNavbar from './core/MobileNavbar';
import LandingPage from './core/LandingPage';
import SVGFilters from './core/SVGFilters';
import Loader from './core/Loader';
import { Routes, Route } from 'react-router-dom';

const MobileAboutPage = React.lazy(() => import('./MobilePage/MobileAboutPage'));
const MobileWorksPage = React.lazy(() => import('./MobilePage/MobileWorksPage'));
const MobileHelloPage = React.lazy(() => import('./MobilePage/MobileHelloPage'));

const StyledMobile = styled(LandingPage)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: var(--background);
    color: var(--text);
`;

function Mobile(props) {
    return (
        <StyledMobile>
            <React.Suspense fallback={<Loader />}>
                <SVGFilters />
                <Routes>
                    <Route path='*' element={<div>This page is under construction</div>} />
                    <Route path="/" element={<MobileHelloPage />} />
                    <Route path='/about' element={<MobileAboutPage />} />
                    <Route path='/works' element={<MobileWorksPage />} />
                </Routes>
                <MobileNavbar />
            </React.Suspense>
        </StyledMobile>
    );
}

export default Mobile;