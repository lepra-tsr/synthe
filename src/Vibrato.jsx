import React from 'react';
import {
  Checkbox,
  Slider,
} from '@blueprintjs/core';
import Instruments from './Instulments';

class Vibrato extends React.Component {
  constructor(props) {
    super(props);
    this.audio = {
      ctx: Instruments.getCtx(),
      vibrato: Instruments.getVibrato(),
    };
    this.state = {
      gain: this.audio.lpf.gain.value,
      freq: this.audio.lpf.frequency.value,
    };
  }

  render() {
    return (
      <div name='vibrato'>
        <Checkbox checked={this.props.active} label={'Vibrato'}/>
        <p className='pt-text-muted'>frequency[Hz]</p>
        <Slider
          onChange={(e) => {
            const v = parseInt(e, 10);
            const { ctx, vibrato } = this.audio;
            vibrato.frequency.exponentialRampToValueAtTime(v, ctx.currentTime + 0.2);
            this.setState({ freq: v });
          }}
          min={1}
          max={20}
          stepSize={1}
          labelStepSize={4}
          value={this.state.freq}
        />
        <p className='pt-text-muted'>amplitude</p>
        <Slider
          onChange={(e) => {
            const v = parseInt(e, 10);
            const { ctx, vibrato } = this.audio;
            vibrato.gain.exponentialRampToValueAtTime(v, ctx.currentTime + 0.2);
            this.setState({ gain: v });
          }}
          min={0.1}
          max={1}
          stepSize={0.1}
          labelStepSize={0.4}
          value={this.state.gain}
        />
      </div>
    );
  }
}

module.exports = Vibrato;
