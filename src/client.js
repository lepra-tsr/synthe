'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Container from './Container.jsx';
import Instruments from './Instulments.js';

window.onload = () => {

  /* vender-prefix fallback */
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  Instruments.init();
  Instruments.connect()
    .then(() => {
      const container = document.getElementById('container');
      ReactDOM.render(<Container/>, container);
    });

  return false;

  const ctx = new AudioContext();

  const $container = document.getElementById('c');
  const $graph = document.getElementById('g');
  const WIDTH = $graph.width;
  const HEIGHT = $graph.height;
  const gcx = $graph.getContext('2d');

  const a = {
    ctx: void 0,
    src: {
      mic: void 0,
      file: void 0,
      sine: void 0,
      square: void 0,
    },
    gain: {
      mic: void 0,
      file: void 0,
      sine: void 0,
      square: void 0,
      master: void 0,
    },
    filter: {
      lpf: void 0,
      hpf: void 0,
    },
    effector: {
      distortion: void 0,
      vibrato: void 0,
      delay: void 0,
      bitCrash: void 0,
    },
    finisher: {
      comp: void 0,
    },
  };


  const audio = {
    ctx,
    o: void 0,
    g: void 0,
    m: void 0,
    a: void 0,
    mic: void 0,
  };
  Object.seal(audio);

  const graph = {
    vM: void 0,
    hM: void 0,
  };
  Object.seal(graph);

  let media = (() => {
    const p = new Promise((resolve, reject) => {
      const constraint = {
        audio: true,
        video: false,
      };
      navigator.getUserMedia(constraint, resolve, reject);
    });
    return p;
  })();
  media
    .then((stream) => {
      const { ctx } = audio;
      const mic = ctx.createMediaStreamSource(stream);
      mic.connect(ctx.destination);
      const $success = document.createElement('SPAN');
      $success.textContent = 'CONNECTED';
      $container.appendChild($success);
      /* gain */
      const g = ctx.createGain();
      g.gain.value = 0.005;

      /* mute */
      const m = ctx.createGain();
      m.gain.value = 1;

      /* analyser */
      const a = ctx.createAnalyser();

      mic.connect(g);
      g.connect(m);
      m.connect(a);
      a.connect(ctx.destination);
      // m.connect(ctx.destination);

      $start.disabled = true;

      // Object.assign(audio, { o, g, m, a })
      audio.g = g;
      audio.m = m;
      audio.a = a;
      audio.mic = mic;
    })
    .catch((e) => {
      const $error = document.createElement('SPAN');
      $error.textContent = 'MIC DEVICE NOT FOUND';
      $container.appendChild($error);
      console.error(e);
    });


  /* draw */
  const $draw = document.createElement('INPUT');
  $draw.type = 'button';
  $draw.value = 'draw';
  $container.appendChild($draw);

  /* mute */
  const $muteLabel = document.createElement('SPAN');
  $muteLabel.textContent = 'mute:';
  const $mute = document.createElement('INPUT');
  $mute.type = 'checkbox';
  $mute.checked = false;
  $container.appendChild($muteLabel);
  $container.appendChild($mute);

  /* master volume */
  const $mgDiv = document.createElement('DIV');
  const $mg = document.createElement('INPUT');
  $mg.type = 'range';
  $mg.min = 0;
  $mg.max = 1;
  $mg.step = 0.01;
  $mg.value = 0.1;
  $mg.style.width = '400px';
  $mgDiv.appendChild($mg);
  const $mgVal = document.createElement('SPAN');
  $mgVal.textContent = $mg.value;
  $mgDiv.appendChild($mgVal);
  $container.appendChild($mgDiv);


  /* frequency */
  const $fDiv = document.createElement('DIV');
  const $f = document.createElement('INPUT');
  $f.type = 'range';
  $f.min = 1;
  $f.max = 10000;
  $f.step = 10;
  $f.value = 440;
  $f.style.width = '400px';
  $fDiv.appendChild($f);
  const $fVal = document.createElement('SPAN');
  $fVal.textContent = `${$f.value}Hz`;
  $fDiv.appendChild($fVal);
  $container.appendChild($fDiv);

  /* vertical range */
  const $vRangeDiv = document.createElement('DIV');
  const $vRange = document.createElement('INPUT');
  $vRange.type = 'range';
  $vRange.min = 1;
  $vRange.max = 50;
  $vRange.step = 1;
  $vRange.value = 5;
  $vRange.style.width = '400px';
  $vRangeDiv.appendChild($vRange);
  const $vRangeVal = document.createElement('SPAN');
  $vRangeVal.textContent = `x${$vRange.value}`;
  $vRangeDiv.appendChild($vRangeVal);
  $container.appendChild($vRangeDiv);

  /* horizontal range */
  const $hRangeDiv = document.createElement('DIV');
  const $hRange = document.createElement('INPUT');
  $hRange.type = 'range';
  $hRange.min = 1;
  $hRange.max = 10;
  $hRange.step = 1;
  $hRange.value = 2;
  $hRange.style.width = '400px';
  $hRangeDiv.appendChild($hRange);
  const $hRangeVal = document.createElement('SPAN');
  $hRangeVal.textContent = `x${$hRange.value}`;
  $hRangeDiv.appendChild($hRangeVal);
  $container.appendChild($hRangeDiv);

  const draw = () => {
    const { a } = audio;
    const { vM = 2.0, hM = 1.0 } = graph;

    a.fftSize = 2048;
    const bLength = a.frequencyBinCount;
    const dArray = new Uint8Array(bLength);
    a.getByteTimeDomainData(dArray);
    requestAnimationFrame(draw);

    /* flush */
    gcx.clearRect(0, 0, WIDTH, HEIGHT);

    let x = 0;
    const sliceWidth = WIDTH * 1.0 / bLength;

    /* axis */
    gcx.lineWidth = 1;
    gcx.strokeStyle = 'rgba(180,180,255,0.5)';
    gcx.beginPath();
    gcx.moveTo(0, HEIGHT / 2);
    gcx.lineTo(WIDTH, HEIGHT / 2);
    gcx.strokeStyle = 'rgba(216,216,255,0.5)';
    for (let i_b = 0; i_b < bLength; i_b++) {
      if (i_b % 50 !== 0) {
        continue;
      }

      x = i_b * sliceWidth;
      gcx.moveTo(x, 0);
      gcx.lineTo(x, HEIGHT);
    }
    gcx.stroke();

    gcx.lineWidth = 1;
    gcx.strokeStyle = 'rgb(64,64,180)';
    x = 0;
    gcx.beginPath();
    for (let i_b = 0; i_b < bLength; i_b++) {
      const buffer = dArray[i_b];
      const offsetY = HEIGHT / 2;
      const v = (buffer / 128.0) - 1.0; // -1<=v <1
      const y = offsetY + v * offsetY * vM;
      if (i_b === 0) {
        gcx.moveTo(x, y);
      } else {
        gcx.lineTo(x, y);
      }
      x += sliceWidth;
    }

    gcx.lineTo(WIDTH, HEIGHT / 2);
    gcx.stroke();
  };

  /* make graph */
  $draw.addEventListener('click', (e) => {
    draw();
  });

  /* change gain */
  $mg.addEventListener('change', (e) => {
    if (!audio) return false;

    const v = parseFloat(e.target.value, 10);
    const gain = v || 0.01;
    const { ctx, g } = audio;
    g.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + 0.5);
    $mgVal.textContent = gain;
  });

  /* change frequency */
  $f.addEventListener('change', (e) => {
    if (!audio) return false;

    const v = parseInt(e.target.value, 10);
    const frequency = v;
    const { ctx, o } = audio;
    o.frequency.exponentialRampToValueAtTime(frequency, ctx.currentTime + 0.5);
    $fVal.textContent = `${frequency}Hz`;
  });

  /* change vertical magnify */
  $vRange.addEventListener('change', (e) => {
    if (!audio) return false;

    const vM = parseInt(e.target.value, 10);
    graph.vM = vM;
    $vRangeVal.textContent = `x${vM}`;
  });

  /* change horizontal magnify */
  $hRange.addEventListener('change', (e) => {
    if (!audio) return false;

    const hM = parseInt(e.target.value, 10);
    graph.hM = hM;
    $hRangeVal.textContent = `x${hM}`;
  });

  /* toggle mute */
  $mute.addEventListener('change', (e) => {
    const toBeMuted = e.target.checked;
    const { ctx, m } = audio;
    const gain = toBeMuted ? 0.001 : 1;
    m.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + 0.5);
  });

}