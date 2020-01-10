import * as base from "./base.js"
import * as graphics from "./graphics.js"
import { frame } from "./main.js";

export function create(x, y) {
    let self = base.createInstance(x, y, 5);
    Object.assign(self, {
        step: step,
        draw: draw,
        rad: 2,
        path: [[20, y], [80, y]],
        cycleLength: 64 << Math.floor(Math.random()*4)
    });
    return self;
}

function step(self) {
    let pathProgress = (frame % self.cycleLength) / self.cycleLength * self.path.length;
    let i = Math.floor(pathProgress);
    let p1 = self.path[i];
    let p2 = self.path[(i+1) % self.path.length];
    let frac = pathProgress - i;
    self.x = p1[0] * (1 - frac) + p2[0] * frac;
    self.y = p1[1] * (1 - frac) + p2[1] * frac;
}

function draw(self) {
    for(let i = 0; i < self.path.length; i++) {
        let p1 = self.path[i];
        let p2 = self.path[(i+1) % self.path.length];
        graphics.line(p1[0], p1[1], p2[0], p2[1]);
    }
}