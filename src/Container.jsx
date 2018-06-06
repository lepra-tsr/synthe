import React from 'react';
import {
  Card,
  Elevation,
} from '@blueprintjs/core';
import './handler.css';
import Sources from './Sources.jsx';
import Filters from './Filters.jsx';
import Effectors from './Effectors.jsx';

class Container extends React.Component {
  render() {
    const style = {
      card: {
      }
    };
    return (
      <Card elevation={Elevation.ONE} style={style.card}>
        <Sources/>
        <Filters/>
        <Effectors/>
      </Card>
    );
  }
}

module.exports = Container;