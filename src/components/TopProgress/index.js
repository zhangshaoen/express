import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './topProgress.less';
let defaultState = { show: false }
class Progress extends Component {
  state = { ...defaultState }
  start() { // 开始显示
    this.setState({
      show: true
    })
  }
  done() { // 结束隐藏
    this.setState({
      show: false
    })
  }
  render() {
    return (
      <div className="myprogress" style={this.state.show ? { display: 'block' } : { display: 'none' }}>
        <div className="bar">
          <div className="peg"></div>
        </div>
        <div className="spinner">
          <div className="spinner-icon"></div>
        </div>
      </div>
    )
  }
}
// 创建元素追加到body
let div = document.createElement('div');
let props = {
};
document.body.appendChild(div);

let Box = ReactDOM.render(React.createElement(
  Progress,
  props
), div);
export default Box;