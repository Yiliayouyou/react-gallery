/*
 * @Author: Yilia 
 * @Date: 2017-12-27 23:48:31 
 * @Last Modified by:   Yilia 
 * @Last Modified time: 2017-12-27 23:48:31 
 */

require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
