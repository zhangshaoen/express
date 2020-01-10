import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Card, Table, message } from 'antd';
import BasicInfo from "../../components/BasicInfo";
import { BasicInfoList } from "./BasicInfoConfig";
import state from '../../Store';
import {getQueryVariable} from '../../utils/getQueryVariable';


@observer
class SwitchUnit extends Component {

  initColumns = () => {
    return [
      {
        title: "所属Fabric",
        dataIndex: "",
        width: 150,
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
        title: "VF名称",
        dataIndex: ""
      },
      {
        title: "端口数量",
        dataIndex: ""
      },
      {
        title: "端口分配率",
        dataIndex: ""
      },
      {
        title: "状态置换",
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
    ]
  }

  UNSAFE_componentWillMount() {
    const {id} = getQueryVariable(this, "id");
    if(id) {
      // 获取网络单元信息
      state.getNetWorkUnit(id);


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
            <BasicInfo infos={BasicInfoList} dataSource={state.switchUnitInfo}/>
        </Card>
        <Card
          title={state.menuItem.title}
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }} >
            <Table
                rowKey={record => record.storageUnitId}
                scroll={{ y: "76vh", x: 1500 }} pagination={false} bordered size="middle"
                columns={this.initColumns()}
                dataSource={state.switchUnitList} />
        </Card>
      </Card>
    )
  }
}

export default withRouter(SwitchUnit)
