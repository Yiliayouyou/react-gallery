/*
 * @Author: Yilia
 * @Date: 2017-12-27 23:48:31
 * @Last Modified by: Yilia
 * @Last Modified time: 2018-01-01 22:08:37
 */

require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/main.sass');

import React from 'react';
import _ from 'lodash';

// let yeomanImage = require('img/yeoman.png');

import {imgData} from 'data/imgData.js';
_.each(imgData, item => {
  item.imgUrl = require(`img/${item.fileName}`);
});

function randomAngle() {
  let angle = 0;
  angle = Math.random()*60 - 30;
  return angle;
}

function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}

function randomPos() {
  let side = Math.random() > 0.5 ? 1 : 0;
  let leftMin = 40;
  let leftMax = window.innerWidth / 2 - 440;
  let rightMin = window.innerWidth / 2 + 520;
  let rightMax = window.innerWidth / 2 - 420;

  let x = 0;
  if (side) {
    x = randomNum(rightMin, rightMax);
  } else {
    x = randomNum(leftMin, leftMax);
  }
  let y = randomNum(0, window.innerHeight - 460);
  return {
    x: x,
    y: y
  };
}

class Card extends React.Component {
  render() {
    let imageList = [];
    _.each(imgData, (item, index) => {
      let angle = randomAngle() + 'deg';
      let pos = randomPos();
      let trans = {
        transform: 'rotate(' + angle + ')',
        left: pos.x,
        top: pos.y
      };
      imageList.push(<div key={index} className="card" style={trans}>
              <img src={item.imgUrl} />
              <div className="card-title">{item.title}</div>
          </div>);
    });
    return <div className="cards">{imageList}</div>;
  }
}

class Dot extends React.Component {
  render() {
    let dotList = [];
    _.each(imgData, (item, index) => {
      dotList.push(<div key={index} data-url={item.imgUrl} className="dot" />);
    });
    return <div className="dots">{dotList}</div>;
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
        {/* <div className="left-square"></div>
        <div className="right-square"></div>

        <div className="stage"></div> */}
        <Card></Card>
        <ControlBar></ControlBar>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
