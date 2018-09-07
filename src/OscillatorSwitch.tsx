import * as React from 'react';
import App from './App';

export default class OscillatorSwitch extends React.Component<{}, { enabled: boolean }> {
  constructor(props) {
    super(props);
    this.state = {
      enabled: true
    }
  }
  render() {
    return (
      <div>
        <input disabled={!this.state.enabled} type="button" value="sine on" onClick={this.onClickHandler.bind(this)} />
      </div>
    )
  }

  onClickHandler() {
    App.connectSine();
    this.setState({ enabled: false })
  }
}