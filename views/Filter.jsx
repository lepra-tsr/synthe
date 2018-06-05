import React from 'react';
import ReactDOM from 'react-dom';

class Filter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <label>
        <input type="radio" name="filter"
               value={this.props.type}
               checked={this.props.checked}
        />
        <span>{this.props.type}</span>
      </label>
    );
  }
}

module.exports = Filter;
