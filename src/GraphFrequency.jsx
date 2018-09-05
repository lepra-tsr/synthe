import React from 'react';
import {
  Card,
  Elevation,
} from '@blueprintjs/core';
import './handler.css';
import Instruments from './Instulments.js';

class GraphFrequency extends React.Component {
  constructor(props) {
    super(props);

    this.audio = {
      analyser: Instruments.getAnalyserMaster(),
    };
    this.style = {
      card: {
        backgroundColor: 'black',
        width: `${this.props.width}px`,
        height: `${this.props.height}px`,
      }
    };
    this.graph = {
      el: void 0,
      gtx: void 0,
      width: parseInt(this.props.width),
      height: parseInt(this.props.height),
      updated: Date.now()
    };
    this.state = { foo: 0 };
  }

  render() {
    return (
      <div>
        <canvas id={this.props.id} style={this.style.card}/>
        {/*<p>{this.state.foo}</p>*/}
      </div>
    );
  }

  componentDidMount() {
    this.graph.el = document.getElementById(this.props.id);
    this.graph.gtx = this.graph.el.getContext('2d');

    requestAnimationFrame(this.draw.bind(this));
  }

  draw() {
    const lastUpdate = this.graph.updated;
    const now = Date.now();
    const deltaMilliSeconds = now - lastUpdate;
    if (500 > deltaMilliSeconds) {
      /* 一定fpsで更新する */
      requestAnimationFrame(this.draw.bind(this));
      return false;
    }
    this.graph.updated = Date.now();

    let { foo } = this.state;
    foo++;
    this.setState({ foo });
    const { gtx, width, height } = this.graph;
    const { analyser } = this.audio;
    const bLength = analyser.frequencyBinCount;

    const dArray = new Uint8Array(bLength);
    analyser.getByteFrequencyData(dArray);

    gtx.clearRect(0, 0, width, height);

    /* draw axis */
    let t_axis = 0;
    const mag = 10;
    let deltaT = mag * width * 1.0 / bLength;
    deltaT = Math.log2(deltaT);

    gtx.lineWidth = 1;
    gtx.strokeStyle = 'rgba(180,180,255,0.5)';
    gtx.beginPath();
    gtx.moveTo(0, height / 2);
    gtx.lineTo(width, height / 2);
    gtx.strokeStyle = 'rgba(216,216,255,0.5)';
    for (let i_b = 0; i_b < bLength; i_b++) {
      if (i_b % 10 !== 0) {
        continue;
      }

      t_axis = i_b * deltaT;
      gtx.moveTo(t_axis, 0);
      gtx.lineTo(t_axis, height);

      /* text */
      gtx.font = '12px serif';
      gtx.fillStyle = "white";
      gtx.fillText(`${t_axis}`, t_axis, t_axis/2);

    }
    gtx.stroke();


    /* draw graph */
    let t_graph = 0;
    gtx.lineWidth = 1;
    gtx.strokeStyle = 'rgb(164,164,180)';

    gtx.beginPath();
    for (let i_b = 0; i_b < bLength; i_b++) {
      const buffer = dArray[i_b];
      const halfHeight = height / 2;
      const offsetY = height / 2;
      // const offsetY = 0;
      const v = (buffer / 128.0) * -1 * 0.5; // -30 ~ -60 dBで出てくる
      // const y = v;
      const y = offsetY + v * halfHeight;
      this.setState({ foo: v });
      if (i_b === 0) {
        gtx.moveTo(t_graph, y);
      } else {
        gtx.lineTo(t_graph, y);
      }
      t_graph += deltaT;
    }

    gtx.lineTo(width, height / 2);
    gtx.stroke();

    requestAnimationFrame(this.draw.bind(this));

  }
}

module.exports = GraphFrequency;