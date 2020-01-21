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
class SwitchZone extends Component {

  state = {
    filters: {
      name: null,
      zoneName: "",
      zoneSetName: "",
      vsanName: ""
    }
  }

  formChange = (zoneName, zoneSetName, vsanName) => {
    Object.assign(this.state.filters,{zoneName, zoneSetName, vsanName})
    this.setState({
      filters: this.state.filters
    }, () => {
      // 获取zone列表
      state.getZoneRefList(this.state.filters.name, zoneName, zoneSetName, vsanName);
    })
  }

  initExtra = () => {
    let dataSource = [
      {
        placeholder: "zone名称",
        optionList: state.zoneRefListByFabricName,
        code: "name",
        value: "name",
        onChange: value => this.formChange(value, this.state.filters.zoneSetName, this.state.filters.vsanName)
      },
      {
        placeholder: "所属zoneset",
        optionList: state.zoneSetListByFabricName,
        code: "zoneSetName",
        value: "zoneSetName",
        onChange: value => this.formChange(this.state.filters.zoneName, value, this.state.filters.vsanName)
      },
      {
        placeholder: "所属VSAN",
        optionList: state.vsanListByFabricName,
        code: "vsanName",
        value: "vsanName",
        onChange: value => this.formChange(this.state.filters.zoneName, this.state.filters.zoneSetName, value)
      },
    ]
    return dataSource.map((item, index) => {
      return <Select
        key={index}
        allowClear={true}
        showSearch
        style={{ width: 140, marginLeft: "10px" }}
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
        title: "zone名称",
        dataIndex: "name",
        width: 150,
        fixed: 'left',
      },
      {
        title: "zone类型",
        dataIndex: "type"
      },
      {
        title: "所属zoneset",
        dataIndex: "zoneSet"
      },
      {
        title: "所属VSAN",
        dataIndex: "vsan"
      },
      {
        title: "所属Fabric",
        dataIndex: "fabric"
      },
      {
        title: "端口 Target wwn",
        dataIndex: "wwn"
      },
      {
        title: "fcid",
        dataIndex: "fcId"
      },
    ];
  }

  UNSAFE_componentWillMount() {
    const { id } = getQueryVariable(this, "id");
    let name = id ? id.split("||")[1] : null;
    if (name) {
      // 获取FABRIC
      state.getFabric(name).then(() => {
        Object.assign(this.state.filters,{name})
        this.setState({
          filters: this.state.filters
        })
      });
      // 获取zone列表
      state.getZoneRefList(name);
      // 获取zone列表根据FabricName
      state.getZoneRefListByFabricName(name);
      // 获取zoneSet列表根据FabricName
      state.getZoneSetListByFabricName(name);
      // 获取vsan列表根据FabricName
      state.getVsanListByFabricName(name);

    } else {
      message.warning('当前页面没有获取正确参数，请点击左侧导航重新获取！');
    }
  }

  render() {
    return (
      <Card bodyStyle={{minHeight: "86vh"}}>
        <Card
          title="基本信息"
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }}
          style={{ marginBottom: "24px" }} >
          <BasicInfo infos={BasicInfoList} dataSource={{"zoneNums": state.zoneRefList.content?.length, ...state.fabricInfo}} />
        </Card>
        <Card
          title={state.menuItem?.title}
          extra={this.initExtra()}
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }} >
          <Table
            rowKey={record => record.name}
            scroll={{ y: "76vh" }} pagination={false} bordered size="middle"
            columns={this.initColumns()}
            dataSource={state.zoneRefList.content} />
        </Card>
      </Card>
    )
  }
}

export default withRouter(SwitchZone)
