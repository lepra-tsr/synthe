import React from 'react';

class Source extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div name={this.props.name}>
        <label>
          <input type="checkbox" checked={this.props.active}/>
          <span>{this.props.name}: ready</span>
        </label>
        {this.props.freq && (<label>
          <span>frequency</span>
          <input type="range"
                 min={this.props.freq.min}
                 max={this.props.freq.max}
                 step={this.props.freq.step}
                 value={this.props.freq.value}
          />
        </label>)}
        <label>
          <span>gain</span>
          <input type="range"
                 min={this.props.gain.min}
                 max={this.props.gain.max}
                 step={this.props.gain.step}
                 value={this.props.gain.value}
          />
        </label>
      </div>
    );
  }
}

module.exports = Source;