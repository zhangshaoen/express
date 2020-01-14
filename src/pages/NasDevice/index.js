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
      // {
      //   title: "序号",
      //   dataIndex: "序号",
      //   fixed: 'left',
      //   width: 50
      // },
      {
        title: "存储卷",
        dataIndex: "存储卷",
        fixed: 'left',
        width: 150
      },
      {
        title: "总可用容量",
        dataIndex: "capacity"
      },
      {
        title: "已分配容量",
        dataIndex: "usedCapacity"
      },
      {
        title: "预分配容量",
        dataIndex: "预分配容量"
      },
      {
        title: "分配比例",
        dataIndex: "分配比例"
      },
      {
        title: "剩余容量",
        dataIndex: "剩余容量"
      },
      {
        title: "是否可用",
        dataIndex: "是否可用"
      },
      {
        title: "备注",
        dataIndex: "备注"
      }
    ]
  }

  UNSAFE_componentWillMount() {
    const {id} = getQueryVariable(this, "id");
    if(id) {
      // 根据 ID 存储控制器页面基本信息查询
      state.getNasStorageControlInfoByName(id);
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
          title={state.menuItem?.title}
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }}
          style={{ marginBottom: "24px" }} >
          <Table
            scroll={{ y: "76vh", x: 1500 }} pagination={false} bordered size="middle"
            columns={this.initColumns()}
            dataSource={state.nasDeviceList} />
        </Card>
        {/* <Card
          title="控制器信息"
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }}>
          <Table
            scroll={{ y: "76vh", x: 1500 }} bordered size="middle"
            columns={controller}
            dataSource={[]} />
        </Card> */}
      </Card>
    )
  }
}

export default withRouter(NasDevice)
