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
});

// only 95 bytes
const placeHolderImage = 'https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png';
const StyledImage = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
`;

function LazyImage(props) {
    const { src, className } = props;
    const img = React.useRef(null);

    React.useEffect(() => {
        imgObserver.observe(img.current);
    }, []);
    
    return (
        <div className={className}>
            <StyledImage 
                ref={img}
                src={placeHolderImage}
                data-src={src}
                alt=''/>
        </div>
    );
}

export default LazyImage;