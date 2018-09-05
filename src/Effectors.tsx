import React from 'react';
import Delay from './Delay';

export default class Effectors extends React.Component {
  render() {
    return (
      <div>
        <h5>エフェクタ</h5>
        {/*<Effector type={'distortion'} checked={true}/>*/}
        <Delay checked={true}/>
        {/*<Effector type={'bitCrash'} checked={false}/>*/}
      </div>
    );
  }
}
