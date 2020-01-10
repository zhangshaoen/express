import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Row, Col, Card, Button, Table, Modal, Select, message } from 'antd';
import BasicInfo from "../../components/BasicInfo";
import ProgressInfo from "../../components/ProgressInfo";
import { BasicInfoList, CapacityList, MBPSList, IOPSList } from "./BasicInfoConfig";
import { storagePool, lun, portGrout, port } from "./columns";
import "./index.less";
import state from '../../Store';
import {getQueryVariable} from '../../utils/getQueryVariable';


class SanDevice extends Component {

  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  UNSAFE_componentWillMount() {
    const {id} = getQueryVariable(this, "id");
    if(id) {
      // 根据 ID 存储控制器页面基本信息查询
      state.getNasStorageControlInfoByName(id);
      
    }else {
      message.warning('当前页面没有获取正确参数，请点击左侧导航重新获取！');
    }
  }


  render() {
    return (
      <Card>
        <Card
          title="基本信息"
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }}
          style={{ marginBottom: "24px" }} >
          <BasicInfo infos={BasicInfoList} />
          <ProgressInfo
            title="容量"
            titColor="blue"
            infos={CapacityList}
            proportion={{ total: "ainitialCapacity", part: "allocatedCapacity" }}
            dataSource={{ ainitialCapacity: "100T", allocatedCapacity: "30T" }} />
          <ProgressInfo
            title="MBPS"
            titColor="green"
            infos={MBPSList}
            proportion={{ total: "initialMbps", part: "usedMbps" }}
            dataSource={{ initialMbps: "100G", usedMbps: "40G" }} />
          <ProgressInfo
            title="IOPS"
            titColor="orange"
            infos={IOPSList}
            proportion={{ total: "finitialIops", part: "usedIops" }}
            dataSource={{ finitialIops: 100, usedIops: 20 }} />
        </Card>
        <Card
          title="存储池信息"
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }}
          style={{ marginBottom: "24px" }} >
          <Table
            scroll={{ y: "76vh", x: 1500 }} pagination={false} bordered size="middle"
            columns={storagePool}
            dataSource={[]} />
        </Card>
        <Card
          title="LUN信息"
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }}
          style={{ marginBottom: "24px" }} >
          <Row type="flex" justify="end">
            <Col span={4} style={{ marginBottom: "24px" }}>
              <Select placeholder="存储池名称" className="lun-sel"></Select>
            </Col>
            <Col span={4} style={{ marginBottom: "24px" }}>
              <Select placeholder="LUN大小" className="lun-sel"></Select>
            </Col>
            <Col span={4} style={{ marginBottom: "24px" }}>
              <Select placeholder="所属VIEW" className="lun-sel"></Select>
            </Col>
            <Col span={4} style={{ marginBottom: "24px" }}>
              <Select placeholder="是否已分配" className="lun-sel"></Select>
            </Col>
            <Col span={4} style={{ marginBottom: "24px" }}>
              <Select placeholder="关联主机名称" className="lun-sel"></Select>
            </Col>
          </Row>
          <Table
            scroll={{ y: "76vh", x: 1500 }} bordered size="middle"
            columns={lun}
            dataSource={[]} />
        </Card>
        <Card
          title="端口分组信息"
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }}
          style={{ marginBottom: "24px" }} >
          <Row type="flex" justify="end">
            <Col span={2} style={{ marginBottom: "24px" }}>
              <Button onClick={this.showModal} type="primary">增加</Button>
            </Col>
          </Row>
          <Table
            scroll={{ y: "76vh", x: 1500 }} pagination={false} bordered size="middle"
            columns={portGrout}
            dataSource={[]} />
        </Card>
        <Card
          title="端口信息"
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }}>
          <Row type="flex" justify="end">
            <Col span={4} style={{ marginBottom: "24px" }}>
              <Select placeholder="所在Fabric" className="lun-sel"></Select>
            </Col>
            <Col span={4} style={{ marginBottom: "24px" }}>
              <Select placeholder="连接交换机名称" className="lun-sel"></Select>
            </Col>
          </Row>
          <Table
            scroll={{ y: "76vh", x: 1500 }} pagination={false} bordered size="middle"
            columns={port}
            dataSource={[]} />
        </Card>
        <Modal
          title="端口分组信息"
          okText="确认"
          cancelText="取消"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >

        </Modal>
      </Card>
    )
  }
}

export default withRouter(SanDevice)
