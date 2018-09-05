import React from 'react';
import {
  Checkbox,
  Slider,
} from '@blueprintjs/core';
import Instruments from './Instulments';

interface IDelayProps {
  active?: boolean;
  checked: boolean;
}

interface IDelayState {
  delayTime: number;
}

export default class Delay extends React.Component<IDelayProps, IDelayState> {
  audio: {
    ctx: AudioContext;
    delay: DelayNode;
  }

  constructor(props) {
    super(props);
    this.audio = {
      ctx: Instruments.getCtx(),
      delay: Instruments.getDelay(),
    };
    this.state = {
      delayTime: this.audio.delay.delayTime.value,
    };
  }

  render() {
    return (
      <div>
        <Checkbox checked={this.props.active} label={'Delay'} />
        <p className='pt-text-muted'>delay[sec]</p>
        <Slider onChange={(v: number) => {
          const { ctx, delay } = this.audio;
          /* zero is invalid delayTime */
          if (v !== 0) {
            delay.delayTime.exponentialRampToValueAtTime(v, ctx.currentTime + 0.2);
          }
          this.setState({ delayTime: v });
        }}
          min={0}
          max={1}
          stepSize={0.01}
          labelStepSize={0.2}
          value={this.state.delayTime}
        />
      </div>
    );
  }
}
