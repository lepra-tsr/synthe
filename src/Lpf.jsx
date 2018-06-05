import React from 'react';
import ReactDOM from 'react-dom';
import Instruments from './Instulments';

class Lpf extends React.Component {
  constructor(props) {
    super(props);
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
          <span>LPF(high shelf reducer)</span>
        </label>
        <label>
          <span>frequency</span>
          <input type="range"
                 onChange={() => {
                 }}
                 min="10"
                 max="2000"
                 step="50"
                 value="1500"
          />
        </label>
        <label>
          <span>gain</span>
          <input type="range"
                 onChange={(e) => {
                   const v = parseFloat(e.target.value);
                   const lpf = Instruments.getLpf();
                   const ctx = Instruments.getCtx();
                   lpf.gain.exponentialRampToValueAtTime(v, ctx.currentTime + 0.2);
                 }}
                 min="-25"
                 max="0"
                 step="1"
                 value="-20"
          />
        </label>
      </div>
    );
  }
}

module.exports = Lpf;
