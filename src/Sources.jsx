import React from 'react';
import ReactDOM from 'react-dom';
import MasterGain from './MasterGain.jsx';
import SourceMic from './SourceMic.jsx';
import Source from './Source.jsx';
import Graph from './Graph.jsx';
import GraphFrequency from './GraphFrequency.jsx';

class Sources extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div name="source">
        <h5>サウンドソース</h5>
        <MasterGain />
        <Graph id={'g'} width={600} height={200}/>

        {/* <GraphFrequency id={'f'} width={600} height={200}/> */}
        <SourceMic active={true}/>
      </div>
    );
  }
}

module.exports = Sources;
