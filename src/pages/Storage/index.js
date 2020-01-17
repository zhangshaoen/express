import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Card, Table, message } from 'antd';
import state from '../../Store';
import {getQueryVariable} from '../../utils/getQueryVariable';
import {typeJudgment} from "../../utils/typeJudgment"


@observer
class Storage extends Component {

  initColumns = () => {
    return [
      {
        title: "资源池名",
        dataIndex: "fullName"
      },
      {
        title: "数据中心",
        dataIndex: "dataCenterName"
      },
      {
        title: "当前容量分配比例",
        dataIndex: "currentAllocatedCapacityRatio",
        render: (text, record) => <span>{typeJudgment(text) === "number" ? `${(text * 100)}%` : 0}</span>,
      },
      {
        title: "当前MBPS分配比例",
        dataIndex: "currentAllocatedMBPSRatio",
        render: (text, record) => <span>{typeJudgment(text) === "number" ? `${(text * 100)}%` : 0}</span>,
      },
      {
        title: "当前IOPS分配比例",
        dataIndex: "currentAllocatedIOPSRatio",
        render: (text, record) => <span>{typeJudgment(text) === "number" ? `${(text * 100)}%` : 0}</span>,
      }
    ];
  }

  UNSAFE_componentWillMount() {
    const {id} = getQueryVariable(this, "id");
    if(id) {
      // 根据 ID 获取NAS存储列表 
      state.getStorageListByDeviceCategory(id);
    }else {
      message.warning('当前页面没有获取正确参数，请点击左侧导航重新获取！');
    }
  }

  render() {
    return (
      <Card title={state.menuItem.title} headStyle={{backgroundColor: "rgba(244, 247, 253, 1)"}} bodyStyle={{minHeight: "77.5vh"}}>
        <Table
          rowKey={record => record.id}
          scroll={{ y: "75vh", }} pagination={false} bordered size="middle"
          columns={this.initColumns()}
          dataSource={state.storageList} />
      </Card>
    );
  }
}

export default withRouter(Storage)