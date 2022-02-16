import React from 'react';
import styled from 'styled-components';
import createObserver from '../utils/_LazyLoad';

const imgObserver = createObserver(entry => {
    if (!entry.isIntersecting) return;
    const img = entry.target;
    img.src = img.dataset.src;
    img.classList.add('fade-in');
    img.removeAttribute('data-src');
    imgObserver.unobserve(img);
}, { rootMargin: '100px' });

// only 95 bytes
const placeHolderImage = 'https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png';
const StyledImage = styled.img`
    object-fit: cover;
`;

function LazyImage(props) {
    const { src, className } = props;
    const img = React.useRef(null);

    React.useEffect(() => {
        imgObserver.observe(img.current);
    }, []);
    
    return (
        <StyledImage 
            ref={img}
            src={placeHolderImage}
            data-src={src}
            alt=''
            className={className}/>
    );
}

export default LazyImage;