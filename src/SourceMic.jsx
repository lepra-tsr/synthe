import React from 'react';
import Instruments from './Instulments.js';

class SourceMic extends React.Component {
  constructor(props) {
    super(props);
    this.audio = {
      ctx: Instruments.getCtx(),
      src: Instruments.getSrcMic(),
      gain: Instruments.getGainMic(),
    };
    this.config = { min: 0.1, max: 1, step: 0.1 };
  }

  render() {
    return (
      <div name='mic'>
        <label>
          <input
            type="checkbox"
            onChange={() => {
            }}
            checked={this.props.active}
          />
          <span>mic: {this.audio.src ? 'ready!' : 'not found!'}</span>
        </label>
        <label>
          <span>gain</span>
          <input type="range"
                 onChange={(e) => {
                   const v = parseFloat(e.target.value);
                   const { ctx, gain } = this.audio;
                   gain.gain.exponentialRampToValueAtTime(v, ctx.currentTime + 0.2);
                 }}
                 min={this.config.min}
                 max={this.config.max}
                 step={this.config.step}
                 value={this.audio.gain.value}
          />
        </label>
      </div>
    );
  }
}

module.exports = SourceMic;
