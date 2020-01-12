import { resetGame } from "./main.js";

let currentOverlay = null;

export function loadOverlay(templateID) {
    clearOverlay();
    currentOverlay = document.querySelector(`#${templateID}`).content.cloneNode(true).firstElementChild;
    let main = document.querySelector("main");
    main.insertBefore(currentOverlay, document.querySelector("main canvas"));
    // handle resizing
    let func = (ev) => {
        currentOverlay.setAttribute("style",`width:${~~(main.offsetWidth)}px; height:${~~(main.offsetHeight)}px`);
    };
    window.onresize = func;
    func();

    setupEvents(currentOverlay);
}

export function clearOverlay() {
    if(!currentOverlay)
        return;
    currentOverlay.remove();
    currentOverlay = null;
}

function setupEvents(container) {
    for(let b of container.querySelectorAll("button.restartRoom")) {
        b.onclick = e => {
            resetGame();
            clearOverlay();
        }
    }
}