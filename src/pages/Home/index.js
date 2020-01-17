import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Card, Row, Col } from 'antd';
import '../../assets/less/index.less';
import Ring from "../../components/Charts/Ring";
import Pie from "../../components/Charts/Pie";
import state from "../../Store";

@observer
class Home extends Component {

  UNSAFE_componentWillMount() {
    // 获取 存储设备类型及占比
    state.getNumByDeviceType();
    // 数据中心下设备数量及占比
    state.getDeviceTypeNum();
  }

  render() {
    const colorList = [
      ["#007EC6", "#00D5D6", "#FFBB54"],
      ["#43AC8D", "#F59A23", "#E54347"],
      ["#4082e6", "#2FC25B", "#481CB6"]
    ]

    return (
      <Card
        className="home"
        title="建行数据中心"
        headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }}
        bodyStyle={{ height: "auto", minHeight: "77.5vh", paddingRight: "0", paddingBottom: "0" }}
      >
        <Row>
          <Col span={12}>
            <Card
              className="card"
              title="数据中心资源总数及占比"
              headStyle={{ fontSize: "14px", height: "48px" }}
              bodyStyle={{ padding: "0px", height: "80%" }}
            >
              <Ring options={{
                totalsTit: "资源总数",
                dataSource: state.resources,
                color: ["#29C9FF", "#FF5626", "#0C69FF"]
              }} />
            </Card>
          </Col>
          <Col span={12}>
            <Card
              className="card"
              title="存储设备类型及占比"
              headStyle={{ fontSize: "14px", height: "48px" }}
              bodyStyle={{ padding: "0px", height: "80%" }}>
              <Ring options={{
                totalsTit: "设备总数",
                dataSource: state.devices,
                color: ["#4082e6", "#4CB496", "#481CB6"]
              }} />
            </Card>
          </Col>
        </Row>
        <Row>
          {
            state.deviceList.map((device, index) => {
              return <Col span={8} key={index} >
                <Card className="card" key={index} bodyStyle={{ height: "100%", padding: 10 }}>
                    <Pie options={{
                      title: device.title,
                      dataSource: device.dataSource,
                      color: colorList[index],
                    }} />
                  </Card>
              </Col>
            })
          }
        </Row>
      </Card>
    )
  }
}

export default withRouter(Home)
