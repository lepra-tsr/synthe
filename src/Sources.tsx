import React from 'react';
import MasterGain from './MasterGain';
import SourceMic from './SourceMic';
import Graph from './Graph';
import GraphFrequency from './GraphFrequency';

export default class Sources extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h5>サウンドソース</h5>
        <MasterGain />
        <Graph id={'g'} width={600} height={200} />
        <GraphFrequency id={'f'} width={600} height={200} />
        <SourceMic active={true} />
      </div>
    );
  }
}