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
        width: '256px',
        height: '256px',
        border: '1px solid lightgray',
      }
    };
    return (
      <html>
        <head>
          <title>synthe!</title>
        </head>
        <body>
          <div id="container" style={style.container}></div>
          <div id="micSwitch"></div>
          <div id="oscillatorSwitch"></div>
          <canvas id="graph" style={style.graph}></canvas>
          <script type="text/javascript" src="./client.bundle.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = Content;