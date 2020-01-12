import * as base from "./base.js"
import * as graphics from "./graphics.js"
import { collidesWithInstance, collidesWithInstanceAt } from "./collision.js";
import { playCrash, playDing } from "./sound.js";
import { viewX, viewY, virtualCanvasHeight, virtualCanvasWidth, instances } from "./main.js";
import { loadOverlay } from "./menus.js";

const gravity = 1/8;
const jumpStrength = 3;
const wallThickness = 3;

export function create(x = 50, y = 100) {
    let self = base.createInstance(x, y, 3.5);
    init(self);
    Object.assign(self, {
        xSpd: 0,
        ySpd: -jumpStrength,
        step: step,
        draw: draw,
        grabbedAnchor: null,
        lastGrabbedAnchor: null,
        jumpFlag: false,
        snapToNext: true,
    })
    return self;
}

function init(self) {
    let supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
    graphics.canvas.addEventListener(supportsTouch? 'touchstart' : 'mousedown', () => jump(self));  
}

function jump(self) {
    self.jumpFlag = true;
}

function step(self) {
    const prevX = self.x;
    const prevY = self.y;
    self.x += self.xSpd;
    self.y += self.ySpd;
    self.ySpd += gravity;

    // wall collision
    if(self.x - self.rad <= wallThickness || self.x + self.rad >= virtualCanvasWidth - wallThickness)  {
        self.xSpd *= -1;
        self.x = prevX;
    }

    const jumped = self.jumpFlag;
    self.jumpFlag = false;

    if(!self.grabbedAnchor) {
        let other = null;
        const collisionSteps = 2;
        for(let i = 0; i < collisionSteps; i++) {
            let delta = (i+1)/collisionSteps;
            let x = prevX * (1-delta) + self.x * delta;
            let y = prevY * (1-delta) + self.y * delta;
            other = collidesWithInstanceAt(self, x, y, "obstacle");
            if(other) break;
        }
        
        if(other && (other != self.lastGrabbedAnchor || self.ySpd > 0)) {
            graphics.setShake(self.xSpd * 1 + (Math.random() * 2 - 1) * 1, self.ySpd * 1 + (Math.random() * 2 - 1) * 1);

            self.grabbedAnchor = other;
            self.xSpd = 0;
            self.ySpd = 0;
            self.x = other.x;
            self.y = other.y;

            playDing();
        }
    } else {
        self.x = self.grabbedAnchor.x;
        self.y = self.grabbedAnchor.y;
        self.xSpd = self.grabbedAnchor.xSpd;
        self.ySpd = self.grabbedAnchor.ySpd;

        if(jumped) {
            self.ySpd -= jumpStrength;
            self.lastGrabbedAnchor = self.grabbedAnchor;
            self.grabbedAnchor = null;

            playCrash();
        }
    }

    // death check
    if(self.y > viewY + 210) {
        loadOverlay("tplMainMenu");
        instances.splice(instances.indexOf(self), 1);
    }
}

function draw(self) {
    const a = Math.PI / 2;
    const off = Math.PI / 4;
    const r = 2.5 * Math.SQRT2;
    for(let i = 0; i < 4; i++) {
        graphics.line(
            self.x + Math.cos(off + a * i) * r,
            self.y + Math.sin(off + a * i) * r,
            self.x + Math.cos(off + a * (i+1)) * r,
            self.y + Math.sin(off + a * (i+1)) * r
        )
    }

    //walls
    graphics.line(viewX + wallThickness, viewY, viewX + wallThickness, viewY + virtualCanvasHeight);
    graphics.line(viewX + virtualCanvasWidth - wallThickness, viewY, viewX + virtualCanvasWidth - wallThickness, viewY + virtualCanvasHeight);
}