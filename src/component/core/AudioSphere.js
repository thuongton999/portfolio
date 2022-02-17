import React from 'react';
import * as THREE from 'three';
import styled, { keyframes } from 'styled-components';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import useStore from '../../hook/useStore';

class AudioData {
    constructor(audio, fftSize = 8192, smoothing = 0.8) {
        this.audio = audio;
        this.audioContext = new AudioContext();
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = fftSize;
        this.analyser.smoothingTimeConstant = smoothing;
        this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
        this.audioSource = this.audioContext.createMediaElementSource(this.audio);
        this.audioSource.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
    }
    play() {
        this.audioContext.resume()
            .then(() => this.audio.play())
            .catch(console.error);
    }
    pause() {
        this.audio.pause();
    }
    get frequency() {
        this.analyser.getByteFrequencyData(this.frequencyData);
        return this.frequencyData;
    }
}

class ParticlesSphere {
    constructor(radius = 100, numParticles = 4000, turns = 60) {
        this.radius = radius;
        this.numParticles = numParticles;
        // Number of times to turn around the y-axis
        this.turns = turns;
        this.step = 2 / this.numParticles;

        this.geometry = new THREE.BufferGeometry();
        this.lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0xffffff 
        });
        this.initPositions = new Float32Array(this.numParticles * 3);
        this.init();
    }
    // Create a discretized 3D sphere of particles using a spiral discretization
    // See https://gist.github.com/aptxwang/628a2b038c6d01ecbc57
    // Note that this paper could also be interesting to look more into: 
    // https://agupubs.onlinelibrary.wiley.com/doi/epdf/10.1029/2007GC001581
    init() {
        const positions = new Float32Array(this.numParticles * 3);
        let index = 0;
        for (let i = -1; i <= 1; i += this.step) {
            const phi = Math.acos(i);
            const theta = (2 * this.turns * phi) % (2 * Math.PI);

            // Note that y and z are flipped in the following calculations 
            // since the cartesian coordinate system is in a different rotation
            // in Three.js than it typically is visualized in math courses
            positions[index++] = Math.cos(theta) * Math.sin(phi) * this.radius;
            positions[index++] = Math.sin(theta) * Math.sin(phi) * this.radius;
            positions[index++] = Math.cos(phi) * this.radius;
        }
        this.initPositions = [...positions];
        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
    /**
     * @param {boolean} bool
     */
    set positionNeedsUpdate(bool) {
        this.geometry.getAttribute('position').needsUpdate = bool;
        this.geometry.computeBoundingBox();
        this.geometry.computeBoundingSphere();
    }
    get lineMesh() {
        return new THREE.Line(this.geometry, this.lineMaterial);
    }
}

const StyledAudioSphere = styled.div`
    position: relative;
    width: 60vh;
    height: 60vh;
    z-index: 1;
`;

const StyledCanvasWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    & > canvas {
        position: absolute;
        width: 100vh !important;
        height: 100vh !important;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

const StyledAudio = styled.audio`
    display: none;
`;

const DumbAnimation = keyframes`
    0% {background-position: left;}
    50% {background-position: right;}
    100% {background-position: left;}
`;
// gradient text (trick)

const StyledAudioControls = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 6rem;
    height: 2rem;
    top: 100%;
    left: 100%;
    transform: translateY(-50%);
    overflow: hidden;
    color: var(--primary);
    font-family: var(--codeFont);
    font-weight: bold;
    border-radius: 1.5rem;
    border: 1.5px solid var(--text);
    transition: all 0.25s ease-in-out;

    &::before {
        content: 'AUDIO';
    }
    &::after {
        content: '⬤';
        font-size: 1.5rem;
        background-size: 400% 100%;
        background-image: linear-gradient(to right, var(--primary), #9dc5c3);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: ${DumbAnimation} 10s infinite;
    }

    &[active=true] {
        color: var(--secondary);
        &::after {
            background-image: linear-gradient(to right, 
                #FEED07, 
                #FE6A50, 
                #ED00AA, 
                #2FE3FE, 
                #8900FF
            );
        }
    }
`;

function AudioSphere(props) {
    const audioEl = React.useRef(null);
    const audioControlEl = React.useRef(null);
    const canvasWrapper = React.useRef(null);
    const cursorEl = useStore(state => state.cursorRef);
    let activeAudio = false;
    let isInteracting = false;

    let frameId;
    let camera, scene, renderer, controls;
    let audioData;
    let particlesSphere, sphereMesh, center;
    // Skip the first frequencies as they have too big values and mess up the shape of the sphere
    let skipFreq = 620;

    const onWindowResize = (resizeEvent) => {
        if (!renderer || !camera) return;
        let width = canvasWrapper.current?.offsetWidth;
        let height = canvasWrapper.current?.offsetHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }
    const onMouseDown = () => {
        isInteracting = true;
    }
    const onMouseUp = () => {
        isInteracting = false;
    }

    const init = () => {
        const container = canvasWrapper.current;
        // renderer
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        // scene
        scene = new THREE.Scene();
        // camera
        camera = new THREE.PerspectiveCamera(
            45,
            container.offsetWidth / container.offsetHeight,
            0.001,
            1000
        );
        // orbit controls 
        controls = new OrbitControls(camera, container);
        controls.enableDamping = true;
        controls.enableZoom = false;
        controls.enablePan = false;

        camera.position.set(0, 100, 500);
        particlesSphere = new ParticlesSphere(100, 2000, 30);
        sphereMesh = particlesSphere.lineMesh;
        center = Math.floor(particlesSphere.numParticles / 2);
        scene.add(sphereMesh);
        container.appendChild(renderer.domElement);
        container.addEventListener("mousedown", onMouseDown);
        container.addEventListener("mouseup", onMouseUp);
    }
    const render = () => {
        frameId = requestAnimationFrame(render);
        if (!isInteracting) {
            sphereMesh.rotation.y += 0.01;
            sphereMesh.rotation.x += 0.01;
            sphereMesh.rotation.z += 0.01;
        }
        const frequencyData = audioData?.frequency;
        if (frequencyData) {
            const positions = particlesSphere.geometry.getAttribute('position').array;
            for (let i = 0; i <= center; i++) {
                if (i + skipFreq >= frequencyData.length) continue;
                const factor = frequencyData[i + skipFreq] / 256 + 1; // between 1 and 2
                let vertexIndex = center + i;       
                positions[vertexIndex * 3] = particlesSphere.initPositions[vertexIndex * 3] * factor;
                positions[vertexIndex * 3 + 1] = particlesSphere.initPositions[vertexIndex * 3 + 1] * factor;
                positions[vertexIndex * 3 + 2] = particlesSphere.initPositions[vertexIndex * 3 + 2] * factor;

                vertexIndex = center - i;
                positions[vertexIndex * 3] = particlesSphere.initPositions[vertexIndex * 3] * factor;
                positions[vertexIndex * 3 + 1] = particlesSphere.initPositions[vertexIndex * 3 + 1] * factor;
                positions[vertexIndex * 3 + 2] = particlesSphere.initPositions[vertexIndex * 3 + 2] * factor;
            }
            particlesSphere.positionNeedsUpdate = true;
        }
        controls.update();
        renderer.render(scene, camera);
    }
    const stop = () => {
        if (!frameId) return;
        cancelAnimationFrame(frameId);
        const container = canvasWrapper.current;
        container?.removeEventListener("mousedown", onMouseDown);
        container?.removeEventListener("mouseup", onMouseUp);
    }

    const onMouseEnter = () => {
        if (!cursorEl?.current) return;
        cursorEl.current.setAttribute('hover', true);
    }
    const onMouseLeave = () => {
        if (!cursorEl?.current) return;
        cursorEl.current.removeAttribute('hover');
    }
    const onClick = () => {
        setActiveAudio(!activeAudio);
    }
    const onAudioEnded = () => {
        setActiveAudio(false);
    }
    const setActiveAudio = (isActive) => {
        activeAudio = isActive;
        if (!audioData) audioData = new AudioData(audioEl.current);
        if (isActive) audioData.play();
        else audioData.pause();
        audioControlEl.current.setAttribute('active', isActive);
    }

    React.useEffect(() => {
        const audioControl = audioControlEl.current;
        const audio = audioEl.current;
        try {
            init();
            render();
        } catch(err) {
            console.error(err);
        }
        setActiveAudio(activeAudio);
        audioControl.addEventListener("click", onClick);
        audio.addEventListener("ended", onAudioEnded);
        window.addEventListener("resize", onWindowResize);
        return () => {
            audioControl?.removeEventListener("click", onClick);
            audio?.removeEventListener("ended", onAudioEnded);
            window.removeEventListener('resize', onWindowResize);
            stop();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <StyledAudioSphere>
            <StyledAudio ref={audioEl} src={props.src} />
            <StyledCanvasWrapper ref={canvasWrapper} />
            <StyledAudioControls 
                ref={audioControlEl} 
                onMouseEnter={onMouseEnter} 
                onMouseLeave={onMouseLeave} />
        </StyledAudioSphere>
    )
}

export default AudioSphere;