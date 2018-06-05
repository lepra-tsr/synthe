import React from 'react';
import ReactDOM from 'react-dom';
import Filter from './Filter.jsx';
import Lpf from './Lpf.jsx';

class Filters extends React.Component {
  render() {
    return (
      <div name="filters">
        <h5>フィルタ</h5>
        <Lpf type={'lpf'} checked={false}/>
        <Filter type={"hpf"} checked={false}/>
      </div>
    );
  }
}

module.exports = Filters;
