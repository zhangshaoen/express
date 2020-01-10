import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Input, Button, Table } from "antd";

const { Search } = Input;

class NasStorageDevice extends Component {

  initColumns = () => {
    return [

      {
        title: "设备名称",
        dataIndex: "设备名称"
      },
      {
        title: "设备厂商",
        dataIndex: "设备厂商",
      },
      {
        title: "设备序列号",
        dataIndex: "设备序列号",
      },
      {
        title: "设备型号",
        dataIndex: "设备型号",
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
        title: "设备位置",
        dataIndex: "设备位置"
      },
      {
        title: "初始化容量",
        dataIndex: "初始化容量"
      },
      {
        title: "已分配容量",
        dataIndex: "已分配容量"
      },
      {
        title: "剩余容量",
        dataIndex: "剩余容量"
      },
      {
        title: "存储分配比例",
        dataIndex: "存储分配比例"
      },
      {
        title: "数据同步时间",
        dataIndex: "数据同步时间"
      },
      {
        title: "状态",
        dataIndex: "状态"
      },
      {
        title: "操作",
        dataIndex: "operation",
        fixed: 'right',
        width: 200,
      },
    ]
  }

  goAcquisition = () => {
    this.props.history.replace("/acquisition");
    
  }

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
        title="NAS存储设备管理"
        headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }}>
        <Row style={{marginBottom: "20px"}}>
          <Col span={8}>
            <Search placeholder="请输入关键词" onSearch={value => console.log(value)} enterButton />
          </Col>
          <Col span={6}></Col>
          <Col className="col" span={2}>
            <Button type="primary">导入存储</Button>
          </Col>
          <Col className="col" span={3}>
            <Button onClick={this.goAcquisition} type="primary">定时数据采集</Button>
          </Col>
          <Col className="col" span={3}>
            <Button type="primary">手动数据采集</Button>
          </Col>
          <Col className="col" span={2}>
            <Button type="danger">删除</Button>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ height: "63vh" }}>
            <Table
              scroll={{ y: "76vh", x: 1700 }} pagination={false} bordered size="middle"
              rowSelection={rowSelection}
              columns={this.initColumns()}
              dataSource={[]} />
          </Col>
        </Row>
      </Card>
    );
  }
}

export default withRouter(NasStorageDevice);