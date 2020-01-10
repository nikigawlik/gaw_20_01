export function waitForSeconds(t) {
    return new Promise((resolve) => setTimeout(resolve, t * 1000));
}

export function waitForFrame() {
    return new Promise((resolve) => window.requestAnimationFrame(resolve));
}