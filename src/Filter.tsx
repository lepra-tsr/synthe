import React from 'react';

interface IFilterProps {
  type: string;
  checked: boolean;
}

export default class Filter extends React.Component<IFilterProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <label>
        <input type="radio" name="filter"
          onChange={() => { }}
          value={this.props.type}
          checked={this.props.checked}
        />
        <span>{this.props.type}</span>
      </label>
    );
  }
}
