import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Card, Radio, Select, Row, Col, message } from 'antd';
import Line from '../../components/Charts/Line';
import BasePie from '../../components/Charts/BasePie';
import BaseRing from '../../components/Charts/BaseRing';
import DistributionRatio from '../../components/DistributionRatio';
import platinum from "../../assets/images/platinum.svg";
import gold from "../../assets/images/gold.svg";
import silver from "../../assets/images/silver.svg";
import './index.less';
import state from '../../Store';
import {getQueryVariable} from '../../utils/getQueryVariable';

const { Option } = Select;

@observer
class Base extends Component {

  // 资源池下拉框
  resourcePool = value => {
    state.getDevNumOrDevCapByPool(value);
    state.getDistributionRatioTrendByPool(value, state.linkDate);
  }

  UNSAFE_componentWillMount() {
    const {id} = getQueryVariable(this, "id");
    if(id) {
      // 根据 ID 获取当前数据中心 - 设备总览 和 各存储设备分配占比
      state.getBaseRingOrAvaCap(id);
      // 获取当前数据中心所有资源池
      state.getResourcePoolOptions(id);
      // 获取当前数据中心资源池分配比例趋势图
      state.getDistributionRatioTrendByPool(id, state.linkDate);

    }else {
      message.warning('当前页面没有获取正确参数，请点击左侧导航重新获取！');
    }
  }

  render() {    
    return (
      <Card
        title={state.menuItem.title}
        className="base-card"
        headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }}
        bodyStyle={{ position: "relative", height: "77.5vh", overflow: "auto" }}
      >
        <div className="top">
          <Card
            className="card"
            title="设备总览"
            headStyle={{ fontSize: "14px", height: "48px" }}
            bodyStyle={{ padding: "0px", height: "83%" }}>
            <BaseRing options={{
              dataSource: state.baseRingDataSource,
              totalsTit: "设备总数",
              color: ["#4082e6", "#00D5D6", "#481CB6"]
            }} />
          </Card>
          <Card
            className="card"
            title="各存储设备分配占比"
            headStyle={{ fontSize: "14px", height: "48px" }}
            bodyStyle={{ padding: "18px" }}
          >
            <DistributionRatio
              title="SAN存储可用容量分配比例"
              titColor="#858EF5"
              dataSource={state.availableCapacityRatio.san}
            />
            <DistributionRatio
              title="NAS存储可用容量分配比例"
              titColor="#2DD5A5"
              dataSource={state.availableCapacityRatio.nas}
            />
            <DistributionRatio
              title="交换机端口分配比例"
              titColor="#FDC424"
              dataSource={state.availableCapacityRatio.switch}
            />
          </Card>
        </div>
        <Card className="bottom">
          <Row className="row" type="flex" justify="end">
            <Col span={6}>
              <Select
                value={state.resourcePoolValue}
                onChange={value => {this.resourcePool(value)}} 
                style={{ width: "100%" }}
                >
                {
                  state.resourcePoolOptions.map((item, index) => {
                    return <Option key={index} value={item.key}>{item.value}</Option>
                  })
                }
              </Select>
            </Col>
          </Row>
          <Row type="flex" justify="space-between">
            <Col span={12}>
              <Radio.Group 
                defaultValue={state.linkDate}
                onChange={e => state.getDistributionRatioTrendByPool(state.resourcePoolValue, e.target.value)}
                buttonStyle="solid">
                <Radio.Button value="WEEK">本周</Radio.Button>
                <Radio.Button value="MONTH">本月</Radio.Button>
                <Radio.Button value="YEAR">全年</Radio.Button>
              </Radio.Group>
            </Col>
            <Col span={3}>
              <Select defaultValue="all" onChange={state.linkSelectedChange} style={{ width: "100%" }}>
                <Option value="all">全部</Option>
                <Option value="capacity">容量分配比例</Option>
                <Option value="mbps">MBPS分配比例</Option>
                <Option value="iops">IOPS分配比例</Option>
              </Select>
            </Col>
          </Row>
          <Row className="row">
            <Col span={24} style={{ height: "380px" }}>
              <Line
                selected={state.linkSelected}
                dataSource={state.distributionRatioTrendByPool}/>
            </Col>
          </Row>
          <Row type="flex" justify="start" style={{ height: 310 }}>
            <Col span={12} style={{ height: "100%", paddingBottom: 10 }}>
              <BasePie options={{
                dataSource: state.deviceNumByPool,
                color: ["#0C69FF", "#00D5D6", "#F74254"],
                title: "各资源池设备数量占比"
              }} />
            </Col>
            <Col span={12} style={{ height: "100%", paddingBottom: 10 }}>
              <BasePie options={{
                dataSource: state.deviceCapacityByPool,
                color: ["#47BAFD", "#FF8400", "#C4C4C4"],
                title: "各资源池设备容量占比",
                legendData: [
                  { name: '白金', icon: `image://${platinum}` },
                  { name: '金', icon: `image://${gold}` },
                  { name: '银', icon: `image://${silver}` },
                ]
              }} />
            </Col>
          </Row>
        </Card>
      </Card>
    )
  }
}

export default withRouter(Base)
