import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Card } from 'antd';
import "./index.less";
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
        title="建行数据中心"
        className="big-card"
        headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }}
        bodyStyle={{ height: "77.5vh" }}
      >
        <div className="total">
          <Card
            className="card"
            title="数据中心资源总数及占比"
            headStyle={{ fontSize: "14px", height: "48px" }}
            bodyStyle={{ padding: "0px", height: "83%" }}
          >
            <Ring options={{
              totalsTit: "资源总数",
              dataSource: state.resources,
              color: ["#29C9FF", "#FF5626", "#0C69FF"]
            }} />
          </Card>
          <Card
            className="card"
            title="存储设备类型及占比"
            headStyle={{ fontSize: "14px", height: "48px" }}
            bodyStyle={{ padding: "0px", height: "83%" }}>
            <Ring options={{
              totalsTit: "设备总数",
              dataSource: state.devices,
              color: ["#4082e6", "#4CB496", "#481CB6"]
            }} />
          </Card>
        </div>
        <div className="respective">
          {
            state.deviceList.map((device, index) => {
              return <Card className="card" key={index} bodyStyle={{ height: "100%", padding: 10 }}>
              <Pie options={{
                title: device.title,
                dataSource: device.dataSource,
                color: colorList[index],
              }} />
            </Card>
            })
          }
        </div>
      </Card>
    )
  }
}

export default withRouter(Home)
