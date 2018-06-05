/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/client.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client.js":
/*!***********************!*\
  !*** ./src/client.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nwindow.onload = function () {\n  return false;\n\n  /* vender-prefix fallback */\n  window.AudioContext = window.AudioContext || window.webkitAudioContext;\n  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;\n\n  var ctx = new AudioContext();\n\n  var $container = document.getElementById('container');\n  var $graph = document.getElementById('graph');\n  var WIDTH = $graph.width;\n  var HEIGHT = $graph.height;\n  var gcx = $graph.getContext('2d');\n\n  var a = {\n    src: {\n      micSrc: void 0,\n      fileSrc: void 0,\n      sineSrc: void 0,\n      squareSrc: void 0\n    },\n    gain: {\n      micGain: void 0,\n      fileGain: void 0,\n      sineGain: void 0,\n      squareGain: void 0,\n      mGain: void 0\n    },\n    filter: {\n      lpf: void 0,\n      hpf: void 0\n    },\n    effector: {\n      distortion: void 0,\n      vibrato: void 0,\n      delay: void 0,\n      bitCrash: void 0\n    },\n    finisher: {\n      comp: void 0\n    }\n  };\n\n  var audio = {\n    ctx: ctx,\n    o: void 0,\n    g: void 0,\n    m: void 0,\n    a: void 0,\n    mic: void 0\n  };\n  Object.seal(audio);\n\n  var graph = {\n    vM: void 0,\n    hM: void 0\n  };\n  Object.seal(graph);\n\n  var media = function () {\n    var p = new Promise(function (resolve, reject) {\n      var constraint = {\n        audio: true,\n        video: false\n      };\n      navigator.getUserMedia(constraint, resolve, reject);\n    });\n    return p;\n  }();\n  media.then(function (stream) {\n    var ctx = audio.ctx;\n\n    var mic = ctx.createMediaStreamSource(stream);\n    mic.connect(ctx.destination);\n    var $success = document.createElement('SPAN');\n    $success.textContent = 'CONNECTED';\n    $container.appendChild($success);\n    /* gain */\n    var g = ctx.createGain();\n    g.gain.value = 0.005;\n\n    /* mute */\n    var m = ctx.createGain();\n    m.gain.value = 1;\n\n    /* analyser */\n    var a = ctx.createAnalyser();\n\n    mic.connect(g);\n    g.connect(m);\n    m.connect(a);\n    a.connect(ctx.destination);\n    // m.connect(ctx.destination);\n\n    $start.disabled = true;\n\n    // Object.assign(audio, { o, g, m, a })\n    audio.g = g;\n    audio.m = m;\n    audio.a = a;\n    audio.mic = mic;\n  }).catch(function (e) {\n    var $error = document.createElement('SPAN');\n    $error.textContent = 'MIC DEVICE NOT FOUND';\n    $container.appendChild($error);\n    console.error(e);\n  });\n\n  /* draw */\n  var $draw = document.createElement('INPUT');\n  $draw.type = 'button';\n  $draw.value = 'draw';\n  $container.appendChild($draw);\n\n  /* mute */\n  var $muteLabel = document.createElement('SPAN');\n  $muteLabel.textContent = 'mute:';\n  var $mute = document.createElement('INPUT');\n  $mute.type = 'checkbox';\n  $mute.checked = false;\n  $container.appendChild($muteLabel);\n  $container.appendChild($mute);\n\n  /* master volume */\n  var $mgDiv = document.createElement('DIV');\n  var $mg = document.createElement('INPUT');\n  $mg.type = 'range';\n  $mg.min = 0;\n  $mg.max = 1;\n  $mg.step = 0.01;\n  $mg.value = 0.1;\n  $mg.style.width = '400px';\n  $mgDiv.appendChild($mg);\n  var $mgVal = document.createElement('SPAN');\n  $mgVal.textContent = $mg.value;\n  $mgDiv.appendChild($mgVal);\n  $container.appendChild($mgDiv);\n\n  /* frequency */\n  var $fDiv = document.createElement('DIV');\n  var $f = document.createElement('INPUT');\n  $f.type = 'range';\n  $f.min = 1;\n  $f.max = 10000;\n  $f.step = 10;\n  $f.value = 440;\n  $f.style.width = '400px';\n  $fDiv.appendChild($f);\n  var $fVal = document.createElement('SPAN');\n  $fVal.textContent = $f.value + 'Hz';\n  $fDiv.appendChild($fVal);\n  $container.appendChild($fDiv);\n\n  /* vertical range */\n  var $vRangeDiv = document.createElement('DIV');\n  var $vRange = document.createElement('INPUT');\n  $vRange.type = 'range';\n  $vRange.min = 1;\n  $vRange.max = 50;\n  $vRange.step = 1;\n  $vRange.value = 5;\n  $vRange.style.width = '400px';\n  $vRangeDiv.appendChild($vRange);\n  var $vRangeVal = document.createElement('SPAN');\n  $vRangeVal.textContent = 'x' + $vRange.value;\n  $vRangeDiv.appendChild($vRangeVal);\n  $container.appendChild($vRangeDiv);\n\n  /* horizontal range */\n  var $hRangeDiv = document.createElement('DIV');\n  var $hRange = document.createElement('INPUT');\n  $hRange.type = 'range';\n  $hRange.min = 1;\n  $hRange.max = 10;\n  $hRange.step = 1;\n  $hRange.value = 2;\n  $hRange.style.width = '400px';\n  $hRangeDiv.appendChild($hRange);\n  var $hRangeVal = document.createElement('SPAN');\n  $hRangeVal.textContent = 'x' + $hRange.value;\n  $hRangeDiv.appendChild($hRangeVal);\n  $container.appendChild($hRangeDiv);\n\n  var draw = function draw() {\n    var a = audio.a;\n    var _graph$vM = graph.vM,\n        vM = _graph$vM === undefined ? 2.0 : _graph$vM,\n        _graph$hM = graph.hM,\n        hM = _graph$hM === undefined ? 1.0 : _graph$hM;\n\n\n    a.fftSize = 2048;\n    var bLength = a.frequencyBinCount;\n    var dArray = new Uint8Array(bLength);\n    a.getByteTimeDomainData(dArray);\n    requestAnimationFrame(draw);\n\n    /* flush */\n    gcx.clearRect(0, 0, WIDTH, HEIGHT);\n\n    var x = 0;\n    var sliceWidth = WIDTH * 1.0 / bLength;\n\n    /* axis */\n    gcx.lineWidth = 1;\n    gcx.strokeStyle = 'rgba(180,180,255,0.5)';\n    gcx.beginPath();\n    gcx.moveTo(0, HEIGHT / 2);\n    gcx.lineTo(WIDTH, HEIGHT / 2);\n    gcx.strokeStyle = 'rgba(216,216,255,0.5)';\n    for (var i_b = 0; i_b < bLength; i_b++) {\n      if (i_b % 50 !== 0) {\n        continue;\n      }\n\n      x = i_b * sliceWidth;\n      gcx.moveTo(x, 0);\n      gcx.lineTo(x, HEIGHT);\n    }\n    gcx.stroke();\n\n    gcx.lineWidth = 1;\n    gcx.strokeStyle = 'rgb(64,64,180)';\n    x = 0;\n    gcx.beginPath();\n    for (var _i_b = 0; _i_b < bLength; _i_b++) {\n      var buffer = dArray[_i_b];\n      var offsetY = HEIGHT / 2;\n      var v = buffer / 128.0 - 1.0; // -1<=v <1\n      var y = offsetY + v * offsetY * vM;\n      if (_i_b === 0) {\n        gcx.moveTo(x, y);\n      } else {\n        gcx.lineTo(x, y);\n      }\n      x += sliceWidth;\n    }\n\n    gcx.lineTo(WIDTH, HEIGHT / 2);\n    gcx.stroke();\n  };\n\n  /* make graph */\n  $draw.addEventListener('click', function (e) {\n    draw();\n  });\n\n  /* change gain */\n  $mg.addEventListener('change', function (e) {\n    if (!audio) return false;\n\n    var v = parseFloat(e.target.value, 10);\n    var gain = v || 0.01;\n    var ctx = audio.ctx,\n        g = audio.g;\n\n    g.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + 0.5);\n    $mgVal.textContent = gain;\n  });\n\n  /* change frequency */\n  $f.addEventListener('change', function (e) {\n    if (!audio) return false;\n\n    var v = parseInt(e.target.value, 10);\n    var frequency = v;\n    var ctx = audio.ctx,\n        o = audio.o;\n\n    o.frequency.exponentialRampToValueAtTime(frequency, ctx.currentTime + 0.5);\n    $fVal.textContent = frequency + 'Hz';\n  });\n\n  /* change vertical magnify */\n  $vRange.addEventListener('change', function (e) {\n    if (!audio) return false;\n\n    var vM = parseInt(e.target.value, 10);\n    graph.vM = vM;\n    $vRangeVal.textContent = 'x' + vM;\n  });\n\n  /* change horizontal magnify */\n  $hRange.addEventListener('change', function (e) {\n    if (!audio) return false;\n\n    var hM = parseInt(e.target.value, 10);\n    graph.hM = hM;\n    $hRangeVal.textContent = 'x' + hM;\n  });\n\n  /* toggle mute */\n  $mute.addEventListener('change', function (e) {\n    var toBeMuted = e.target.checked;\n    var ctx = audio.ctx,\n        m = audio.m;\n\n    var gain = toBeMuted ? 0.001 : 1;\n    m.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + 0.5);\n  });\n};\n\n//# sourceURL=webpack:///./src/client.js?");

/***/ })

/******/ });