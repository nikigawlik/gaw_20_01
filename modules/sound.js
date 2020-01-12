let audioCtx = new AudioContext();
let master = audioCtx.createGain();
master.gain.setValueAtTime(0.35, audioCtx.currentTime); // keep it civil!
master.connect(audioCtx.destination);

export function playCrash(volume = 1) {
    const srate = 8000;
    const length = srate*.1;
    let buffer = audioCtx.createBuffer(1, length, srate);
    let data = buffer.getChannelData(0);

    for(let t = 0; t < length; t++) {
        let env = (1- t / length);
        let kick = Math.sin(env**32 * 0x11f);
            data[t] = kick
        ;
    }

    let source = audioCtx.createBufferSource();
    source.buffer = buffer;
    // source.loop = true;

    source.connect(master);
    source.start();
}

export function playDing(volume = 1) {
    const srate = 8000;
    const length = srate*1;
    let buffer = audioCtx.createBuffer(1, length, srate);
    let data = buffer.getChannelData(0);

    for(let t = 0; t < length; t++) {
        let env = (1- t / length);
        let pling = Math.sin(env**1.1 * 0x111f) * env**23;
        data[t] = pling;
    }

    let source = audioCtx.createBufferSource();
    source.buffer = buffer;
    // source.loop = true;

    source.connect(master);
    source.start();
}