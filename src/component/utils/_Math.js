// convert degrees to radians
const degToRad = degrees => degrees * Math.PI / 180;
// convert radians to degrees
const radToDeg = radians => radians * 180 / Math.PI;
// convert degrees to perpendicular coordinates
const perpendicular = degrees => degrees - Math.PI / 2;

const random = base => {
    if (Array.isArray(base)) return Math.random() * (base[1] - base[0]) + base[0];
    return Math.random() * base;
};
const pickRandom = arr => {
    if (Array.isArray(arr)) return arr[Math.floor(Math.random() * arr.length)];
    return arr;
};
function lerp(current, target, speed = 0.1, limit = 0.001) {
    let change = (target - current) * speed;
    if (Math.abs(change) < limit) return target - current;
    return change;
}

export { degToRad, radToDeg, perpendicular, random, pickRandom, lerp };