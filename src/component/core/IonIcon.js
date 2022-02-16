// this icon component base on Ionicon - Open source icons.
import React from 'react';

function IonIcon(props) {
    const { icon, fontSize, color, outline } = props;
    let style = {
        ...props,
        '--ionicon-stroke-width': outline || '1em',
        fontSize: fontSize,
        color: color || 'currentColor',
        pointerEvents: 'none',
    };
    return (
        <ion-icon name={icon} style={style} />
    );
};

export default IonIcon;