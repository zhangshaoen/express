import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Row, Col, Card, Button, Table, Modal, message, Popconfirm } from 'antd';
import AddDevice from './AddDevice';
import UpdateDevice from './UpdateDevice';
import BasicInfo from "../../components/BasicInfo";
import ProgressInfo from "../../components/ProgressInfo";
import { BasicInfoList, CapacityList, MBPSList, IOPSList } from "./BasicInfoConfig";
import state from '../../Store';
import { getQueryVariable } from '../../utils/getQueryVariable';


@observer
class Unit extends Component {

  state = {
    addVisible: false,
    updateVisible: false,
    addValues: {},
    updateData: {}
  };

  showModal = (type, item) => {
    type === "update" ? this.setState({
      updateVisible: true,
    }, () => {
      // 编辑
      this.setState({updateData: item});
    }) : this.setState({
      addVisible: true,
    }, () => {
      // 新增

    })
  };

  handleAddOk = e => {
    this.form.validateFields(async (err, values) => {
      this.form.resetFields();
      if (!err) {
        this.setState({
          addVisible: false,
        }, () => {
          let storageUnitId = this.state.addValues.id;
          let addValues = { storageUnitId, ...values};
          if(/nas/.test(this.state.addValues.pathname)) {
            // 存储单元页面存储控制器列表项新增
            state.addStorageControl(addValues).then(() => {
              // 根据 ID 获取存储单元页面存储控制器列表查询
              state.getStorageControlListByStorageUnit(this.state.addValues.id);
            });
          }else if(/san/.test(this.state.addValues.pathname)) {
            // SAN存储设备新增
            state.saveSanStorage(addValues).then(() => {
              // 获取SAN存储设备列表
              state.getSanStorageList(this.state.addValues.id);
            })
          }
        });
      }
    })
  };

  handleAddCancel = e => {
    this.form.resetFields()
    this.setState({ addVisible: false });
  };

  handleUpdataOk = e => {
    this.form.validateFields(async (err, values) => {
      this.form.resetFields();
      if (!err) {
        this.setState({
          updateVisible: false,
        }, () => {
          // let updateValues = { ..., ...values};
          for(let key in values) {
            this.state.updateData[key] = values[key];
          }
          let updateValues = toJS(this.state.updateData); 
          if(/nas/.test(this.state.addValues.pathname)) {
            state.updateStorageControl(updateValues).then(() => {
              // 根据 ID 获取存储单元页面存储控制器列表查询
              state.getStorageControlListByStorageUnit(this.state.addValues.id);
            });
          }else if(/san/.test(this.state.addValues.pathname)) {
            state.updateStorageDevice(updateValues).then(() => {
              // 获取SAN存储设备列表
              state.getSanStorageList(this.state.addValues.id);
              // 获取未关联的SAN存储设备列表
              state.getFreeSanStorageList();
            })
          }
        });
      }
    })
  };

  handleUpdataCancel = e => {
    this.form.resetFields()
    this.setState({ updateVisible: false, });
  };

  deleteStoCon = (flag, record) => {
    if(flag) { // NAS 删除
      state.deleteStorageControl(record).then(() => {
        // 根据 ID 获取存储单元页面存储控制器列表查询
        state.getStorageControlListByStorageUnit(this.state.addValues.id);
        // 存储级别页面所有未被单元添加且有效的NAS控制器名称列表
        state.getNASStorageControlList();
      });
    }else { // SAN 删除
      state.deleteStorageDevice(record).then(() => {
        // 获取SAN存储设备列表
        state.getSanStorageList(this.state.addValues.id);
        // 获取未关联的SAN存储设备列表
        state.getFreeSanStorageList();
      })
    }
  }


  initColumns = flag => {
    let name = flag ? "name" : "storageName";

    let columns = [
      {
        title: "设备名称",
        dataIndex: name,
        width: 200,
        fixed: 'left',
      },
      {
        title: "厂商",
        dataIndex: "manufacturer"
      },
      {
        title: "所属数据中心",
        dataIndex: "dataCenter"
      },
      {
        title: "部署楼宇",
        dataIndex: "position"
      },
      {
        title: "管理机",
        dataIndex: "manageServerName"
      },
      {
        title: "服务状态",
        dataIndex: "status",
        render: (text, record) => {
          switch (text) {
            case "Y":
              return <span style={{ color: "#2FC25B" }}>正常服务</span>
            case "N":
              return <span style={{ color: "rgba(252, 75, 108, 1)" }}>维护服务</span>
            default:
          }
        }
      },
      {
        title: "操作",
        dataIndex: "operation",
        fixed: 'right',
        width: 150,
        render: (text, record, index) => (
          <span>
            <Button onClick={() => this.showModal("update", record)} type='primary' size="small" style={{ marginRight: "10px" }}>编辑</Button>
            <Popconfirm title="是否确认删除当前设备？" onConfirm={() => this.deleteStoCon(flag, record)}>
              <Button type='danger' size="small">删除</Button>
            </Popconfirm>
          </span>
        )
      },
    ];

    if (flag) {
      columns.splice(5, 0, {
        title: "是否可做心跳盘",
        dataIndex: "isHeart",
        render: (text, record) => <span>{`${text === "Y" ? "是" : text === "N" ? "否" : ""}`}</span>,
      })
    }

    return columns;
  }

