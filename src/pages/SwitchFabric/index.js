import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Card, Table, message, Select } from 'antd';
import BasicInfo from "../../components/BasicInfo";
import { BasicInfoList } from "./BasicInfoConfig";
import state from '../../Store';
import { getQueryVariable } from '../../utils/getQueryVariable';

const { Option } = Select;

@observer
class SwitchFabric extends Component {

  state = {
    filters: {
      id: null,
      switchName: "",
      vsanName: ""
    }
  }

  formChange = (switchName, vsanName) => {
    Object.assign(this.state.filters,{switchName, vsanName})
    this.setState({
      filters: this.state.filters
    }, () => {
      // 获取端口关联列表
      state.getPortRefList(this.state.filters.id,switchName, vsanName);
    })
  }

  initExtra = () => {
    let dataSource = [
      {
        placeholder: "设备名称",
        optionList: state.switchListByFabricName,
        code: "switchName",
        value: "switchName",
        onChange: value => this.formChange(value, this.state.filters.vsanName)
      },
      {
        placeholder: "所属VSAN",
        optionList: state.vsanListByFabricName,
        code: "vsanName",
        value: "vsanName",
        onChange: value => this.formChange(this.state.filters.switchName, value)
      },
    ]
    return dataSource.map((item, index) => {
      return <Select
        key={index}
        allowClear={true}
        showSearch
        style={{ width: 150, marginLeft: "10px" }}
        placeholder={item.placeholder}
        optionFilterProp="children"
        onChange={item.onChange}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {
          item.optionList.map((option, optionIndex) => {
          return <Option key={optionIndex} value={option[item.code]}>{option[item.value]}</Option>
          })
        }
      </Select>
    })
  }

  initColumns = () => {
    return [
      {
        title: "设备名称",
        dataIndex: "name",
        width: 150,
        fixed: 'left',
      },
      {
        title: "端口Index",
        dataIndex: "portIndex"
      },
      {
        title: "所属VSAN",
        dataIndex: "vsanName"
      },
      {
        title: "端口类型",
        dataIndex: "type"
      },
      {
        title: "端口速率",
        dataIndex: "rate"
      },
      {
        title: "接入设备WWN",
        dataIndex: "deviceWwn"
      },
      {
        title: "FCID",
        dataIndex: "fcId"
      },
    ];
  }

  UNSAFE_componentWillMount() {
    const { id } = getQueryVariable(this, "id");
    if (id) {
      // 获取FABRIC
      state.getFabric(id).then(() => {
        Object.assign(this.state.filters,{id})
        this.setState({
          filters: this.state.filters
        })
      });
      // 获取端口关联列表
      state.getPortRefList(id);
      // 物理交换机列表根据FabricName
      state.getSwitchListByFabricName(id);
      // 获取vsan列表根据FabricName
      state.getVsanListByFabricName(id);
    } else {
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
          <BasicInfo infos={BasicInfoList} dataSource={state.fabricInfo} />
        </Card>
        <Card
          title="设备关联信息"
          extra={this.initExtra()}
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }} >
          <Table
            rowKey={record => record.storageUnitId}
            scroll={{ y: "76vh" }} pagination={false} bordered size="middle"
            columns={this.initColumns()}
            dataSource={state.portRefList} />
        </Card>
      </Card>
    )
  }
}

export default withRouter(SwitchFabric)
