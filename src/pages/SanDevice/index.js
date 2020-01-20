/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Row, Col, Card, Button, Table, Modal, Select, message, Popconfirm } from 'antd';
import AddOrUpdate from './AddOrUpdate';
import BasicInfo from "../../components/BasicInfo";
import ProgressInfo from "../../components/ProgressInfo";
import { BasicInfoList, CapacityList, MBPSList, IOPSList } from "./BasicInfoConfig";
import { storagePool, lun, port } from "./columns";
import "../../assets/less/index.less";
import {getQueryVariable} from '../../utils/getQueryVariable';
import state from "../../Store";

const { Option } = Select;

@observer
class SanDevice extends Component {

  state = { 
    storageName: null,
    poolName: "",
    viewName: "",
    visible: false,
    type: "",
    typeTitle: "",
    updateData: {},
  };

  initOptons = type => {
    let options = [];
    if (type === "fabric") {
      state.fabricList?.forEach((item, index) => {
        options.push(<Option value={item.fabricName} key={index}>{item.fabricName}</Option>);
      });
    }else if(type === "pool") {
      state.lunPool?.forEach((item, index) => {
        options.push(<Option value={item.sanStoragePoolName} key={index}>{item.sanStoragePoolName}</Option>);
      });
    }else if(type === "view") {
      state.lunViews?.forEach((item, index) => {
        options.push(<Option value={item.name} key={index}>{item.name}</Option>);
      });
    }
    return options;
  }

  portGrout = () => {
    return [
      {
        title: "分组名称",
        dataIndex: "name",
        fixed: 'left',
        width: 150,
      },
      {
        title: "存储名称",
        dataIndex: "storageName",
      },
      {
        title: "VSAN名称",
        dataIndex: "vsanName",
      },
      {
        title: "初始MBPS",
        dataIndex: "initialMbps",
      },
      {
        title: "剩余MBPS",
        dataIndex: "surplusMbps",
      },
      {
        title: "初始IOPS",
        dataIndex: "initialIops",
      },
      {
        title: "剩余IOPS",
        dataIndex: "surplusIops",
      },
      {
        title: "状态",
        dataIndex: "status",
        render: text => text === "Y" ? "是" : text === "N" ? "否" : null
      },
      {
        title: "操作",
        dataIndex: "operation",
        fixed: 'right',
        width: 150,
        render: (text, record, index) => (
          <span>
            <Button onClick={() => this.showModal("update", record)} type='primary' size="small" style={{ marginRight: "10px" }}>编辑</Button>
            <Popconfirm title="是否确认删除当前分组？" onConfirm={() => this.deletePorGro (record.name)}>
              <Button type='danger' size="small">删除</Button>
            </Popconfirm>
          </span>
        )
      },
    ]
  }

  showModal = (type, record) => {
    this.setState({ 
      visible: true,
      type,
      typeTitle: type === "add" ? "新增" : type === "update" ? "编辑" : "",
    }, () => {
      if(type === "update") {
        this.setState({ updateData: record });
      }else if(type === "add") {
        this.setState({ updateData: {} });
      }
    });
  };

  handleOk = e => {
    this.form.validateFields(async (err, values) => {
      this.form.resetFields();
      if (!err) {
        this.setState({ visible: false, }, () => {
          if(this.state.type === "add"){
            values.storageName = this.state.storageName;
            state.addPortGroup(values).then(() => {
              state.getPortGroupList(this.state.storageName);
            })
          }else if(this.state.type === "update") {
            for(let key in values) {
              this.state.updateData[key] = values[key];
            }
            let updateValues = toJS(this.state.updateData);
            state.updatePortGroup(updateValues).then(() => {
              state.getPortGroupList(this.state.storageName);
            });
          }          
        });
      }
    });
  };

  handleCancel = e => {
    this.form.resetFields();
    this.setState({ visible: false, });
  };

  deletePorGro = portCustomGroupName => {
    state.deletePortGroup(portCustomGroupName).then(() => {
      state.getPortGroupList(this.state.storageName);
    })
  }

  fabricChange = value => {
    // 展示存储设备下端口列表
    state.getStoragePortByStorageName(this.state.storageName, value);
  }

  lunFilterChange = (poolName, viewName) => {
    this.setState({ poolName, viewName }, () => {
      // 展示存储设备下LUN列表
      state.getStorageLunByStorageName(this.state.storageName, poolName, viewName);
    });
  }

  UNSAFE_componentWillMount() {
    let {id} = getQueryVariable(this, "id");
    if(id) {
      // 根据 ID SAN 展示存储设备信息
      state.getStorageByStorageName(id).then(() => {
        let { storageName } = state.sanDeviceList;
        this.setState({ storageName });
      });
      // 展示存储设备下存储池列表
      state.getStoragePoolByStorageName(id);
      // 展示存储设备下LUN列表
      state.getStorageLunByStorageName(id);
      // 获取所有view列表
      state.getViewList();
      // 获取所有FABRIC
      state.getFabricList();
      // 展示存储设备下端口列表
      state.getStoragePortByStorageName(id);
      // 获取端口分组列表
      state.getPortGroupList(id);
      // 端口分组根据存储设备名称获取对应VSAN列表
      state.getVsanListByStorageName(id);

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
            rowKey={record => record.name}
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
              <Select onChange={ value => this.lunFilterChange(value, this.state.viewName) } allowClear={true} placeholder="存储池名称" className="lun-sel">
                { this.initOptons("pool") }
              </Select>
            </Col>
            <Col span={4} style={{ marginBottom: "24px" }}>
              <Select onChange={ value => this.lunFilterChange(this.state.poolName, value) } allowClear={true} placeholder="所属VIEW" className="lun-sel">
                { this.initOptons("view") }
              </Select>
            </Col>
          </Row>
          <Table
            rowKey={record => record.sanStoragePoolName}
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
              <Button onClick={() => { this.showModal("add") }} type="primary">增加</Button>
            </Col>
          </Row>
          <Table
            rowKey={record => record.name}
            scroll={{ y: "76vh" }} pagination={false} bordered size="middle"
            columns={this.portGrout()}
            dataSource={state.portGroupList} />
        </Card>
        <Card
          title="端口信息"
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }}>
          <Row type="flex" justify="end">
            <Col span={4} style={{ marginBottom: "24px" }}>
              <Select onChange={this.fabricChange} allowClear={true} placeholder="所在Fabric" className="lun-sel">
                { this.initOptons("fabric") }
              </Select>
            </Col>
          </Row>
          <Table
            rowKey={record => record.name}
            scroll={{ y: "76vh" }} pagination={false} bordered size="middle"
            columns={port}
            dataSource={state.sanDevicePortList} />
        </Card>
        <Modal
          title={`端口分组信息${this.state.typeTitle}`}
          okText="确认"
          cancelText="取消"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div style={{maxHeight: "50vh", overflowY: "auto"}}>
            <AddOrUpdate dataSource={this.state.updateData} setForm={form => { this.form = form }} />
          </div>
        </Modal>
      </Card>
    )
  }
}

export default withRouter(SanDevice)
