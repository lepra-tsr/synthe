import Drawer from './Drawer';

export const ANALYSE_FFT_SIZE = 2048;
const CEIL_FREQUENCY_THRESHOULD = 20 * 1000;
const SINE_FREQUENCY = 440;
const OSCILLATOR_TYPE = 'sine';

export default class App {
  static cx: AudioContext;
  static sampleRate: number;
  static ceilFrequency: number;
  static ceilIndexFFT: number;
  static animationId: number;
  static init(context) {
    App.cx = context;
    App.sampleRate = context.sampleRate;
    App.calculateCeilFrequency();
  }
  static calculateCeilFrequency() {
    const { sampleRate } = App;
    for (let i = 0; i < ANALYSE_FFT_SIZE; i++) {
      const f = sampleRate * (i / ANALYSE_FFT_SIZE)
      if (f > CEIL_FREQUENCY_THRESHOULD) {
        App.ceilFrequency = Math.floor(f);
        App.ceilIndexFFT = i;
        break;
      }
    }
  }
  static readWaveFile(audioFile: File) {
    const fr: FileReader = new FileReader();
    fr.addEventListener('load', () => {
      if (!(fr.result instanceof ArrayBuffer)) { return false }
      this.asyncDecodeAudioData(fr.result);
    }, false);
    fr.readAsArrayBuffer(audioFile);
  }
  private static asyncDecodeAudioData(data: ArrayBuffer) {
    App.cx.decodeAudioData(data, (decoded: AudioBuffer) => {
      const fileSource = App.cx.createBufferSource();
      fileSource.buffer = decoded;
      App.analyseSoundSource(fileSource);
    })
  }

  private static analyseSoundSource(node: AudioNode) {

    const analyser = App.cx.createAnalyser();
    analyser.fftSize = ANALYSE_FFT_SIZE;
    const scriptProcessor = App.cx.createScriptProcessor(analyser.fftSize, 1, 1);

    node.connect(analyser);
    analyser.connect(scriptProcessor);
    scriptProcessor.connect(App.cx.destination);
    scriptProcessor.onaudioprocess = App.onAudioProcessHandler.bind(this, analyser);

    if (node instanceof AudioBufferSourceNode || node instanceof OscillatorNode) {
      node.start(0);
    }
  }

  static connectSine() {
    const sineNode = App.cx.createOscillator();
    sineNode.frequency.setValueAtTime(SINE_FREQUENCY, App.cx.currentTime);
    sineNode.type = OSCILLATOR_TYPE;
    App.analyseSoundSource(sineNode);
  }

  static async connectMic() {
    const constraints: MediaStreamConstraints = { audio: true, video: false };
    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        const { cx } = App;
        const micNode = cx.createMediaStreamSource(stream);
        App.analyseSoundSource(micNode);
      })
  }

  static onAudioProcessHandler(analyser: AnalyserNode) {
    App.analyseFrequencyDomain(analyser);
    return false;
    App.analyseTimeDomain(analyser);
  }

  private static analyseTimeDomain(analyser: AnalyserNode) {
    const amplitudeArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(amplitudeArray);

    if (!!App.animationId) {
      window.cancelAnimationFrame(App.animationId)
    }
    App.animationId = window.requestAnimationFrame(() => {
      App.drawTimeDomain(amplitudeArray);
      delete App.animationId;
    })
  }

  private static analyseFrequencyDomain(analyser: AnalyserNode) {
    const powerArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(powerArray);
    if (!!App.animationId) {
      window.cancelAnimationFrame(App.animationId)
    }

    App.animationId = window.requestAnimationFrame(() => {
      App.drawFrequencyDomain(powerArray);
      delete App.animationId;
    })
  }

  static drawTimeDomain(amplitudeArray: Uint8Array) {
    let min: number = Number.MAX_VALUE;
    let max: number = Number.MIN_VALUE;

    for (let i = 0; i < amplitudeArray.length; i++) {
      const amp: number = amplitudeArray[i];
      if (amp > max) {
        max = amp;
      } else if (amp < min) {
        min = amp;
      }
    }

    Drawer.update(min, max);
  }

  static drawFrequencyDomain(powerArray: Uint8Array) {
    Drawer.updateFrequency(powerArray);
    // Drawer.updateLevels(powerArray);
  }
}