  UNSAFE_componentWillMount() {
    const { pathname, id } = getQueryVariable(this, "id");
    if (id) {
      // 根据 ID 获取存储单元页面基本信息查询
      state.getStorageUnitInfoById(id).then(() => {
        let {id} = state.unitBasicInfo;
        this.setState({
          addValues: {id, pathname}
        });
      });

      if(/nas/.test(pathname)) {
        // 根据 ID 获取存储单元页面存储控制器列表查询
        state.getStorageControlListByStorageUnit(id);
        // 存储级别页面所有未被单元添加且有效的NAS控制器名称列表
        state.getNASStorageControlList();
      }else if(/san/.test(pathname)) {
        // 获取SAN存储设备列表
        state.getSanStorageList(id);
        // 获取未关联的SAN存储设备列表
        state.getFreeSanStorageList();
      }
    } else {
      message.warning('当前页面没有获取正确参数，请点击左侧导航重新获取！');
    }
  }

  componentWillUnmount(){
    this.setState = (state, callback) => {
      return;
    }
  }

  render() {
    let dataSource = /nas/.test(this.props.location.pathname) ? state.unitList : state.sanUnitList;
    return (
      <Card>
        <Card
          title="基本信息"
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }}
          style={{ marginBottom: "24px" }} >
          <BasicInfo infos={BasicInfoList} dataSource={state.unitBasicInfo} />
          <ProgressInfo
            title="容量"
            titColor="blue"
            infos={CapacityList}
            proportion={{ total: "initialCapacity", part: "allocatedCapacity" }}
            dataSource={{
              initialCapacity: state.unitBasicInfo.initialCapacity,
              capacityMaxAllocationRatio: state.unitBasicInfo.capacityMaxAllocationRatio,
              allocatedCapacity: state.unitBasicInfo.allocatedCapacity,
              capacityAllocationRatio: state.unitBasicInfo.capacityAllocationRatio
            }} />
          <ProgressInfo
            title="MBPS"
            titColor="green"
            infos={MBPSList}
            proportion={{ total: "initialMbps", part: "usedMbps" }}
            dataSource={{
              initialMbps: state.unitBasicInfo.initialMbps,
              usedMbps: state.unitBasicInfo.usedMbps,
              mbpsMaxAllocationRatio: state.unitBasicInfo.mbpsMaxAllocationRatio,
              mbpsAllocationRatio: state.unitBasicInfo.mbpsAllocationRatio
            }} />
          <ProgressInfo
            title="IOPS"
            titColor="orange"
            infos={IOPSList}
            proportion={{ total: "initialIops", part: "usedIops" }}
            dataSource={{
              initialIops: state.unitBasicInfo.initialIops,
              usedIops: state.unitBasicInfo.usedIops,
              iopsMaxAllocationRatio: state.unitBasicInfo.iopsMaxAllocationRatio,
              iopsAllocationRatio: state.unitBasicInfo.iopsAllocationRatio
            }} />
        </Card>
        <Card
          title={state.menuItem?.title}
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }} >
          <Row type="flex" justify="end">
            <Col span={3} style={{ marginBottom: "24px" }}>
              <Button onClick={this.showModal} type="primary">添加控制器</Button>
            </Col>
            <Col span={24}>
              <Table
                rowKey={record => record.name || record.storageName }
                scroll={{ y: "76vh" }} pagination={false} bordered size="middle"
                columns={this.initColumns(/nas/.test(this.props.location.pathname))}
                dataSource={ dataSource } />
            </Col>
          </Row>
        </Card>
        <Modal
          title="添加控制器"
          okText="确认"
          cancelText="取消"
          visible={this.state.addVisible}
          onOk={this.handleAddOk}
          onCancel={this.handleAddCancel}
        >
          <div style={{maxHeight: "50vh", overflowY: "auto"}}>
            <AddDevice 
              path={this.props.location.pathname} 
              setForm={form => { this.form = form }} />
          </div>
        </Modal>
        <Modal
          title="设备设置"
          okText="确认"
          cancelText="取消"
          visible={this.state.updateVisible}
          onOk={this.handleUpdataOk}
          onCancel={this.handleUpdataCancel}
        >
          <div style={{maxHeight: "50vh", overflowY: "auto"}}>
            <UpdateDevice
              path={this.props.location.pathname}
              dataSource={this.state.updateData}
              setForm={form => { this.form = form }} />
          </div>
        </Modal>
      </Card>
    )
  }
}

export default withRouter(Unit)
