import React from 'react';
import ReactDOM from 'react-dom';
import Sources from './Sources.jsx';
import Filters from './Filters.jsx';
import Effectors from './Effectors.jsx';

class Container extends React.Component {
  render() {
    return (
      <div name="container">
        <Sources/>
        <Filters/>
        <Effectors/>
      </div>
    );
  }
}

module.exports = Container;