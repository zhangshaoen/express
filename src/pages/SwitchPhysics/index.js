import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Card, Table, message } from 'antd';
import BasicInfo from "../../components/BasicInfo";
import { BasicInfoList } from "./BasicInfoConfig";
import state from '../../Store';
import { getQueryVariable } from '../../utils/getQueryVariable';


@observer
class SwitchPhysics extends Component {

  initColumns = () => {
    return [
      {
        title: "交换机名称",
        dataIndex: "switchName",
        width: 150,
        fixed: 'left',
      },
      {
        title: "管理IP",
        dataIndex: "switchIp"
      },
      {
        title: "序列号",
        dataIndex: "sn"
      },
      {
        title: "domain id",
        dataIndex: "domainid"
      },
      {
        title: "角色",
        dataIndex: "identity"
      },
      {
        title: "位置",
        dataIndex: "position"
      },
      {
        title: "端口数量",
        dataIndex: "portSize"
      },
      {
        title: "已使用数量",
        dataIndex: "usedPostSize"
      },
      {
        title: "使用率",
        dataIndex: ""
      },
      {
        title: "未使用数量",
        dataIndex: ""
      },
    ];
  }

  UNSAFE_componentWillMount() {
    const { id } = getQueryVariable(this, "id");
    let name = id.split("||")[1];
    if (name) {

      // 物理交换机列表
      state.getSwitchList(name);

    } else {
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
          <BasicInfo infos={BasicInfoList} dataSource={{}} />
        </Card>
        <Card
          title={state.menuItem.title}
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }} >
          <Table
            rowKey={record => record.storageUnitId}
            scroll={{ y: "76vh", x: 1700 }} pagination={false} bordered size="middle"
            columns={this.initColumns()}
            dataSource={state.deviceSwitchList} />
        </Card>
      </Card>
    )
  }
}

export default withRouter(SwitchPhysics)
