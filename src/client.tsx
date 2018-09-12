import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Drawer from './Drawer';
import WaveFilePicker from './WaveFilePicker';
import MicSwitch from './MicSwitch';
import OscillatorSwitch from './OscillatorSwitch';

window.addEventListener('load', () => {

  const context = new AudioContext();
  App.init(context);
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
}, false);

