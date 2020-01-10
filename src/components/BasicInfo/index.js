import React, { Component } from "react";
import { Row, Col, } from 'antd';
import "./index.less";

export default class BasicInfo extends Component {
  render() {
    const { infos, dataSource } = this.props;    
    return (
      <div>
        <Row>
          {
            infos.map((info, index) => {              
              return <Col className="basic-info-col" span={8} key={index}>
                <span>{info.label}:</span>
                {info.key ? <span>
                  {
                    info.render ? 
                      info.render(dataSource[info.key])
                    : dataSource[info.key]
                  }
                </span> : null}
              </Col>
            })
          }
        </Row>
      </div>
    )
  }
}