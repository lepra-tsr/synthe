import { ChangeEvent } from "react";

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

const ANALYSE_FFT_SIZE = 2048;
const SINE_FREQUENCY = 4400;
const OSCILLATOR_TYPE = 'sine';

window.addEventListener('load', () => {

  const context = new AudioContext();
  context.audioWorklet.addModule('audio.worker.bundle.js')
    .then(() => {
      const bypassNode = new AudioWorkletNode(context, 'bypass');

      App.init(context, bypassNode);
      const graph = document.getElementById('graph');
      if (!(graph instanceof HTMLCanvasElement)) {
        throw new Error('cannot get canvas element.')
      }
      Drawer.init(graph);
      const container = document.getElementById('container');
      ReactDOM.render(<WaveFilePicker />, container);
      const micSwitch = document.getElementById('micSwitch');
      ReactDOM.render(<MicSwitch />, micSwitch);
      const oscillatorSwitch = document.getElementById('oscillatorSwitch');
      ReactDOM.render(<OscillatorSwitch />, oscillatorSwitch);
    })
}, false);

class App {
  static cx: AudioContext;
  static sampleRate: number;
  static animationId: number;
  static bypassNode: AudioWorkletNode;
  static init(context, bypassNode: AudioWorkletNode) {
    App.cx = context;
    App.sampleRate = context.sampleRate;
    App.bypassNode = bypassNode
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

    node.connect(App.bypassNode);
    App.bypassNode.connect(analyser);
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
      const validLength = 512;
      const validPowerArray = powerArray.slice(0, validLength);

      App.drawFrequencyDomain(validPowerArray);
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
  }
}

class WaveFilePicker extends React.Component {
  render() {
    return (
      <div>
        <input type="file" onChange={this.onChangeHandler.bind(this)} />
      </div>
    )
  }

  onChangeHandler(e: ChangeEvent) {
    const target = e.currentTarget;
    if (!(target instanceof HTMLInputElement)) {
      return false
    }
    const { files }: any = e.target
    if (files.length === 0) {
      return false;
    }
    const waveFile: File = files[0];
    App.readWaveFile(waveFile);
  }
}

class MicSwitch extends React.Component<{}, { enabled: boolean }> {
  constructor(props) {
    super(props);
    this.state = {
      enabled: true
    }
  }
  render() {
    return (
      <div>
        <input disabled={!this.state.enabled} type="button" value="mic on" onClick={this.onClickHandler.bind(this)} />
      </div>
    )
  }

  onClickHandler() {
    App.connectMic().
      then(() => {
        this.setState({ enabled: false })
      }).
      catch((e) => {
        console.error(e);
      })
  }
}

class OscillatorSwitch extends React.Component<{}, { enabled: boolean }> {
  constructor(props) {
    super(props);
    this.state = {
      enabled: true
    }
  }
  render() {
    return (
      <div>
        <input disabled={!this.state.enabled} type="button" value="sine on" onClick={this.onClickHandler.bind(this)} />
      </div>
    )
  }

  onClickHandler() {
    App.connectSine();
    this.setState({ enabled: false })
  }
}

class Drawer {
  static cx: CanvasRenderingContext2D;
  static width: number;
  static height: number;
  static currentX: number;
  static init(canvas: HTMLCanvasElement) {
    const cx = canvas.getContext('2d');
    if (!(cx instanceof CanvasRenderingContext2D)) { return false }
    Drawer.cx = cx;
    if (!canvas.style.width || !canvas.style.height) {
      throw new Error('cant get canvas size');
    }
    Drawer.width = parseInt(canvas.style.width, 10);
    Drawer.height = parseInt(canvas.style.height, 10);
    Drawer.currentX = 0;
  }

  static update(low: number, high: number) {
    const { cx, width, height, currentX, flush } = Drawer;
    const drawLow = height - (height * (low / 256));
    const drawHigh = height - (height * (high / 256));

    if (width < currentX) {
      flush();
    }

    cx.fillStyle = '#cccccc';
    cx.fillRect(currentX, height / 2, 1, 1);

    cx.fillStyle = '#aaaaaa';
    cx.fillRect(currentX, drawLow, 1, drawHigh - drawLow);

    this.currentX++;
  }

  static flush() {
    const { cx, width, height } = Drawer;
    cx.clearRect(0, 0, width, height);
    Drawer.currentX = 0;
  }

  static updateFrequency(powerArray: Uint8Array) {
    const { sampleRate } = App;
    const { cx, width, height, currentX, flush } = Drawer;
    const blockSize: number = Math.floor(powerArray.length / height);

    if (width < currentX) {
      flush();
    }

    const plotty: number[] = []
    for (let i = 0; i < powerArray.length; i += blockSize) {
      const powerBlockArray = powerArray.slice(i, i + blockSize);
      const power: number = Math.floor(powerBlockArray.reduce((x, y) => x + y) / blockSize);
      const _plotY: number = (height - (height * (i / powerArray.length)))/2;
      const plotY = Math.floor(_plotY);
      plotty.push(plotY);
      if ((currentX % 100 === 0) && (i % 50 === 0)) {
        const hertz = Math.floor((i / powerArray.length) * (sampleRate / 2*2));
        cx.fillStyle = 'red';
        cx.font = '9px "consolas"'
        cx.fillText(`${hertz}Hz`, currentX - 100, plotY);
      }
      if (power !== 0) {
        cx.fillStyle = `rgb(0, ${plotY}, ${power})`;
        cx.fillRect(currentX, plotY, 1, 1);
      }
    }

    // console.log(currentX, Math.min(...plotty), powerArray.length, height, blockSize);
    this.currentX++;
  }
}