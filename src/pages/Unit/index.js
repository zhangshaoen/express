import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Row, Col, Card, Button, Table, Modal, message, Popconfirm } from 'antd';
import AddDevice from './AddDevice';
import UpdateDevice from './UpdateDevice';
import BasicInfo from "../../components/BasicInfo";
import ProgressInfo from "../../components/ProgressInfo";
import { BasicInfoList, CapacityList, MBPSList, IOPSList } from "./BasicInfoConfig";
import state from '../../Store';
import {getQueryVariable} from '../../utils/getQueryVariable';


@observer
class Unit extends Component {

  state = { 
    addVisible: false,
    updateVisible: false,
  };

  showModal = (type, item) => {
    type === "update" ? this.setState({
      updateVisible: true,
    }, () => {
      // 编辑

    }) : this.setState({
      addVisible: true,
    }, () => {
      // 新增

    }) 
  };

  handleAddOk = e => {
    this.form.validateFields(async (err, values) => {
			if (!err) {
				this.setState({
          addVisible: false,
        }, () => {
          // state.addStorageControl("storageControlName" ,values);
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
			if (!err) {
				this.setState({
          updateVisible: false,
        }, () => {
          state.updateStorageControl(values);
        });
			}
		})    
  };

  handleUpdataCancel = e => {
    this.form.resetFields()
    this.setState({ updateVisible: false, });
  };


  initColumns = flag => {
    let columns = [
      {
        title: "设备名称",
        dataIndex: "name",
        width: 200,
        fixed: 'left',
      },
      {
        title: "厂商",
        dataIndex: "firm"
      },
      {
        title: "所属数据中心",
        dataIndex: "dataCenter"
      },
      {
        title: "部署楼宇",
        dataIndex: "deploymentLocation"
      },
      {
        title: "管理机",
        dataIndex: "manageServiceId"
      },
      {
        title: "服务状态",
        dataIndex: "status",
        render: (text, record) => {
          switch(text) {
            case "Y":
              return <span style={{color: "#2FC25B"}}>正常服务</span>
            case "N":
              return <span style={{color: "rgba(252, 75, 108, 1)"}}>正常服务</span>
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
						<Button onClick={(record) => this.showModal("update", record)} type='primary' size="small" style={{marginRight: "10px"}}>编辑</Button>
            <Popconfirm title="是否确认删除当前设备？" onConfirm={() => state.deleteStorageControl(record)}>
						  <Button type='danger' size="small">删除</Button>
            </Popconfirm>
					</span>
				)
      },
    ];

    if(flag) {
      columns.splice(5, 0, {
        title: "是否可做心跳盘",
        dataIndex: "isHeart",
        render: (text, record) => <span>{`${text === "Y" ? "是" : text === "N" ? "否" : null }`}</span>,
      })
    }

    return columns;
  }

  UNSAFE_componentWillMount() {
    const {id} = getQueryVariable(this, "id");
    if(id) {
      // 根据 ID 获取存储单元页面基本信息查询
      state.getStorageUnitInfoById(id);
      // 根据 ID 获取存储单元页面存储控制器列表查询
      state.getStorageControlListByStorageUnit(id);
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
            <BasicInfo infos={BasicInfoList} dataSource={state.unitBasicInfo}/>
            <ProgressInfo
              title="容量"
              titColor="blue"
              infos={CapacityList}
              proportion={{total: "initialCapacity", part: "allocatedCapacity"}} 
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
              proportion={{total: "initialMbps", part: "usedMbps"}}
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
              proportion={{total: "initialIops", part: "usedIops"}}
              dataSource={{
                initialIops: state.unitBasicInfo.initialIops, 
                usedIops: state.unitBasicInfo.usedIops,
                iopsMaxAllocationRatio: state.unitBasicInfo.iopsMaxAllocationRatio,
                iopsAllocationRatio: state.unitBasicInfo.iopsAllocationRatio
                }} />
        </Card>
        <Card
          title={state.menuItem.title}
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }} >
          <Row type="flex" justify="end">
            <Col span={3} style={{marginBottom: "24px"}}>
              <Button onClick={this.showModal} type="primary">添加单元</Button>
            </Col>
            <Col span={24}>
              <Table
                rowKey={record => record.storageUnitId}
                scroll={{ y: "76vh", x: 1500 }} pagination={false} bordered size="middle"
                columns={this.initColumns(/nas/.test(this.props.location.pathname))}
                dataSource={state.unitList} />
            </Col>
          </Row>
        </Card>
        <Modal
          title="添加单元"
          okText="确认"
          cancelText="取消"
          visible={this.state.addVisible}
          onOk={this.handleAddOk}
          onCancel={this.handleAddCancel}
        >
          <AddDevice  setForm={form => { this.form = form }} />
        </Modal>
        <Modal
          title="设备设置"
          okText="确认"
          cancelText="取消"
          visible={this.state.updateVisible}
          onOk={this.handleUpdataOk}
          onCancel={this.handleUpdataCancel}
        >
          <UpdateDevice  setForm={form => { this.form = form }} />
        </Modal>
      </Card>
    )
  }
}

export default withRouter(Unit)
