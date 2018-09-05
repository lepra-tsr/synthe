import React from 'react';
import {
  Card,
} from '@blueprintjs/core';
import './handler.css';
import Sources from './Sources';
import Filters from './Filters';
import Effectors from './Effectors';

export default class Container extends React.Component {
  render() {
    return (
      <Card >
        <Sources />
        <Filters />
        <Effectors />
      </Card>
    );
  }
}