import React from 'react';
import Instruments from './Instulments.js';
import {
  Checkbox,
  Slider,
} from '@blueprintjs/core';

class MasterGain extends React.Component {
  constructor(props) {
    super(props);
    this.audio = {
      ctx: Instruments.getCtx(),
      gain: Instruments.getGainMaster(),
    };
    this.config = { min: 0.01, max: 1, stepSize: 0.01, };
    this.state = {
      gain: this.audio.gain.gain.value
    };
  }

  render() {
    return (
      <div name='master'>
        <Checkbox checked={this.props.active} label="マスタ" onChange={() => {
        }}/>
        <Slider min={this.config.min}
                max={this.config.max}
                stepSize={this.config.stepSize}
                value={this.state.gain}
                style={{ width: '100%' }}
                onChange={(e) => {
                  const v = parseFloat(e);
                  const { ctx, gain } = this.audio;
                  gain.gain.exponentialRampToValueAtTime(v, ctx.currentTime + 0.2);
                  this.setState({ gain: v });
                }}
        />
      </div>
    );
  }
}

module.exports = MasterGain;
