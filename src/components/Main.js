/*
 * @Author: Yilia
 * @Date: 2017-12-27 23:48:31
 * @Last Modified by: Taoai
 * @Last Modified time: 2018-01-02 19:08:08
 */

require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/main.sass');

import React from 'react';
import _ from 'lodash';

// let yeomanImage = require('img/yeoman.png');

import {imgData} from 'data/imgData.js';
_.each(imgData, (item, index) => {
  item.imgUrl = require(`img/${item.fileName}`);
  item.isCenter = false;
  item.index = index;
  item.isInvert = false;
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
  let leftMin = -160;
  let leftMax = window.innerWidth / 2 - 530;
  let rightMin = window.innerWidth / 2 + 210;
  let rightMax = window.innerWidth - 160;

  let x = 0;
  if (side) {
    x = Math.floor(randomNum(rightMin, rightMax));
  } else {
    x = Math.floor(randomNum(leftMin, leftMax));
  }
  let y = Math.floor(randomNum(0, window.innerHeight - 400));
  return {
    x: x,
    y: y
  };
}
class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: [],
      choosedIndex: -1
    };
    // this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.updateImgList();
  }

  componentDidMount() {
  }

  handleClick(item) {
    // 若已在中间，翻转；若在两边，到中间
    if (item.isCenter === true) {
      item.isCenter = false;
      item.isInvert = true;
    } else {
      item.isCenter = true;
      this.setState({choosedIndex: item.index}, () => {
        this.updateImgList();
      });
    }
  }

  updateImgList() {
    let imageList = this.processImgData();
    this.setState({
      imageList: imageList
    });
  }

  processImgData() {
    let imageList = [];
    let choosedIndex = 0;
    if (this.state.choosedIndex >= 0) {
      choosedIndex = this.state.choosedIndex;
    } else {
      choosedIndex = Math.floor(randomNum(0, imgData.length - 1));
    }

    imgData[choosedIndex].isCenter = true;

    let loopData = _.cloneDeep(imgData);
    loopData.splice(choosedIndex, 1);

    _.each(loopData, (item, index) => {
      let angle = '';
      let pos = {};
      let trans = {};
      if (index === choosedIndex) {
        // angle = '0deg';
        pos = {
          x: window.innerWidth / 2 - 160,
          y: window.innerHeight / 2 - 180
        };
        trans = {
          left: pos.x,
          top: pos.y
        }
      } else {
        angle = randomAngle() + 'deg';
        pos = randomPos();
        trans = {
          transform: 'rotate(' + angle + ')',
          left: pos.x,
          top: pos.y
        };
      }

      let show = {
        display: 'block'
      };
      let hide = {
        display: 'none'
      }
      imageList.push(
        <div onClick={this.handleClick.bind(this, item)} key={index} className="card" style={trans}>
          <div className="front" style={item.isInvert ? hide : show}>
            <img src={item.imgUrl} />
            <div className="card-title">{item.title}</div>
          </div>
          <div className="back" style={item.isInvert ? show : hide}>{item.desc}</div>
        </div>);
    });
    return imageList;
  }

  invertImg() {
  }

  render() {
    // let imageList = this.processImgData();
    return <div className="cards">{this.state.imageList}</div>;
  }
}


class Dots extends React.Component {
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
        <Dots></Dots>
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
        <Cards></Cards>
        <ControlBar></ControlBar>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
