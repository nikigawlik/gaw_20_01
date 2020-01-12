import * as base from "./base.js"
import * as graphics from "./graphics.js"
import { frame, viewY, destroy } from "./main.js";

export function create(x, y, number) {
    let self = base.createInstance(x, y, 5);
    Object.assign(self, {
        step: step,
        draw: draw,
        rad: 2,
        tag: "obstacle",
        path: [[20, y], [80, y]],
        xSpd: 0,
        ySpd: 0,
        cycleLength: 128 << Math.floor(Math.random()*3),
        cycleOffset: Math.floor(Math.random() * 4)/2,
        number: number,
    });
    return self;
}

function step(self) {
    let pathProgress = (frame % self.cycleLength) / self.cycleLength * self.path.length;
    pathProgress = (pathProgress + self.cycleOffset) % self.path.length;
    let i = Math.floor(pathProgress);
    let p1 = self.path[i];
    let p2 = self.path[(i+1) % self.path.length];
    let frac = pathProgress - i;
    let prevX = self.x;
    let prevY = self.y;
    frac = -Math.cos(frac * Math.PI)/2+0.5
    self.x = p1[0] * (1 - frac) + p2[0] * frac;
    self.y = p1[1] * (1 - frac) + p2[1] * frac;
    self.xSpd = self.x - prevX;
    self.ySpd = self.y - prevY;

    if(self.y - viewY > 230) {
        destroy(self);
    }
}

function draw(self) {
    for(let i = 0; i < self.path.length; i++) {
        let p1 = self.path[i];
        let p2 = self.path[(i+1) % self.path.length];
        graphics.line(p1[0], p1[1], p2[0], p2[1]);
    }
}