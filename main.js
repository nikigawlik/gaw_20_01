import {waitForSeconds} from "./modules/timing.js"
import * as player from "./modules/player.js"

window.onload = async function() {
    init();
    while(true) {
        let nextFramePromise = waitForSeconds(1/64);
        step();
        await nextFramePromise;
    }
}

// global data
let backgroundStyle = "#203123"
let virtualCanvasWidth = 100;
let virtualCanvasHeight = 0; // changed later

let instances = [];
let canvas = null;
let ctx = null;

// update functions

function init() {
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    resizeCanvas();
    clearScreen()
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
        let p = player.create();
        instances.push(p);
    }
}

function step() {
    console.log("step");
    for (const inst of instances) {
        update(inst);
    }
    clearScreen();
    for (const inst of instances) {
        render(inst);
    }
}

function update(inst) {
    inst.step(inst);
}

function render(inst) {
    const rad = inst.rad || 10;
    const x = inst.x || 0;
    const y = inst.y || 0;

    const scale = canvas.width / virtualCanvasWidth;

    ctx.beginPath();
    ctx.arc(x * scale, y * scale, rad * scale, 0, 2 * Math.PI, false);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';
    ctx.stroke();
}

function clearScreen() {
    ctx.fillStyle = backgroundStyle;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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