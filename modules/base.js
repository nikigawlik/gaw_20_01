import * as main from "./main.js"

export function createInstance(x = 0, y = 0, rad = 0) {
    let self = {
        x: x,
        y: y,
        rad: rad,
        step: self => null,
        draw: self => null,
    };

    main.addInstance(self);
    return self;
}