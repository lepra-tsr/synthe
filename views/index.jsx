const React = require('react');

import Container from './Container.jsx';

class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <html>
        <head>
          <title>synthe</title>
        </head>
        <body>
          <Container />
          <div id="container" style={{ border: 'solid 1px black' }}/>
          <div>
            <canvas id="graph" width="200" height="200"/>
          </div>
          <script type="text/javascript" src="./client.bundle.js"></script>
        </body>

      </html>
    );
  }
}

module.exports = Content;