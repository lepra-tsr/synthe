import React from 'react';
import ReactDOM from 'react-dom';
import Source from './Source.jsx';

class Sources extends React.Component {
  render() {
    return (
      <div name="sources">
        <h5>source</h5>
        <Source name={'mic'}
                active={true}
                gain={{ min: 0, max: 1, step: 0.01, value: 0.1 }}
        />
        <Source name={'wave'}
                active={false}
                gain={{ min: 0, max: 1, step: 0.01, value: 0.1 }}
        />
        <Source name={'sine'}
                active={false}
                freq={{ min: 220, max: 880, step: 10, value: 440 }}
                gain={{ min: 0, max: 1, step: 0.01, value: 0.1 }}
        />
        <Source name={'square'}
                active={false}
                freq={{ min: 220, max: 880, step: 10, value: 440 }}
                gain={{ min: 0, max: 1, step: 0.01, value: 0.1 }}
        />
      </div>
    );
  }
}

module.exports = Sources;
