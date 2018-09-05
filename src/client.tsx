import { ChangeEvent } from "react";

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
// import Container from './Container';
// import Instruments from './Instulments';

window.onload = () => {
  App.init();
  const container = document.getElementById('container');
  ReactDOM.render(<WaveFilePicker />, container);
}

class App {
  static cx: AudioContext;
  static init() {
    App.cx = new AudioContext();
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

      const analyser = App.cx.createAnalyser();
      const scriptProcessor = App.cx.createScriptProcessor(analyser.fftSize, 1, 1);
      fileSource.connect(analyser);

      analyser.connect(scriptProcessor);
      scriptProcessor.connect(App.cx.destination);

      scriptProcessor.onaudioprocess = App.onAudioProcessHandler.bind(this, analyser);

      fileSource.start(0);
    })
  }

  static onAudioProcessHandler(analyser: AnalyserNode) {
    const amplitudeArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(amplitudeArray);

    console.log(amplitudeArray);
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