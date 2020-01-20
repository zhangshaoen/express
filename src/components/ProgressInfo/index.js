import React, { Component } from "react";
import { Row, Col } from 'antd';
import Progress from '../Progress';
import "./index.less"

export default class ProgressInfo extends Component {


  initProgressInfo = (list, dataSource) => {
    return list.map((progress, index) => {
      return <Row key={index}>
        <Col span={3} className="col-label" >
          <span>{progress[0].label}</span>
          <span className="label">{progress[0].label ? ":" : null}</span>
        </Col>
        <Col span={4}>
          <span>{ progress[0].key && dataSource && dataSource[progress[0].key] }</span>
        </Col>
        <Col span={5} className="col-label">
          <span>{progress[1].label}</span>
          <span className="label">{progress[1].label ? ":" : null}</span>
        </Col>
        <Col span={12}>
          <span>{ progress[1].key && dataSource && dataSource[progress[1].key] }</span>
        </Col>
      </Row>
    })
  }

  render() {
    const { title, titColor, infos, proportion, dataSource} = this.props;
    
    return (
      <div>
        <Row>
          <Col span={1}>
            <div className={`circle ${titColor}`}>{title}</div>
          </Col>
          <Col span={23}>
            {this.initProgressInfo(infos, dataSource)}
          </Col>
        </Row>
        <Row className="row">
          <Col span={24}>
            <Progress 
              infos={infos}
              titColor={titColor}
              proportion={proportion}
              dataSource={dataSource} />
          </Col>
        </Row>
      </div>

    )
  }
}