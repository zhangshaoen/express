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

  initExtra = () => {
    let dataSource = [
      {
        placeholder: "zone名称",
        optionList: [{ code: "jsck", value: "Jack" }, { code: "lucy", value: "Lucy" }, { code: "tom", value: "Tom" },],
        code: "code",
        value: "value",
        onChange: value => console.log(`zone名称selected ${value}`)
      },
      {
        placeholder: "所属zoneset",
        optionList: [{ code: "vfjsck", value: "VF-Jack" }, { code: "vflucy", value: "VF-Lucy" }, { code: "vftom", value: "VF-Tom" },],
        code: "code",
        value: "value",
        onChange: value => console.log(`所属zonesetselected ${value}`)
      },
      {
        placeholder: "所属vf",
        optionList: [{ code: "jsck", value: "Jack" }, { code: "lucy", value: "Lucy" }, { code: "tom", value: "Tom" },],
        code: "code",
        value: "value",
        onChange: value => console.log(`所属vfselected ${value}`)
      },
      {
        placeholder: "所属交换机名称",
        optionList: [{ code: "vfjsck", value: "VF-Jack" }, { code: "vflucy", value: "VF-Lucy" }, { code: "vftom", value: "VF-Tom" },],
        code: "code",
        value: "value",
        onChange: value => console.log(`所属交换机名称selected ${value}`)
      },
      {
        placeholder: "交换机端口",
        optionList: [{ code: "vfjsck", value: "VF-Jack" }, { code: "vflucy", value: "VF-Lucy" }, { code: "vftom", value: "VF-Tom" },],
        code: "code",
        value: "value",
        onChange: value => console.log(`交换机端口selected ${value}`)
      },
      {
        placeholder: "系统名称",
        optionList: [{ code: "vfjsck", value: "VF-Jack" }, { code: "vflucy", value: "VF-Lucy" }, { code: "vftom", value: "VF-Tom" },],
        code: "code",
        value: "value",
        onChange: value => console.log(`系统名称selected ${value}`)
      },
      {
        placeholder: "设备名称",
        optionList: [{ code: "vfjsck", value: "VF-Jack" }, { code: "vflucy", value: "VF-Lucy" }, { code: "vftom", value: "VF-Tom" },],
        code: "code",
        value: "value",
        onChange: value => console.log(`设备名称selected ${value}`)
      }
    ]
    return dataSource.map((item, index) => {
      return <Select
        key={index}
        showSearch
        style={{ width: 120, marginLeft: "10px" }}
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
        dataIndex: "",
        width: 150,
        fixed: 'left',
      },
      {
        title: "zone类型",
        dataIndex: "manufacturer"
      },
      {
        title: "所属网络",
        dataIndex: "dataCenter"
      },
      {
        title: "所属zoneset",
        dataIndex: "deploymentLocation"
      },
      {
        title: "所属vf",
        dataIndex: ""
      },
      {
        title: "所属Fabric",
        dataIndex: ""
      },
      {
        title: "交换机名称",
        dataIndex: ""
      },
      {
        title: "交换机端口",
        dataIndex: ""
      },
      {
        title: "端口 Target wwn",
        dataIndex: ""
      },
      {
        title: "fcid",
        dataIndex: ""
      },
      {
        title: "系统名称",
        dataIndex: ""
      },
      {
        title: "设备名称",
        dataIndex: ""
      },
      {
        title: "端口名称",
        dataIndex: ""
      },
    ];
  }

  UNSAFE_componentWillMount() {
    const { id } = getQueryVariable(this, "id");
    let name = id.split("||")[1];
    if (name) {


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
          <BasicInfo infos={BasicInfoList} dataSource={state.unitBasicInfo} />
        </Card>
        <Card
          title={state.menuItem.title}
          extra={this.initExtra()}
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }} >
          <Table
            rowKey={record => record.storageUnitId}
            scroll={{ y: "76vh", x: 1700 }} pagination={false} bordered size="middle"
            columns={this.initColumns()}
            dataSource={state.unitList} />
        </Card>
      </Card>
    )
  }
}

export default withRouter(SwitchZone)
