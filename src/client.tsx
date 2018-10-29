// import React from 'react';
// import ReactDOM from 'react-dom';

window.addEventListener('load', () => {

  //   const context = new AudioContext();
  //   context.audioWorklet.addModule('audio.worker.bundle.js')
  //     .then(() => {
  //       const bypassNode = new AudioWorkletNode(context, 'bypass');

  //       App.init(context, bypassNode);
  //       const graph = document.getElementById('graph');
  //       if (!(graph instanceof HTMLCanvasElement)) {
  //         throw new Error('cannot get canvas element.')
  //       }
  //       Drawer.init(graph);
  //       const container = document.getElementById('container');
  //       ReactDOM.render(<WaveFilePicker />, container);
  //       const micSwitch = document.getElementById('micSwitch');
  //       ReactDOM.render(<MicSwitch />, micSwitch);
  //       const oscillatorSwitch = document.getElementById('oscillatorSwitch');
  //       ReactDOM.render(<OscillatorSwitch />, oscillatorSwitch);
  //     })

  const context = new AudioContext();
  const oscillatorNode = context.createOscillator();
  oscillatorNode.frequency.setValueAtTime(440, context.currentTime);
  oscillatorNode.type = 'sine';
  
  const gainNode = context.createGain();
  gainNode.gain.setValueAtTime(0.1, context.currentTime);
  
  const oscillatorNode_2 = context.createOscillator();
  oscillatorNode_2.frequency.setValueAtTime(880, context.currentTime);
  oscillatorNode_2.type = 'sine';
  const gainNode_2 = context.createGain();
  gainNode_2.gain.setValueAtTime(0.1, context.currentTime);

  const destination = context.destination;

  oscillatorNode.connect(gainNode);
  gainNode.connect(destination);
  oscillatorNode_2.connect(gainNode_2);
  gainNode_2.connect(destination);



  const container = document.body;
  const input = document.createElement('INPUT');
  input.setAttribute('type', 'button');
  input.setAttribute('value', 'start');

  container.appendChild(input);

  input.addEventListener('click', () => {
    oscillatorNode.start()
    oscillatorNode_2.start()
  }, false)

}, false);

