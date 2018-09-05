import React from 'react';
import Filter from './Filter';
import Lpf from './Lpf';

export default class Filters extends React.Component {
  render() {
    return (
      <div>
        <h5>フィルタ</h5>
        <Lpf type={'lpf'} checked={false}/>
        <Filter type={"hpf"} checked={false}/>
      </div>
    );
  }
}
