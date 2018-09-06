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
      canvas: {
        width: '80%',
        height: '300px',
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
          <canvas id="graph" style={style.graph}></canvas>
          <script type="text/javascript" src="./client.bundle.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = Content;