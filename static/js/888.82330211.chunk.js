"use strict";(self.webpackChunkthuongton999=self.webpackChunkthuongton999||[]).push([[888],{4888:function(n,t,e){e.r(t),e.d(t,{default:function(){return R}});var i,r,o,a,s,u=e(168),c=e(5751),d=e(2791),l=e(7e3),f=e(242),h=e(1276),v=e(2982),m=e(5671),p=e(3144),g=e(3196),x=e(9738),y=e(5249),b=e(184),w=function(){function n(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:8192,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.8;(0,m.Z)(this,n),this.audio=t,this.audioContext=new AudioContext,this.analyser=this.audioContext.createAnalyser(),this.analyser.fftSize=e,this.analyser.smoothingTimeConstant=i,this.frequencyData=new Uint8Array(this.analyser.frequencyBinCount),this.audioSource=this.audioContext.createMediaElementSource(this.audio),this.audioSource.connect(this.analyser),this.analyser.connect(this.audioContext.destination)}return(0,p.Z)(n,[{key:"play",value:function(){var n=this;this.audioContext.resume().then((function(){return n.audio.play()})).catch(console.error)}},{key:"pause",value:function(){this.audio.pause()}},{key:"frequency",get:function(){return this.analyser.getByteFrequencyData(this.frequencyData),this.frequencyData}}]),n}(),Z=function(){function n(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4e3,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:60;(0,m.Z)(this,n),this.radius=t,this.numParticles=e,this.turns=i,this.step=2/this.numParticles,this.geometry=new g.u9r,this.lineMaterial=new g.nls({color:16777215}),this.initPositions=new Float32Array(3*this.numParticles),this.init()}return(0,p.Z)(n,[{key:"init",value:function(){for(var n=new Float32Array(3*this.numParticles),t=0,e=-1;e<=1;e+=this.step){var i=Math.acos(e),r=2*this.turns*i%(2*Math.PI);n[t++]=Math.cos(r)*Math.sin(i)*this.radius,n[t++]=Math.sin(r)*Math.sin(i)*this.radius,n[t++]=Math.cos(i)*this.radius}this.initPositions=(0,v.Z)(n),this.geometry.setAttribute("position",new g.TlE(n,3))}},{key:"positionNeedsUpdate",set:function(n){this.geometry.getAttribute("position").needsUpdate=n,this.geometry.computeBoundingBox(),this.geometry.computeBoundingSphere()}},{key:"lineMesh",get:function(){return new g.x12(this.geometry,this.lineMaterial)}}]),n}(),k=c.ZP.div(i||(i=(0,u.Z)(["\n    position: relative;\n    width: 60vh;\n    height: 60vh;\n    z-index: 1;\n"]))),P=c.ZP.div(r||(r=(0,u.Z)(["\n    position: relative;\n    width: 100%;\n    height: 100%;\n\n    & > canvas {\n        position: absolute;\n        width: 100vh !important;\n        height: 100vh !important;\n        top: 50%;\n        left: 50%;\n        transform: translate(-50%, -50%);\n    }\n"]))),E=c.ZP.audio(o||(o=(0,u.Z)(["\n    display: none;\n"]))),M=(0,c.F4)(a||(a=(0,u.Z)(["\n    0% {background-position: left;}\n    50% {background-position: right;}\n    100% {background-position: left;}\n"]))),F=c.ZP.div(s||(s=(0,u.Z)(["\n    position: absolute;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 5px;\n    width: 6rem;\n    height: 2rem;\n    top: 100%;\n    left: 100%;\n    transform: translateY(-50%);\n    overflow: hidden;\n    color: var(--primary);\n    font-family: var(--codeFont);\n    font-weight: bold;\n    border-radius: 1.5rem;\n    border: 1.5px solid var(--text);\n    transition: all 0.25s ease-in-out;\n\n    &::before {\n        content: 'AUDIO';\n    }\n    &::after {\n        content: '\u2b24';\n        font-size: 1.5rem;\n        background-size: 400% 100%;\n        background-image: linear-gradient(to right, var(--primary), #9dc5c3);\n        -webkit-background-clip: text;\n        -webkit-text-fill-color: transparent;\n        animation: "," 10s infinite;\n    }\n\n    &[active=true] {\n        color: var(--secondary);\n        &::after {\n            background-image: linear-gradient(to right, \n                #FEED07, \n                #FE6A50, \n                #ED00AA, \n                #2FE3FE, \n                #8900FF\n            );\n        }\n    }\n"])),M);var A,j,I,z=function(n){var t,e,i,r,o,a,s,u,c,l=d.useRef(null),f=d.useRef(null),h=d.useRef(null),v=(0,y.Z)((function(n){return n.cursorRef})),m=!1,p=!1,M=function(n){var t,i;if(r&&e){var o=null===(t=h.current)||void 0===t?void 0:t.offsetWidth,a=null===(i=h.current)||void 0===i?void 0:i.offsetHeight;e.aspect=o/a,e.updateProjectionMatrix(),r.setSize(o,a)}},A=function(){p=!0},j=function(){p=!1},I=function n(){var d;t=requestAnimationFrame(n),p||(u.rotation.y+=.01,u.rotation.x+=.01,u.rotation.z+=.01);var l=null===(d=a)||void 0===d?void 0:d.frequency;if(l){for(var f=s.geometry.getAttribute("position").array,h=0;h<=c;h++)if(!(h+620>=l.length)){var v=l[h+620]/256+1,m=c+h;f[3*m]=s.initPositions[3*m]*v,f[3*m+1]=s.initPositions[3*m+1]*v,f[3*m+2]=s.initPositions[3*m+2]*v,f[3*(m=c-h)]=s.initPositions[3*m]*v,f[3*m+1]=s.initPositions[3*m+1]*v,f[3*m+2]=s.initPositions[3*m+2]*v}s.positionNeedsUpdate=!0}o.update(),r.render(i,e)},z=function(){L(!m)},C=function(){L(!1)},L=function(n){m=n,a||(a=new w(l.current)),n?a.play():a.pause(),f.current.setAttribute("active",n)};return d.useEffect((function(){var n=f.current,a=l.current;try{!function(){var n=h.current;(r=new g.CP7({antialias:!0,alpha:!0})).setPixelRatio(window.devicePixelRatio),r.setSize(n.offsetWidth,n.offsetHeight),i=new g.xsS,e=new g.cPb(45,n.offsetWidth/n.offsetHeight,.001,1e3),(o=new x.z(e,n)).enableDamping=!0,o.enableZoom=!1,o.enablePan=!1,e.position.set(0,100,500),s=new Z(100,2e3,30),u=s.lineMesh,c=Math.floor(s.numParticles/2),i.add(u),n.appendChild(r.domElement),n.addEventListener("mousedown",A),n.addEventListener("mouseup",j)}(),I()}catch(d){console.error(d)}return L(m),n.addEventListener("click",z),a.addEventListener("ended",C),window.addEventListener("resize",M),function(){null===n||void 0===n||n.removeEventListener("click",z),null===a||void 0===a||a.removeEventListener("ended",C),window.removeEventListener("resize",M),function(){if(t){cancelAnimationFrame(t);var n=h.current;null===n||void 0===n||n.removeEventListener("mousedown",A),null===n||void 0===n||n.removeEventListener("mouseup",j)}}()}}),[]),(0,b.jsxs)(k,{children:[(0,b.jsx)(E,{ref:l,src:n.src}),(0,b.jsx)(P,{ref:h}),(0,b.jsx)(F,{ref:f,onMouseEnter:function(){null!==v&&void 0!==v&&v.current&&v.current.setAttribute("hover",!0)},onMouseLeave:function(){null!==v&&void 0!==v&&v.current&&v.current.removeAttribute("hover")}})]})},C=(0,c.F4)(A||(A=(0,u.Z)(["\n    0% {transform: rotate(0deg);}\n    100% {transform: rotate(360deg);}\n"]))),L=(0,c.ZP)(l.Z)(j||(j=(0,u.Z)(["\n    --ringBorder: 5px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background-image: url(https://www.wykop.pl/cdn/c3201142/comment_OAqGsPLvilIHGJLggfIbUe6i4lT2fDZ2.gif);\n\n    &::before {\n        content: '';\n        position: absolute;\n        width: 75vh;\n        height: 75vh;\n        /* gradient border with radius (trick) */\n        border: var(--ringBorder) solid transparent;\n        background:\n            linear-gradient(to right, \n                #FE6A50, \n                #ED00AA, \n                #2FE3FE, \n                #8900FF),\n            border-box;\n        background-size: calc(100% + var(--ringBorder) * 2) calc(100% + var(--ringBorder) * 2);\n        background-position: center;\n        -webkit-mask:\n            linear-gradient(#fff 0 0) padding-box, \n            linear-gradient(#fff 0 0);\n        -webkit-mask-composite: xor;\n        border-radius: 50%;\n        mask-composite: exclude;\n        /* end trick */\n        margin: auto;\n        z-index: 1;\n        animation: "," 10s alternate infinite;\n    }\n\n    &::after {\n        content: '';\n        position: absolute;\n        width: 100vw;\n        height: 100vh;\n        background-color: var(--background);\n        opacity: 0.5;\n        z-index: 0;\n    }\n"])),C),D=c.ZP.div(I||(I=(0,u.Z)(["\n    position: absolute;\n    top: 50%;\n    left: 25%;\n    transform: translate(-50%, -50%);\n    z-index: 1;\n"]))),B=["Back-end","Front-end","Computer Science","Game Dev","Gamer"];var R=function(n){var t=n.componentIndex,e=(0,y.Z)((function(n){return n.slideIndex}));return(0,b.jsxs)(L,{children:[d.useMemo((function(){return(0,b.jsx)(z,{src:"".concat("/portfolio","/audios/paradise_circus.mp3")})}),[]),(0,b.jsx)(h.Z,{texts:B,radius:250,active:e===t}),(0,b.jsx)(D,{children:(0,b.jsxs)(f.Z,{componentIndex:t,children:[(0,b.jsx)("h1",{children:"Hello, World!"}),(0,b.jsxs)("p",{children:["I'm Vu Tung Minh aka thuongton999",(0,b.jsx)("br",{}),(0,b.jsx)("br",{}),"I have a passion for programming and I'm currently learning web development."]})]})})]})}},242:function(n,t,e){var i,r=e(1413),o=e(168),a=e(5751),s=e(2791),u=e(5249),c=e(184),d=a.ZP.div(i||(i=(0,o.Z)(["\n    width: min-content;\n    opacity: ",";\n    filter: drop-shadow(0 0 10px var(--background));\n    transform: ",';\n    transition: all 1.2s ease-in-out;\n\n    & > * {\n        color: var(--text);\n    }\n\n    & > h1 {\n        font-size: 4em;\n        font-weight: 800;\n        font-family: var(--headerFont);\n    }\n\n    & > code {\n        font-family: var(--codeFont);\n    }\n\n    & > p {\n        display: flex;\n        transform: translateY(1em);\n        text-align: left;\n        font-family: var(--textFont);\n        vertical-align: middle;        \n\n        &::before {\n            content: "-";\n            transform: translateY(-35%);\n            font-size: 5em;\n            height: 100%;\n        }\n    }\n'])),(function(n){return n.active?1:0}),(function(n){return n.active?"translateX(0)":n.left?"translateX(-100%)":"translateX(100%)"}));function l(n){var t=n.componentIndex,e=(0,u.Z)((function(n){return n.slideIndex}));return(0,c.jsx)(d,(0,r.Z)((0,r.Z)({active:e===t,left:e>t},n),{},{children:n.children}))}t.Z=s.memo(l)},1276:function(n,t,e){var i,r,o=e(1413),a=e(168),s=e(5751),u=e(2791),c=e(184),d=s.ZP.ul(i||(i=(0,a.Z)(["\n    display: flex;\n    position: absolute;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    border-radius: 50%;\n    pointer-events: none;\n"]))),l=s.ZP.li(r||(r=(0,a.Z)(["\n    --opacity: 1;\n    position: absolute;\n    width: 100px;\n    color: var(--text);\n    opacity: calc(var(--opacity) * 1);\n    font-family: var(--codeFont);\n    font-weight: bold;\n    filter: drop-shadow(0 0 10px var(--background));\n    z-index: 9999999;\n    transition: all 0.5s ease;\n"])));function f(n){var t=n.texts,e=n.xOffset,i=n.yOffset,r=n.radius,a=n.active,s=n.activeAt,f=u.useRef([]),h=t.length,v=s||0===s?s:h/2,m=r,p=function(n){var t=function(n){return 5*Math.round(n-v)}(n);return{x:(m+(e||20))*Math.cos(t*Math.PI/90),y:(m+(i||0))*Math.sin(t*Math.PI/180)}};return u.useEffect((function(){var n=f.current;return n.forEach((function(n,t){var e=p(a?t:0),i=e.x,r=e.y,o=1;if(s||0===s){var u=Math.round(t-s);o=1-Math.abs(u)/h}n.style.setProperty("--opacity",a?o:0),n.style.transform="translate(calc(".concat(i,"px + 50%), ").concat(2*r,"px)")})),function(){n.forEach((function(n){return null===n||void 0===n?void 0:n.removeAttribute("active")}))}}),[a,s]),(0,c.jsx)(d,(0,o.Z)((0,o.Z)({},n),{},{children:null===t||void 0===t?void 0:t.map((function(n,t){return(0,c.jsx)(l,{ref:function(n){return f.current[t]=n},children:n},t)}))}))}t.Z=u.memo(f)},5249:function(n,t,e){var i=(0,e(2737).Z)((function(n){return{slideIndex:0,nextPage:function(){return n((function(n){return{slideIndex:n.slideIndex+1}}))},prevPage:function(){return n((function(n){return{slideIndex:n.slideIndex-1}}))},setPage:function(t){return n((function(n){return{slideIndex:t}}))},cursorRef:null,setCursorRef:function(t){return n((function(n){return{cursorRef:t}}))}}}));t.Z=i}}]);
//# sourceMappingURL=888.82330211.chunk.js.map