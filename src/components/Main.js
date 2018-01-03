/*
 * @Author: Yilia
 * @Date: 2017-12-27 23:48:31
 * @Last Modified by: Taoai
 * @Last Modified time: 2018-01-03 17:38:51
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

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInvert: false
    }
  }

  handleClick(item) {
    // 若已在中间，翻转；若在两边，到中间
    if (item.isCenter) {
      this.setState({isInvert: !item.isInvert}, () => {
        item.isInvert = !item.isInvert;
      });
    } else {
      item.isCenter = true;
      this.props.onCardClick(item);
    }
  }

  render() {
    let data = this.props.data;
    let trans = this.props.trans;

    let frontSide = (
      <div className="front">
        <img src={data.imgUrl} />
        <div className="card-title">{data.title}</div>
      </div>);

    let back = (<div className="back">{data.desc}</div>);
    let side = this.state.isInvert ? back : frontSide;

    return (<div onClick={this.handleClick.bind(this, data)} className="card" style={trans}>
      {side}
    </div>);
  }
}
class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: [],
      choosedIndex: -1
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.updateImgList();
  }

  componentDidMount() {
  }

  handleClick(item) {
      this.setState({choosedIndex: item.index}, () => {
        this.updateImgList();
      });
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

    let loopData = _.cloneDeep(imgData);

    _.each(loopData, (item, index) => {
      item.isInvert = false;
      let angle = '';
      let pos = {};
      let trans = {};
      if (index === choosedIndex) {
        pos = {
          x: window.innerWidth / 2 - 160,
          y: window.innerHeight / 2 - 180
        };
        trans = {
          left: pos.x,
          top: pos.y
        }
        item.isCenter = true;
      } else {
        angle = randomAngle() + 'deg';
        pos = randomPos();
        trans = {
          transform: 'rotate(' + angle + ')',
          left: pos.x,
          top: pos.y
        };
      }

      imageList.push(<Card key={item.index} data={item} invert={item.isInvert} trans={trans} onCardClick={this.handleClick}></Card>);
    });
    return imageList;
  }

  render() {
    // let imageList = this.processImgData();
    return <div className="cards">{this.state.imageList}</div>;
  }
}


class Dots extends React.Component {
  handleClick(item) {
    this.props.onDotClick(item);
  }
  render() {
    let dotList = [];
    _.each(imgData, (item, index) => {
      dotList.push(<div key={index} data={item} onClick={this.handleClick.bind(this, item)} className="dot" />);
    });
  return (
    <div className="control-bar">
      <div className="dots">{dotList}</div>
    </div>);
  }
}

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickDot = this.handleClickDot.bind(this);
  }

  handleClickDot (item) {
    this.refs.cards.handleClick(item);
  }

  render() {
    return (
      <div className="index">
        <Cards ref="cards"></Cards>
        <Dots onDotClick={this.handleClickDot}></Dots>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
