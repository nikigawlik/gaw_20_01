import {waitForSeconds} from "./modules/timing.js"

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

let gameObjects = [];
let canvas = null;
let ctx = null;

// update functions

function init() {
    // create canvas
    let main = document.querySelector("main");
    canvas = document.createElement("canvas");
    let aspectRatio = main.clientWidth / window.innerHeight;
    virtualCanvasHeight = virtualCanvasWidth / aspectRatio;
    canvas.width = main.clientWidth;
    canvas.height = Math.ceil(canvas.width / aspectRatio);
    ctx = canvas.getContext("2d");
    clearScreen()
    main.append(canvas);
}

function step() {
    console.log("step");
    for (const obj of gameObjects) {
        update(obj);
    }
    clearScreen();
    for (const obj of gameObjects) {
        render(obj);
    }

    // test
    if(Math.random() < .01) {
        gameObjects.push({
            x: virtualCanvasWidth / 2 + (Math.random() * 2 - 1) * 20,
            y: virtualCanvasHeight / 2 + (Math.random() * 2 - 1) * 20,
            rad: Math.random() * 3 + 5,
        })
    }
}

function update(obj) {
    obj.x += Math.random()*2-1;
    obj.y += Math.random()*2-1;
}

function render(obj) {
    const rad = obj.rad || 10;
    const x = obj.x || 0;
    const y = obj.y || 0;

    const scale = canvas.width / virtualCanvasWidth;

    ctx.beginPath();
    ctx.arc(x * scale, y * scale, rad * scale, 0, 2 * Math.PI, false);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'white';
    ctx.stroke();
}

function clearScreen() {
    ctx.fillStyle = backgroundStyle;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}