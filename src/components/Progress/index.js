import React, { Component } from "react";
import { message, Tooltip } from 'antd';
import "./index.less";

export default class Progress extends Component {
  // 获取百分数
  getDivision = (num, total) => {
    num = parseFloat(num);
    total = parseFloat(total);
    if (isNaN(num) || isNaN(total)) {
      return false;
    }
    return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00) + "%";
  }

  initProgress = (dataSource, infos, total, part, titColor, index) => {
    let partNum = parseInt(dataSource[part]);
    let percent = this.getDivision(partNum, total);

    let toolTit;
    infos.forEach(info => {
      if (info.key === part) {
        toolTit = info.label
      }
    });

    let style = {};
    let backgroundColor = ["#FF4D00", "#4082e6", "#2FC25B", "#F59A23"];
    let backgroundColorJson = {
      blue: "#4082e6",
      green: "#2FC25B",
      orange: "#F59A23"
    };

    if (typeof (index) === "number") {
      style = {
        width: percent,
        backgroundColor: backgroundColor[index]
      }
    } else {
      style = {
        width: percent,
        backgroundColor: /^#/.test(titColor) ? titColor : backgroundColorJson[titColor]
      }
    }

    return <Tooltip key={index} title={`${toolTit}: ${percent}`} placement="topRight">
      <div className={`progress`} style={style}></div>
    </Tooltip>
  }

  initProgressList = () => {
    const { infos, proportion, dataSource, titColor } = this.props;
    for (let key in dataSource) {
      if (key === proportion.total) {
        this.title = dataSource[key]
      }
    }

    let total = proportion && proportion.total && parseInt(dataSource[proportion.total]);
    let newInfo = infos.flat();

    if (proportion && proportion.part && proportion.part instanceof Array) {
      let values = Object.values(dataSource).sort((a, b) => parseInt(b) - parseInt(a));

      let parts = [];
      values.forEach(value => {
        for (let key in dataSource) {
          if (dataSource[key] === value && proportion.part.includes(key)) {
            parts.push(key)
          }
        }

      })

      return parts.map((item, index) => {
        return this.initProgress(dataSource, newInfo, total, item, titColor, index)
      })


    } else if (proportion && proportion.part && (typeof (proportion.part) === "string" || typeof (proportion.part) === "number")) {
      // let num = dataSource[proportion.part].replace(/[^0-9]/ig,"");
      return this.initProgress(dataSource, newInfo, total, proportion.part, titColor)

    } else if (proportion && proportion.part) {
      message.error("proportion属性值错误类型，应为 Array, String 或  Number.")
    }


  }

  render() {
    const { showInfo } = this.props;

    return (
      <div className="progress">
        <div className="progress-main" style={{ width: !showInfo ? "100%" : null }}>
          {this.initProgressList()}
        </div>
        {
          (showInfo === undefined ? true : showInfo)
            ?
            <div className="progress-title">{this.title}</div>
            :
            null
        }
      </div>
    )
  }
}