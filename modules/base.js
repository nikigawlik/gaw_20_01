export function createInstance(x = 0, y = 0, rad = 0) {
    return {
        x: x,
        y: y,
        rad: rad,
        step: self => null,
    }
}