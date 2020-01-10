
import {virtualCanvasWidth, virtualCanvasHeight, viewX, viewY} from "./main.js"
let canvas = null;
let ctx = null;

export function setCanvas(newCanvas, virtualCanvasWidth, virtualCanvasHeight) {
    canvas = newCanvas;
    ctx = canvas.getContext('2d');
}

export function instance(inst) {
    inst.draw(inst);
    // rad drawing
    const rad = inst.rad || 0;
    let x = inst.x || 0;
    let y = inst.y || 0;
    const scale = canvas.width / virtualCanvasWidth;
    x = (x - viewX) * scale;
    y = (y - viewY) * scale;

    ctx.beginPath();
    ctx.arc(x, y, rad * scale, 0, 2 * Math.PI, false);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';
    ctx.stroke();
}

export function clear(style) {
    ctx.fillStyle = style;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function line(x1, y1, x2, y2, style="#fddffd") {
    const scale = canvas.width / virtualCanvasWidth;
    x1 = (x1 - viewX) * scale;
    y1 = (y1 - viewY) * scale;
    x2 = (x2 - viewX) * scale;
    y2 = (y2 - viewY) * scale;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = style;
    ctx.stroke();
}