/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
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
    visible: false,
    type: null,
    typeText: "",
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
    let typeText;
    switch(type) {
      case "add":
        typeText = "添加单元";
        break;
      case "update":
        typeText = "更新单元"
        break;
      default:  
    }
    this.setState({
      visible: true,
      type,
      typeText
    });
  };

  handleOk = e => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          visible: false,
        }, () => {
          
        });
      }
    })
  };

  handleCancel = e => {
    this.form.resetFields()
    this.setState({ visible: false, });
  };

  initColumns = () => {
    return [
      {
        title: "单元名称",
        dataIndex: "name",
        width: 200,
        fixed: 'left',
      },
      {
        title: "设备名称",
        dataIndex: "fabricNames",
        render: (text, record) => {
          record.fabricList?.map((fabric, index) => {
            return <span key={index}>{fabric.fabricName}</span>
          })
        }
      },
      {
        title: "厂商",
        dataIndex: "firm"
      },
      {
        title: "所属数据中心",
        dataIndex: "dataCenterName"
      },
      {
        title: "部署楼宇",
        dataIndex: "deploymentLocation"
      },
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
            <Popconfirm title="是否确认删除当前单元？" onConfirm={record => state.switchDeleteNetWorkUnit(record.id)}>
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
      state.getDeviceCategory(id);
      // 获取网络单元列表
      state.getNetWorkUnitList(id);
    }else {
      message.warning('当前页面没有获取正确参数，请点击左侧导航重新获取！');
    }
  }

  render() {
    return (
      <Card bodyStyle={{height: "85.5vh"}}>
        <Card
          title="基本信息"
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }}
          style={{ marginBottom: "24px" }} >
            <BasicInfo infos={BasicInfoList} dataSource={state.switchPageInfo}/>
        </Card>
        <Card
          title={state.menuItem.title}
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }} >
          <Row type="flex" justify="end">
            <Col span={2.5} style={{ marginBottom: "20px" }}>
              <Button onClick={() => this.showModal("add")} type="primary">添加单元</Button>
            </Col>
            <Col span={24}>
              <Table
                rowKey={record => record.id}
                scroll={{ y: "76vh", x: 1700 }} pagination={false} bordered size="middle"
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
          <AddOrUpdate setForm={form => { this.form = form }} />
        </Modal>
      </Card>
    )
  }
}

export default withRouter(SwitchPage)
