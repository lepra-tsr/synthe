import { ChangeEvent } from "react";
import * as React from 'react';
import App from './App';

export default class WaveFilePicker extends React.Component {
  render() {
    return (
      <div>
        <input type="file" onChange={this.onChangeHandler.bind(this)} />
      </div>
    )
  }

  onChangeHandler(e: ChangeEvent) {
    const target = e.currentTarget;
    if (!(target instanceof HTMLInputElement)) {
      return false
    }
    const { files }: any = e.target
    if (files.length === 0) {
      return false;
    }
    const waveFile: File = files[0];
    App.readWaveFile(waveFile);
  }
}