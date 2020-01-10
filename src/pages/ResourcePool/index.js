import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Card, Table, message } from 'antd';
import Medal from '../../components/Medal';
import "./index.less";
import {getQueryVariable} from '../../utils/getQueryVariable';
import state from '../../Store';

@observer
class ResourcePool extends Component {

  initColumns = () => {
    return [
      {
        title: "资源池名",
        dataIndex: "fullName"
      },
      {
        title: "单元数",
        dataIndex: "resourceTotal"
      },
      {
        title: "数据中心",
        dataIndex: "dataCenterName"
      },
      {
        title: "当前容量分配比例",
        dataIndex: "currentAllocatedCapacityRatio",
        render: (text, record) => <span>{`${text * 100}%`}</span>
      },
      {
        title: "当前MBPS分配比例",
        dataIndex: "currentAllocatedMBPSRatio",
        render: (text, record) => <span>{`${text * 100}%`}</span>
      },
      {
        title: "当前IOPS分配比例",
        dataIndex: "currentAllocatedIOPSRatio",
        render: (text, record) => <span>{`${text * 100}%`}</span>
      }
    ];
  }

  UNSAFE_componentWillMount() {
    const {id} = getQueryVariable(this, "id");
    if(id) {
      // 根据 ID 获取存储资源池页面资源池信息（含所有存储级别）查询
      state.getStorageLevelInfoByStorageResourcePool(id);
      // 根据 ID 获取存储资源池页面存储设备级别命名查询
      state.getStorageLevelNameByStorageResourcePool(id);
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
          bodyStyle={{ paddingBottom: "0" }}>
            <Medal dataSource={state.resourcePoolInfo}/>
        </Card>
        <Card
          title={state.menuItem.title}
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }}>
          <Table
            rowKey={record => record.id}
            scroll={{ y: "75vh", }} pagination={false} bordered size="middle"
            columns={this.initColumns()}
            dataSource={state.resourcePoolList} />
        </Card>
      </Card>
    )
  }
}

export default withRouter(ResourcePool)
