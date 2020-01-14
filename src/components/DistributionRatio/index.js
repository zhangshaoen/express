import React, { Component } from "react";
import { Row, Col } from 'antd';
import Progress from '../Progress';
import "./index.less"

export default class DistributionRatio extends Component {
  render() {
    let { title, titColor, dataSource} = this.props;

    if(String(dataSource).indexOf(".") !== -1){
      dataSource = dataSource * 100
    }

    return (
      <div className="distribution-ratio">
        <Row className="title">
          <Col span={24}>
            {title}
          </Col>
        </Row>
        <Row className="percentage" style={{color: /^#/.test(titColor) ? titColor : null }}>
          <Col span={24}>
            { typeof(dataSource) === "number" ? `${dataSource}%` : dataSource }
          </Col>
        </Row>
        <Row className="progress">
          <Col span={24}>
            <Progress
              titColor={ titColor }
              showInfo={false}
              infos={[{label: "总比例", key: "total" }, {label: title, key: "part" }]}
              proportion={{total: "total", part: "part"}} 
              dataSource={{total: 100, part: dataSource}}
              />
          </Col>
        </Row>
      </div>
    )
  }
}