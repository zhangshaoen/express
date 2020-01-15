import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Input, Button, Table, Modal, Popconfirm } from "antd";
import AddOrUpdate from './AddOrUpdate';

const { Search } = Input;

class StorageManagement extends Component {
  state = { 
    visible: false,
    type: null,
    typeText: "",
  }

  initColumns = () => {
    return [
      {
        title: "管理机名称",
        dataIndex: "管理机名称"
      },
      {
        title: "序列号",
        dataIndex: "序列号",
      },
      {
        title: "管理IP",
        dataIndex: "管理IP",
      },
      {
        title: "操作系统",
        dataIndex: "操作系统",
      },
      {
        title: "数据中心",
        dataIndex: "数据中心"
      },
      {
        title: "部署位置",
        dataIndex: "部署位置"
      },
      {
        title: "支持存储设备类型",
        dataIndex: "支持存储设备类型"
      },
      {
        title: "备注",
        dataIndex: "备注"
      },
      {
        title: "操作",
        dataIndex: "operation",
        fixed: 'right',
        width: 200,
        render: (text, record) => (
          <div>
            <Button type="primary" size="small" onClick={record => this.showModal("update", record)}>编辑</Button>
            <Popconfirm title="是否确认删除当前管理机？" onConfirm={record => {}}>
              <Button type="danger" size="small">删除</Button>
            </Popconfirm>
          </div>
        )
      },
    ]
  }

  showModal = (type, record) => {
    let typeText;
    switch(type) {
      case "add":
        typeText = "增加管理机";
        break;
      case "update":
        typeText = "更新管理机"
        break;
      default:  
    }
    this.setState({
      visible: true,
      type,
      typeText
    });
  }

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

  render() {

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    return (
      <Card
        title="存储管理机管理"
        headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }}>
        <Row style={{ marginBottom: "20px" }}>
          <Col span={8}>
            <Search placeholder="请输入关键词" onSearch={value => console.log(value)} enterButton />
          </Col>
          <Col span={12}></Col>
          <Col className="col" span={2}>
            <Button type="primary" onClick={() => this.showModal("add")}>增加</Button>
          </Col>
          <Col className="col" span={2}>
            <Button type="danger">删除</Button>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ height: "63vh" }}>
            <Table
              scroll={{ y: "60vh", x: 1700 }} pagination={false} bordered size="middle"
              rowSelection={rowSelection}
              columns={this.initColumns()}
              dataSource={[]} />
          </Col>
        </Row>
        <Modal
          title={this.state.typeText}
          width="80%"
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

export default withRouter(StorageManagement)
