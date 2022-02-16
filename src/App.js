import React from 'react';
import styled from 'styled-components';
import Loader from './component/core/Loader';

const SlideShow = React.lazy(() => import('./component/core/SlideShow'));
const HelloPage = React.lazy(() => import('./component/LandingPage/HelloPage'));
const WorkPage = React.lazy(() => import('./component/LandingPage/WorkPage'));
const AboutPage = React.lazy(() => import('./component/LandingPage/AboutPage'));
const Cursor = React.lazy(() => import('./component/core/Cursor'));
const Footer = React.lazy(() => import('./component/core/Footer'));

const StyledApp = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
`;

function App() {
  const [size, setSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const onResize = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  React.useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <StyledApp width={size.width} height={size.height}>
      <React.Suspense fallback={<Loader />}>
        <Cursor />
        <SlideShow>
          <AboutPage />
          <HelloPage />
          <WorkPage />
        </SlideShow>
        <Footer />
      </React.Suspense>
    </StyledApp>
  );
}

export default React.memo(App);
