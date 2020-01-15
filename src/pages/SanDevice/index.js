import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Row, Col, Card, Button, Table, Modal, Select, message } from 'antd';
import BasicInfo from "../../components/BasicInfo";
import ProgressInfo from "../../components/ProgressInfo";
import { BasicInfoList, CapacityList, MBPSList, IOPSList } from "./BasicInfoConfig";
import { storagePool, lun, portGrout, port } from "./columns";
import "../../assets/less/index.less";
import {getQueryVariable} from '../../utils/getQueryVariable';
import { ChangeToUTF } from '../../utils/UTFTranslate';
import state from "../../Store";

@observer
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
    let {id} = getQueryVariable(this, "id");
    if(id) {
      id = ChangeToUTF(id);
      // 根据 ID SAN 展示存储设备信息
      state.getStorageByStorageName(id);
      // 展示存储设备下存储池列表
      state.getStoragePoolByStorageName(id);
      // 展示存储设备下LUN列表
      state.getStorageLunByStorageName(id);
      // 展示存储设备下端口列表
      state.getStoragePortByStorageName(id);

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
          <BasicInfo infos={BasicInfoList} dataSource={state.sanDeviceList} />
            <ProgressInfo
            title="容量"
            titColor="blue"
            infos={CapacityList}
            proportion={{ total: "initialCapacity", part: "allocatedCapacity" }}
            dataSource={{ 
              initialCapacity: state.sanDeviceList.initialCapacity, 
              allocatedCapacity: state.sanDeviceList.allocatedCapacity,
              capacityMaxAllocationRatio: state.sanDeviceList.capacityMaxAllocationRatio,
              capacityAllocationRatio: state.sanDeviceList.capacityAllocationRatio
            }} />
          <ProgressInfo
            title="MBPS"
            titColor="green"
            infos={MBPSList}
            proportion={{ total: "initialMbps", part: "usedMbps" }}
            dataSource={{ 
              initialMbps: state.sanDeviceList.initialMbps, 
              usedMbps: state.sanDeviceList.usedMbps,
              mbpsMaxAllocationRatio: state.sanDeviceList.mbpsMaxAllocationRatio,
              mbpsAllocationRatio: state.sanDeviceList.mbpsAllocationRatio
            }} />
          <ProgressInfo
            title="IOPS"
            titColor="orange"
            infos={IOPSList}
            proportion={{ total: "initialIops", part: "usedIops" }}
            dataSource={{ 
              initialIops: state.sanDeviceList.initialIops, 
              usedIops: state.sanDeviceList.usedIops,
              iopsMaxAllocationRatio: state.sanDeviceList.iopsMaxAllocationRatio,
              iopsAllocationRatio: state.sanDeviceList.iopsAllocationRatio
            }} />
        </Card>
        <Card
          title="存储池信息"
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }}
          style={{ marginBottom: "24px" }} >
          <Table
            scroll={{ y: "76vh" }} pagination={false} bordered size="middle"
            columns={storagePool}
            dataSource={state.sanDevicePoolList} />
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
            scroll={{ y: "76vh" }} bordered size="middle"
            columns={lun}
            dataSource={state.sanDeviceLunList} />
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
            scroll={{ y: "76vh" }} pagination={false} bordered size="middle"
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
            scroll={{ y: "76vh" }} pagination={false} bordered size="middle"
            columns={port}
            dataSource={state.sanDevicePortList} />
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
