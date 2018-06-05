import React from 'react';
import ReactDOM from 'react-dom';

class Effector extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div name={this.props.type}>
        <label>
          <input type="checkbox"
                 onChange={() => {
                 }}
                 checked={this.props.checked}/>
          <span>{this.props.type}</span>
        </label>
      </div>
    );
  }
}

module.exports = Effector;
