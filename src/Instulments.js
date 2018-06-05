'use strict';

class Instruments {
  static connect() {
    const I = Instruments;
    const ctx = I.getCtx();
    const gainMic = I.getGainMic();
    const gainMaster = I.getGainMaster();
    const comp = I.getComp();
    const micP = I.attachMic();
    return micP
      .then(() => {
        const mic = I.getSrcMic();
        mic.connect(gainMic);
        gainMic.connect(gainMaster);
        gainMaster.connect(comp);
        comp.connect(ctx.destination);
      })
      .catch(() => {
        console.warn('mic not found!');
      });
  }

  static init() {
    Instruments.ctx = void 0;
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
  }

  static getGainSquare() {
  }

  static getGainMaster() {
    if (Instruments.gain.master) {
      return Instruments.gain.master;
    }
    const ctx = Instruments.getCtx();
    const gainMaster = ctx.createGain();
    Instruments.gain.master = gainMaster;
    return gainMaster;
  }

  static getLpf() {
  }

  static getHpf() {
  }

  static getDistortion() {
  }

  static getVibrato() {
  }

  static getDelay() {
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
}

module.exports = Instruments;