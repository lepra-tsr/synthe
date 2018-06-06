import React from 'react';
import Instruments from './Instulments';
import {
  Checkbox,
  Slider,
} from '@blueprintjs/core';

class Lpf extends React.Component {
  constructor(props) {
    super(props);
    this.audio = {
      ctx: Instruments.getCtx(),
      lpf: Instruments.getLpf(),
    };
    this.state = {
      gain: this.audio.lpf.gain.value,
      freq: this.audio.lpf.frequency.value,
    };

  }

  render() {
    return (
      <div>
        <Checkbox checked={this.props.active} label={'High shelf reducer'}/>
        <p className='pt-text-muted'>threshold[Hz]</p>
        <Slider
          onChange={(e) => {
            const v = parseInt(e, 10);
            const { ctx, lpf } = this.audio;
            lpf.frequency.exponentialRampToValueAtTime(v, ctx.currentTime + 0.2);
            this.setState({ freq: v });
          }}
          min={100}
          max={2000}
          stepSize={10}
          labelStepSize={400}
          value={this.state.freq}
        />
        <p className='pt-text-muted'>attenuation[db]</p>
        <Slider
          onChange={(e) => {
            const v = parseInt(e, 10);
            const { ctx, lpf } = this.audio;
            lpf.gain.exponentialRampToValueAtTime(v, ctx.currentTime + 0.2);
            this.setState({ gain: v });
          }}
          min={-25}
          max={-1}
          stepSize={1}
          labelStepSize={4}
          value={this.state.gain}
        />
      </div>
    );
  }
}

module.exports = Lpf;
