const React = require('react');

class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      container: {
        width: '80%',
        display: 'flex',
        marginLeft: '10%',
      },
      graph: {
        border: '1px solid lightgray',
      }
    };
    const cWidth = 256;
    const cHeight = 256;
    return (
      <html>
        <head>
          <title>synthe!</title>
        </head>
        <body>
          <div id="container" style={style.container}></div>
          <div id="micSwitch"></div>
          <div id="oscillatorSwitch"></div>
          <canvas id="graph" width={cWidth} height={cHeight} style={style.graph}></canvas>
          <script type="text/javascript" src="./client.bundle.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = Content;