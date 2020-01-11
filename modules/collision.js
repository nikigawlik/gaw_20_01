import {instances} from "./main.js"

export function collidesWithInstance(self, tag=null) {
    return collidesWithInstanceAt(self, self.x, self.y, tag);
}

export function collidesWithInstanceAt(self, x, y, tag=null) {
    for(let other of instances) {
        if(tag == null || other.tag == tag) {
            if((x - other.x) ** 2 + (y - other.y) ** 2 < (self.rad + other.rad) ** 2) {
                return other;
            }
        }
    }
    return null;
}

