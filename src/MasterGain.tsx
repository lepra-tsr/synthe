import React from 'react';
import Instruments from './Instulments';
import {
  Checkbox,
  Slider,
} from '@blueprintjs/core';

interface IMasterGainProps {
  active?: boolean;
}

interface IMasterGainState {
  gain: number;
}

export default class MasterGain extends React.Component<IMasterGainProps, IMasterGainState> {
  audio: {
    ctx: AudioContext;
    gain: GainNode;
  }
  config: {
    min: number;
    max: number;
    stepSize: number;
  }
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
      <div>
        <Checkbox checked={this.props.active} label="マスタ" onChange={() => {
        }} />
        <Slider min={this.config.min}
          max={this.config.max}
          stepSize={this.config.stepSize}
          value={this.state.gain}
          onChange={(v: number) => {
            const { ctx, gain } = this.audio;
            gain.gain.exponentialRampToValueAtTime(v, ctx.currentTime + 0.2);
            this.setState({ gain: v });
          }}
        />
      </div>
    );
  }
}
