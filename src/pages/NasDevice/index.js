import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Card,  Table, message } from 'antd';
import BasicInfo from "../../components/BasicInfo";
import ProgressInfo from "../../components/ProgressInfo";
import { BasicInfoList, CapacityList, MBPSList, IOPSList } from "./BasicInfoConfig";
import "../../assets/less/index.less";
import state from '../../Store';
import {getQueryVariable} from '../../utils/getQueryVariable';

@observer
class NasDevice extends Component {

  initColumns = () => {
    return [
      {
        title: "存储卷",
        dataIndex: "name",
        fixed: 'left',
        width: 150
      },
      {
        title: "INODE",
        dataIndex: "inode"
      },
      {
        title: "MBPS",
        dataIndex: "mbps"
      },
      {
        title: "IOPS",
        dataIndex: "iops"
      },
      {
        title: "总可用容量",
        dataIndex: "capacity"
      },
      {
        title: "预分配容量",
        dataIndex: "beforeAllocatedCapacity"
      },
      {
        title: "已分配容量",
        dataIndex: "usedCapacity"
      },
      {
        title: "控制器名称",
        dataIndex: "controlName"
      },
      {
        title: "是否可用",
        dataIndex: "state",
        render: text => text === "Y" ? "是" : text === "N" ? "否" : null 
      },
    ]
  }

  UNSAFE_componentWillMount() {
    let {id} = getQueryVariable(this, "id");
    if(id) { 
      // 根据 ID 存储控制器页面基本信息查询
      state.getStorageControlInfoByName(id);
      // 根据 ID 存储控制器页面NAS卷列表查询
      state.getNasVolumeListByStorageControl(id);
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
          <BasicInfo infos={BasicInfoList} dataSource={state.nasDeviceInfo} />
          <ProgressInfo
            title="容量"
            titColor="blue"
            infos={CapacityList}
            proportion={{ total: "initialCapacity", part: "allocatedCapacity" }}
            dataSource={{ 
              initialCapacity: state.nasDeviceInfo.initialCapacity, 
              allocatedCapacity: state.nasDeviceInfo.allocatedCapacity,
              capacityMaxAllocationRatio: state.nasDeviceInfo.capacityMaxAllocationRatio,
              capacityAllocationRatio: state.nasDeviceInfo.capacityAllocationRatio
            }} />
          <ProgressInfo
            title="MBPS"
            titColor="green"
            infos={MBPSList}
            proportion={{ total: "initialMbps", part: "usedMbps" }}
            dataSource={{ 
              initialMbps: state.nasDeviceInfo.initialMbps, 
              usedMbps: state.nasDeviceInfo.usedMbps,
              mbpsMaxAllocationRatio: state.nasDeviceInfo.mbpsMaxAllocationRatio,
              mbpsAllocationRatio: state.nasDeviceInfo.mbpsAllocationRatio
            }} />
          <ProgressInfo
            title="IOPS"
            titColor="orange"
            infos={IOPSList}
            proportion={{ total: "initialIops", part: "usedIops" }}
            dataSource={{ 
              initialIops: state.nasDeviceInfo.initialIops, 
              usedIops: state.nasDeviceInfo.usedIops,
              iopsMaxAllocationRatio: state.nasDeviceInfo.iopsMaxAllocationRatio,
              iopsAllocationRatio: state.nasDeviceInfo.iopsAllocationRatio
            }} />
        </Card>
        <Card
          title="存储卷"
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }}
          style={{ marginBottom: "24px" }} >
          <Table
            rowKey={record => record.name}
            scroll={{ y: "76vh", x: 1500 }} pagination={false} bordered size="middle"
            columns={this.initColumns()}
            dataSource={state.nasDeviceList} />
        </Card>
      </Card>
    )
  }
}

export default withRouter(NasDevice)
