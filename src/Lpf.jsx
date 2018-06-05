import React from 'react';
import ReactDOM from 'react-dom';
import Instruments from './Instulments';

class Lpf extends React.Component {
  constructor(props) {
    super(props);
    this.config =
  }

  render() {
    return (
      <div>
        <label>
          <input type="checkbox"
                 onChange={() => {
                 }}
                 checked={this.props.checked}
          />
          <span>LPF(high shelf biquad filter)</span>
        </label>
        <label>
          <span>frequency</span>
          <input type="range"
                 onChange={() => {
                 }}
                 min={this.props.freq.min}
                 max={this.props.freq.max}
                 step={this.props.freq.step}
                 value={this.props.freq.value}
          />
        </label>
        <label>
          <span>gain</span>
          <input type="range"
                 onChange={(e) => {
                   const v = parseFloat(e.target.value);
                   const gainMic = Instruments.getGainMic();
                   const ctx = Instruments.getCtx();
                   gainMic.gain.exponentialRampToValueAtTime(v, ctx.currentTime + 0.2);
                 }}
                 min={this.props.config.min}
                 max={this.props.config.max}
                 step={this.props.config.step}
                 value={this.props.config.value}
          />
        </label>
      </div>
    );
  }
}

module.exports = Lpf;
