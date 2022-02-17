import React from 'react';
import styled from 'styled-components';
import Loader from './core/Loader';

const SlideShow = React.lazy(() => import('./core/SlideShow'));
const HelloPage = React.lazy(() => import('./LandingPage/HelloPage'));
const WorkPage = React.lazy(() => import('./LandingPage/WorkPage'));
const AboutPage = React.lazy(() => import('./LandingPage/AboutPage'));
const Cursor = React.lazy(() => import('./core/Cursor'));
const Footer = React.lazy(() => import('./core/Footer'));

const StyledDesktop = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

function Desktop(props) {
  return (
    <StyledDesktop>
      <React.Suspense fallback={<Loader />}>
        <Cursor />
        <SlideShow>
          <AboutPage />
          <HelloPage />
          <WorkPage />
        </SlideShow>
        <Footer />
      </React.Suspense>
    </StyledDesktop>
  );
}

export default React.memo(Desktop);
