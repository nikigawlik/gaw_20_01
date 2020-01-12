import * as base from "./base.js"
import * as obstacle from "./obstacle.js"
import { viewX, viewY, virtualCanvasHeight } from "./main.js";

export function create(x=0, y=0) {
    let self = base.createInstance(x, y);
    Object.assign(self, {
        step: step,
        rad: 0,
        counter: 0,
    });
    return self;
}

function step(self) {
    if(self.y - viewY > -26) {
        let inst = obstacle.create(viewX, self.y, self.counter);
        if(self.counter == 0) {
            inst.cycleLength = 256;
            inst.cycleOffset = 0.5;
            console.log("COUNTER = 0")
        }
        self.counter++;
        self.y -= 26;
    }
}