import {waitForSeconds, waitForFrame} from "./timing.js"
import * as player from "./player.js"
import * as graphics from "./graphics.js"
import * as generator from "./generator.js"
import { loadOverlay } from "./menus.js"
import { KEY_CODES } from "./utils.js"

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

export let instances = [];
let canvas = null;

export let viewX = 0;
export let viewY = 0;

export let frame = 0;

export let score = 0;
export let setScore = a => { score = a};
export let addScore = a => { score += a};

let verticalScroll = -0.15;
let curPlayer = null;

// update functions

function init() {
    canvas = document.createElement("canvas");
    graphics.setCanvas(canvas);
    resizeCanvas();
    // create canvas
    let main = document.querySelector("main");
    let dummy = main.querySelector(".gameDummy")
    main.insertBefore(canvas, dummy);
    dummy.remove();

    // event stuff
    let fullscreenButton = main.querySelector(".fullscreenBox button");
    fullscreenButton.addEventListener('click', e => {
        if(!document.fullscreenElement) 
            document.body.requestFullscreen();
    })
    window.addEventListener('fullscreenchange', e => {
        fullscreenButton.style.display = document.fullscreenElement? "none" : "block";
    })

    window.addEventListener('resize', e => resizeCanvas());

    window.addEventListener('keyup', e => {
        if(e.keyCode == KEY_CODES.ESCAPE) {
            loadOverlay("tplMainMenu");
        }
    });

    // misc
    // resetGame();
    loadOverlay("tplMainMenu")
    // generator.create(0, 100);
}

export function resetGame() {
    instances = [];
    viewY = viewX = 0;
    frame = 0;
    setScore(0);
    generator.create(0, 100);
    curPlayer = player.create(50, 120);
}

function step() {
    let scroll = verticalScroll;
    if(curPlayer) {
        if(curPlayer.y - viewY < 50) {
            scroll *= 1.5;
        }
        if(curPlayer.y - viewY > 110) {
            scroll /= 1.5;
        }
    }
    
    viewY += scroll;

    for (const inst of instances) {
        update(inst);
    }
    drawBackground();
    graphics.update();
    for (const inst of instances) {
        graphics.instance(inst);
    }
    frame++;
}

function update(inst) {
    inst.step(inst);
}

export function destroy(inst) {
    let index = instances.indexOf(inst);
    if(index >= 0) instances.splice(index, 1);
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
