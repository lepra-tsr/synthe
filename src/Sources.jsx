import React from 'react';
import ReactDOM from 'react-dom';
import MasterGain from './MasterGain.jsx';
import SourceMic from './SourceMic.jsx';
import Source from './Source.jsx';

class Sources extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div name="source">
        <h5>サウンドソース</h5>
        <MasterGain />
        <SourceMic active={true}/>
        <Source name={'wave'}
                src={true}
                active={false}
                config={{ min: 0, max: 1, step: 0.01, value: 0.1 }}
        />
        <Source name={'sine'}
                src={true}
                active={false}
                freq={{ min: 220, max: 880, step: 10, value: 440 }}
                config={{ min: 0, max: 1, step: 0.01, value: 0.1 }}
        />
        <Source name={'square'}
                src={true}
                active={false}
                freq={{ min: 220, max: 880, step: 10, value: 440 }}
                config={{ min: 0, max: 1, step: 0.01, value: 0.1 }}
        />
      </div>
    );
  }
}

module.exports = Sources;
