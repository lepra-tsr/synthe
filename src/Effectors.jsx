import React from 'react';
import Delay from './Delay.jsx';
import Effector from './Effector.jsx';
import Graph from './Graph.jsx';

class Effectors extends React.Component {
  render() {
    return (
      <div name="effectors">
        <h5>エフェクタ</h5>
        {/*<Effector type={'distortion'} checked={true}/>*/}
        <Delay checked={true}/>
        {/*<Effector type={'bitCrash'} checked={false}/>*/}
      </div>
    );
  }
}

module.exports = Effectors;
