'use strict';

export default class Instruments {
  static connect() {
    const I = Instruments;
    const ctx = I.getCtx();
    const sine = I.getSrcSine();
    const gainSine = I.getGainSine();
    const gainMic = I.getGainMic();
    const lpf = I.getLpf();
    const delay = I.getDelay();
    const comp = I.getComp();
    const gainMaster = I.getGainMaster();
    const analyserMaster = I.getAnalyserMaster();
    const micP = I.attachMic();
    return micP
      .then(() => {
        const mic = I.getSrcMic();
        sine.connect(gainSine);
        gainSine.connect(lpf);
        mic.connect(gainMic);
        gainMic.connect(lpf);
        lpf.connect(delay);
        delay.connect(comp);
        comp.connect(gainMaster);
        gainMaster.connect(analyserMaster);
        analyserMaster.connect(ctx.destination);
      })
      .catch((e) => {
        console.error(e);
        console.warn('mic not found!');
      });
  }

  static init() {
    Instruments.ctx = void 0;
    Instruments.analyser = {
      master: void 0,
    };
    Instruments.src = {
      mic: void 0,
      file: void 0,
      sine: void 0,
      square: void 0,
    };
    Instruments.gain = {
      mic: void 0,
      file: void 0,
      sine: void 0,
      square: void 0,
      master: void 0,
    };
    Instruments.filter = {
      lpf: void 0,
      hpf: void 0,
    };
    Instruments.effector = {
      distortion: void 0,
      vibrato: void 0,
      delay: void 0,
      bitCrash: void 0,
    };
    Instruments.finisher = {
      comp: void 0,
    };
    Object.seal(Instruments);
  }

  /**
   * @return {AudioContext}
   */
  static getCtx() {
    Instruments.ctx = Instruments.ctx || new window.AudioContext();
    return Instruments.ctx;
  }

  static getSrcMic() {
    if (Instruments.src && Instruments.src.mic) {
      return Instruments.src.mic;
    }
    return null;
  }

  /**
   *
   * @return {Promise}
   */
  static attachMic() {
    if (Instruments.src && Instruments.src.mic) {
      return new Promise((resolve) => {
        resolve(Instruments.src.mic);
      });
    }

    const getUserMediaPromisify = (() => {
      const p = new Promise((resolve, reject) => {
        const constraint = {
          audio: true,
          video: false,
        };
        navigator.getUserMedia(constraint, resolve, reject);
      });
      return p;
    })();

    return getUserMediaPromisify
      .then((stream) => {
        const ctx = Instruments.getCtx();
        const mic = ctx.createMediaStreamSource(stream);
        Instruments.src = Instruments.src || {};
        Instruments.src.mic = mic;
      });
  }

  static getSrcFile() {
  }

  static getSrcSine() {
    if (Instruments.src && Instruments.src.sine) {
      return Instruments.src.sine;
    }
    const ctx = Instruments.getCtx();
    const srcSine = ctx.createOscillator();
    srcSine.type = 'sine';
    srcSine.frequency.value = 1760;
    // srcSine.gain.value = 1;
    Instruments.src.sine = srcSine;
    srcSine.start();

    return srcSine;
  }

  static getSrcSquare() {
  }

  static getGainMic() {
    if (Instruments.gain.mic) {
      return Instruments.gain.mic;
    }
    const ctx = Instruments.getCtx();
    const gainMic = ctx.createGain();
    Instruments.gain.mic = gainMic;
    return gainMic;
  }

  static getGainFile() {
  }

  static getGainSine() {
    if (Instruments.gain.sine) {
      return Instruments.gain.sine;
    }
    const ctx = Instruments.getCtx();
    const gainSine = ctx.createGain();
    Instruments.gain.sine = gainSine;
    return gainSine;
  }

  static getGainSquare() {
  }

  static getGainMaster() {
    if (Instruments.gain.master) {
      return Instruments.gain.master;
    }
    const ctx = Instruments.getCtx();
    const gainMaster = ctx.createGain();
    gainMaster.gain.value = 0.01 // デフォルト
    Instruments.gain.master = gainMaster;
    return gainMaster;
  }

  static getLpf() {
    if (Instruments.filter.lpf) {
      return Instruments.filter.lpf;
    }
    const ctx = Instruments.getCtx();
    const lpf = ctx.createBiquadFilter();
    lpf.type = 'highshelf';
    lpf.frequency.setValueAtTime(2000, ctx.currentTime);
    lpf.gain.setValueAtTime(-25, ctx.currentTime);

    Instruments.filter.lpf = lpf;
    return lpf;
  }

  static getHpf() {
  }

  static getDistortion() {
  }

  static getVibrato() {
  }

  static getDelay() {
    if (Instruments.filter.delay) {
      return Instruments.filter.delay;
    }
    const ctx = Instruments.getCtx();
    const delay = ctx.createDelay();
    delay.delayTime.value = 0;
    Instruments.filter.delay = delay;
    return delay;
  }

  static getBitCrash() {
  }

  static getComp() {
    if (Instruments.finisher.comp) {
      return Instruments.finisher.comp;
    }
    const ctx = Instruments.getCtx();
    const comp = ctx.createDynamicsCompressor();
    Instruments.finisher.comp = comp;
    return comp;
  }

  static getAnalyserMaster() {
    if (Instruments.analyser.master) {
      return Instruments.analyser.master;
    }
    const ctx = Instruments.getCtx();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;

    Instruments.analyser.master = analyser;
    return analyser;
  }
}
