import React, { Component } from 'react';
import state from "../../Store";
import { Card, Row, Col, TimePicker, Checkbox, Button } from "antd";
import moment from 'moment';
import { getQueryVariable } from '../../utils/getQueryVariable';
import "./index.less";


class Acquisition extends Component {

  onChange = (time, timeString) => {
    console.log(time, timeString);
  }

  onCheckChange = checkedValues => {
    console.log('checked = ', checkedValues);
  }

  UNSAFE_componentWillMount() {
    const { pathname, id } = getQueryVariable(this, "id");
    state.breadcrumbByUrl(pathname, id);
  }

  render() {
    const optionsWithDisabled = [
      { value: 'Monday', label: '星期一' },
      { value: 'Tuesday', label: '星期二' },
      { value: 'Wednesday', label: '星期三' },
      { value: 'Thursday', label: '星期四' },
      { value: 'Friday', label: '星期五' },
      { value: 'Saturday', label: '星期六' },
      { value: 'Sunday', label: '星期日' },
    ];

    return (
      <Card
        title="定时数据采集"
        headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }}
        bodyStyle={{height: "78vh"}}>
        <Row className="row">
          <Col span={2}>
            采集时间
          </Col>
          <Col span={22}>
            <TimePicker placeholder="请选择时间" onChange={this.onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
          </Col>
        </Row>
        <Row className="row">
          <Col span={24}>
            <Checkbox.Group
              options={optionsWithDisabled}
              defaultValue={[]}
              onChange={this.onCheckChange}
            />
          </Col>
        </Row>
        <Row className="row" type="flex" justify="end">
          <Col span={2}>
            <Button type="primary" >保存</Button>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Acquisition;