import React from 'react';
import ReactDOM from 'react-dom';
import Filter from './Filter.jsx';

class Filters extends React.Component {
  render() {
    return (
      <div name="filters">
        <h5>filters</h5>
        <Filter type={"none"} checked={true}/>
        <Filter type={"lpf"} checked={false}/>
        <Filter type={"hpf"} checked={false}/>
      </div>
    );
  }
}

module.exports = Filters;
