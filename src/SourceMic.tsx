import React from 'react';
import Instruments from './Instulments';
import {
  Checkbox,
  Slider,
} from '@blueprintjs/core';

interface ISourceMicProps {
  active: boolean;
}

interface ISourceMicState {
  gain: number;
}

export default class SourceMic extends React.Component<ISourceMicProps, ISourceMicState> {
  audio: {
    ctx: AudioContext;
    src: any;
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
      src: Instruments.getSrcMic(),
      gain: Instruments.getGainMic(),
    };
    this.config = { min: 0.01, max: 1, stepSize: 0.01, };
    this.state = {
      gain: this.audio.gain.gain.value,
    };
  }

  render() {
    return (
      <div>
        <Checkbox checked={this.props.active} label={'マイク' + (this.audio.src ? '...READY' : '...NOT FOUND')} onChange={() => {
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
