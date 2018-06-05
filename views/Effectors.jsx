import React from 'react';
import ReactDOM from 'react-dom';

class Effectors extends React.Component {
  render() {
    return (
      <div name="effectors">
        <h5>effectors</h5>
        <div name="distortion">
          <label>
            <input type="checkbox"/>
            <span>distortion</span>
          </label>
        </div>
        <div name="vibrato">
          <label>
            <input type="checkbox"/>
            <span>vibrato</span>
          </label>
        </div>
        <div name="delay">
          <label>
            <input type="checkbox"/>
            <span>delay</span>
          </label>
        </div>
        <div name="bitCrash">
          <label>
            <input type="checkbox"/>
            <span>bitCrash</span>
          </label>
        </div>
      </div>
    );
  }
}

module.exports = Effectors;
