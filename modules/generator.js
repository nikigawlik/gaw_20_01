import * as base from "./base.js"
import * as obstacle from "./obstacle.js"
import { viewX, viewY, virtualCanvasHeight } from "./main.js";

export function create() {
    let self = base.createInstance();
    Object.assign(self, {
        y: virtualCanvasHeight - 25,
        step: step,
        rad: 0,
    });
    return self;
}

function step(self) {
    if(Math.abs(self.y - viewY) > 26) {
        obstacle.create(viewX, self.y - 50);
        self.y -= 26;
    }
}