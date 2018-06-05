'use strict';

import React from 'react';
import {
  Dialog,
  Button,
  Intent,
  Label,
} from '@blueprintjs/core';
import './handler.css';

class CreateScenario extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true };
  }

  render() {
    return (
      <html>
        <head>
          <title>synthe</title>
        </head>
        <body>
          <div id="container" style={{ border: 'solid 1px black' }}>
          </div>
          <div>
            <canvas id="graph" width="200" height="200"/>
          </div>
          <script type="text/javascript" src="./index.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = CreateScenario;