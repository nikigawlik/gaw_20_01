import {waitForSeconds, waitForFrame} from "./timing.js"
import * as player from "./player.js"
import * as graphics from "./graphics.js"
import * as generator from "./generator.js"

window.onload = async function() {
    init();
    while(true) {
        let nextFramePromise = waitForFrame();//waitForSeconds(1/64);
        step();
        await nextFramePromise;
    }
}

// global data
export let virtualCanvasWidth = 100;
export let virtualCanvasHeight = 0; // changed later

let instances = [];
let canvas = null;

export let viewX = 0;
export let viewY = 0;

export let frame = 0;

let verticalScroll = -0.15;

// update functions

function init() {
    canvas = document.createElement("canvas");
    graphics.setCanvas(canvas);
    resizeCanvas();
    // create canvas
    let main = document.querySelector("main");
    main.append(canvas);

    // event stuff
    document.addEventListener('touchstart', e => {
        if(!document.fullscreenElement) document.body.requestFullscreen();
    })
    window.addEventListener('resize', e => resizeCanvas());
    canvas.onclick = () => {
        //test
        player.create(50, viewY + 100);
    }

    // misc
    generator.create();
}

function step() {
    console.log("step");
    viewY += verticalScroll;
    for (const inst of instances) {
        update(inst);
    }
    drawBackground();
    for (const inst of instances) {
        graphics.instance(inst);
    }
    frame++;
}

function update(inst) {
    inst.step(inst);
}

let backgroundStyle = "#203123"
export function drawBackground() {
    graphics.clear(backgroundStyle);
    const d = 5;
    const baseY = Math.floor(viewY/d)*d;
    const n = Math.ceil(virtualCanvasHeight / d) + 1;
    for(let i = 0; i < n; i++) {
        const lineY = baseY + i*d;
        graphics.line(0, lineY, virtualCanvasWidth, lineY, "#435434");
    }
}

function resizeCanvas() {
    let main = document.querySelector("main");
    let aspectRatio = main.clientWidth / window.innerHeight;
    virtualCanvasHeight = virtualCanvasWidth / aspectRatio;
    let width = main.clientWidth;
    let height = Math.ceil(width / aspectRatio);
    if(width != canvas.width) canvas.width = width
    if(height != canvas.height) canvas.height = height
}

export function addInstance(inst) {
    instances.push(inst);
}