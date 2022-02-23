const vh = (units) => {
    const windowHeight = window.innerHeight;
    return windowHeight / 100 * units;
}

const vw = (units) => {
    const windowWidth = window.innerWidth;
    return windowWidth / 100 * units;
}

export { vh, vw };