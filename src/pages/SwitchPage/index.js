/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Row, Col, Card, Button, Table, Modal, message, Popconfirm } from 'antd';
import AddOrUpdate from './AddOrUpdate';
import { BasicInfoList } from "./BasicInfoConfig";
import BasicInfo from "../../components/BasicInfo";
import state from '../../Store';
import {getQueryVariable} from '../../utils/getQueryVariable';

@observer
class SwitchPage extends Component {

  state = { 
    dataCenterId: null,
    visible: false,
    type: null,
    typeText: "",
    updateData: {}
  };

  // 编辑
  editRecord = item => {
    item.edit = !item.edit;
    this.forceUpdate();
  }

  // 编辑
  numChange = (value, record, key) => {
    record[key] = value/100;
  }


  showModal = (type, record) => {
    let typeText = null, updateData = {};
    switch(type) {
      case "add":
        typeText = "添加单元";
        updateData = {};
        break;
      case "update":
        typeText = "更新单元";
        updateData = record;
        break;
      default:  
    }
    this.setState({
      visible: true,
      type,
      typeText,
      updateData
    });
  };

  handleOk = e => {
    this.form.validateFields(async (err, values) => {
      this.form.resetFields();
      if (!err) {
        this.setState({
          visible: false,
        }, () => {
          let dataCenterId = this.state.dataCenterId;
          if(this.state.type === "add") {
            let addValues = { dataCenterId, ...values };
            // 添加网络单元
            state.addNetWorkUnit(addValues).then(() => {
              // 获取网络单元列表
              state.getNetWorkUnitList(dataCenterId);
              // 获取所有管理机列表
              state.getManageServerList();
              // 获取所有未分配的FABRIC
              state.getIdleFabricList();
            });
          }else if(this.state.type === "update") {
            for(let key in values) {
              this.state.updateData[key] = values[key];
            }
            let updateValues = toJS(this.state.updateData); 
            state.updateNetWorkUnit(updateValues).then(() => {
              // 获取网络单元列表
              state.getNetWorkUnitList(dataCenterId);
              // 获取所有管理机列表
              state.getManageServerList();
              // 获取所有未分配的FABRIC
              state.getIdleFabricList();
            });
          }

        });
      }
    })
  };

  handleCancel = e => {
    this.form.resetFields()
    this.setState({ visible: false, });
  };

  deleteNetWorkUnit = id => {
    state.switchDeleteNetWorkUnit(id).then(() => {
      // 获取网络单元列表
      state.getNetWorkUnitList(this.state.dataCenterId);
      // 获取所有管理机列表
      state.getManageServerList();
      // 获取所有未分配的FABRIC
      state.getIdleFabricList();
    })
  }

  initColumns = () => {
    return [
      {
        title: "单元名称",
        dataIndex: "name",
        width: 200,
        fixed: 'left',
      },
      {
        title: "厂商",
        dataIndex: "manufacturer"
      },
      {
        title: "所属数据中心",
        dataIndex: "dataCenterName"
      },
      // { title: "部署楼宇", dataIndex: "position" },
      {
        title: "管理机",
        dataIndex: "manageServiceName",
      },
      {
        title: "操作",
        dataIndex: "operation",
        fixed: 'right',
        width: 150,
        render: (text, record) => {
          return <span>
            <Button type="primary" size="small" onClick={record => this.showModal("update", record)} style={{marginRight: "10px"}}>
              编辑
            </Button>
            <Popconfirm title="是否确认删除当前单元？" onConfirm={record => this.deleteNetWorkUnit(record.id)}>
              <Button type="danger" size="small">删除</Button>
            </Popconfirm>
          </span>
        }
      }
    ];
  }

  UNSAFE_componentWillMount() {
    const {id} = getQueryVariable(this, "id");
    if(id) {
      // 获取设备类型信息
      state.getDeviceCategory(id).then(() => {
        this.setState({dataCenterId: id});
      });
      // 获取网络单元列表
      state.getNetWorkUnitList(id);
      // 获取所有管理机列表
      state.getManageServerList();
      // 获取所有未分配的FABRIC
      state.getIdleFabricList();
    }else {
      message.warning('当前页面没有获取正确参数，请点击左侧导航重新获取！');
    }
  }

  render() {
    return (
      <Card bodyStyle={{height: "85.5vh", overflowY: "auto"}}>
        <Card
          title="基本信息"
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }}
          style={{ marginBottom: "24px" }} >
            <BasicInfo infos={BasicInfoList} dataSource={state.switchPageInfo}/>
        </Card>
        <Card
          title={state.menuItem?.title}
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }} >
          <Row type="flex" justify="end">
            <Col span={2.5} style={{ marginBottom: "20px" }}>
              <Button onClick={() => this.showModal("add")} type="primary">添加单元</Button>
            </Col>
            <Col span={24}>
              <Table
                rowKey={record => record.id}
                scroll={{ y: "76vh" }} pagination={false} bordered size="middle"
                columns={this.initColumns()}
                dataSource={state.switchPageList} />
            </Col>
          </Row>
        </Card>
        <Modal
          title={this.state.typeText}
          okText="确认"
          cancelText="取消"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <AddOrUpdate dataSource={this.state.updateData} setForm={form => { this.form = form }} />
        </Modal>
      </Card>
    )
  }
}

export default withRouter(SwitchPage)
