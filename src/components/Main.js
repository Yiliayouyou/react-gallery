/*
 * @Author: Yilia
 * @Date: 2017-12-27 23:48:31
 * @Last Modified by: Taoai
 * @Last Modified time: 2017-12-29 17:28:54
 */

require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/main.sass');

import React from 'react';
import _ from 'lodash';

let yeomanImage = require('img/yeoman.png');

import {imgData} from 'data/imgData.js';
_.each(imgData, item => {
  item.imgUrl = require(`img/${item.fileName}`);
});

class Card extends React.Component {
  render() {
    return (
      <div className="card">
        <img src={yeomanImage} />
        <div className="card-title">title</div>
      </div>
    );
  }
}

class Dot extends React.Component {
  render() {
    return (
      <div class="dot"></div>
    )
  }
}
class ControlBar extends React.Component {
  render() {
    return (
      <div className="control-bar">
        <Dot></Dot>
      </div>
    )
  }
}

class AppComponent extends React.Component {
  handleClick () {
    alert('clicked');
    console.log(imgData);
  }

  render() {
    return (
      <div className="index">
        <img onClick={this.handleClick} src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
        <Card></Card>
        <ControlBar></ControlBar>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
