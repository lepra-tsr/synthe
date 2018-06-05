import React from 'react';
import ReactDOM from 'react-dom';

class Filters extends React.Component {
  render() {
    return (
      <div name="filters">
        <h5>filters</h5>
        <label>
          <input type="radio" name="filter" value="none"/>
          <span>none</span>
        </label>
        <label>
          <input type="radio" name="filter" value="lpf"/>
          <span>lpf</span>
        </label>
        <label>
          <input type="radio" name="filter" value="hpf"/>
          <span>hpf</span>
        </label>
      </div>
    );
  }
}

module.exports = Filters;
