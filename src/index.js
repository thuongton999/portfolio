import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const Desktop = React.lazy(() => import('./component/Desktop'));
const Mobile = React.lazy(() => import('./component/Mobile'));

const App = React.memo(props => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1024);

  React.useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <BrowserRouter>
      <React.Suspense fallback={<div>Loading...</div>}>
        {isMobile ? <Mobile /> : <Desktop />}
      </React.Suspense>
    </BrowserRouter>
  );
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
