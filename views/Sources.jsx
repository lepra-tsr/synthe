import React from 'react';
import ReactDOM from 'react-dom';

class Sources extends React.Component {
  render() {
    return (
      <div name="sources">
        <h5>source</h5>
        <div name="mic">
          <label>
            <input type="checkbox"/>
            <span>mic: ready</span>
          </label>
          <label>
            <span>gain</span>
            <input type="range" min="0" max="1" step="0.01" value="0.1"/>
          </label>
        </div>
        <div name="wave">
          <label>
            <input type="checkbox"/>
            <span>wave: ready</span>
          </label>
          <label>
            <span>gain</span>
            <input type="range" min="0" max="1" step="0.01" value="0.1"/>
          </label>
        </div>
        <div name="sine">
          <label>
            <input type="checkbox"/>
            <span>sine: ready</span>
          </label>
          <label>
            <span>frequency</span>
            <input type="range" min="220" max="880" step="10" value="440"/>
          </label>
          <label>
            <span>gain</span>
            <input type="range" min="0" max="1" step="0.01" value="0.1"/>
          </label>
        </div>
        <div name="square">
          <label>
            <input type="checkbox"/>
            <span>square: ready</span>
          </label>
          <label>
            <span>frequency</span>
            <input type="range" min="220" max="880" step="10" value="440"/>
          </label>
          <label>
            <span>gain</span>
            <input type="range" min="0" max="1" step="0.01" value="0.1"/>
          </label>
        </div>
      </div>
    );
  }
}

module.exports = Sources;
