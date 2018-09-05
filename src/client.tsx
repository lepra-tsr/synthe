'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Container from './Container';
import Instruments from './Instulments';

window.onload = () => {

  /* vender-prefix fallback */
  // window.AudioContext = window.AudioContext || window.webkitAudioContext;
  // navigator.getUserMedia =
  //   navigator.getUserMedia ||
  //   navigator.webkitGetUserMedia ||
  //   navigator.mozGetUserMedia;

  Instruments.init();
  Instruments.connect()
    .then(() => {
      const container = document.getElementById('container');
      ReactDOM.render(<Container />, container);
    });
}