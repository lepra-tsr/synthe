import React from 'react';
import {
  Checkbox,
  Slider,
} from '@blueprintjs/core';
import Instruments from './Instulments';

class Delay extends React.Component {
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
      <div name='delay'>
        <Checkbox checked={this.props.active} label={'Delay'}/>
        <p className='pt-text-muted'>delay[sec]</p>
        <Slider
          onChange={(e) => {
            const v = parseFloat(e);
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

module.exports = Delay;
