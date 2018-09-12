import App from './App';
import * as React from 'react';

export default class MicSwitch extends React.Component<{}, { enabled: boolean }> {
  constructor(props) {
    super(props);
    this.state = {
      enabled: true
    }
  }
  render() {
    return (
      <div>
        <input disabled={!this.state.enabled} type="button" value="マイク入力の周波数成分を表示" onClick={this.onClickHandler.bind(this)} />
      </div>
    )
  }

  onClickHandler() {
    App.connectMic().
      then(() => {
        this.setState({ enabled: false })
      }).
      catch((e) => {
        console.error(e);
      })
  }
}