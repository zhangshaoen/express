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

  initExtra = () => {
    let dataSource = [
      {
        placeholder: "设备名称",
        optionList: [{ code: "jsck", value: "Jack" }, { code: "lucy", value: "Lucy" }, { code: "tom", value: "Tom" },],
        code: "code",
        value: "value",
        onChange: value => console.log(`设备名称selected ${value}`)
      },
      {
        placeholder: "VF名称",
        optionList: [{ code: "vfjsck", value: "VF-Jack" }, { code: "vflucy", value: "VF-Lucy" }, { code: "vftom", value: "VF-Tom" },],
        code: "code",
        value: "value",
        onChange: value => console.log(`VF名称selected ${value}`)
      },
      {
        placeholder: "端口类型",
        optionList: [{ code: "jsck", value: "Jack" }, { code: "lucy", value: "Lucy" }, { code: "tom", value: "Tom" },],
        code: "code",
        value: "value",
        onChange: value => console.log(`端口类型selected ${value}`)
      },
      {
        placeholder: "关联设备名称",
        optionList: [{ code: "vfjsck", value: "VF-Jack" }, { code: "vflucy", value: "VF-Lucy" }, { code: "vftom", value: "VF-Tom" },],
        code: "code",
        value: "value",
        onChange: value => console.log(`关联设备名称selected ${value}`)
      }
    ]
    return dataSource.map((item, index) => {
      return <Select
        key={index}
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
        dataIndex: "",
        width: 150,
        fixed: 'left',
      },
      {
        title: "端口Index",
        dataIndex: "manufacturer"
      },
      {
        title: "端口号",
        dataIndex: "dataCenter"
      },
      {
        title: "所属vsan/vf",
        dataIndex: "deploymentLocation"
      },
      {
        title: "端口类型",
        dataIndex: ""
      },
      {
        title: "端口速率",
        dataIndex: ""
      },
      {
        title: "端口分配率",
        dataIndex: ""
      },
      {
        title: "连接的wwn",
        dataIndex: ""
      },
      {
        title: "fcid",
        dataIndex: ""
      },
      {
        title: "关联设备名称",
        dataIndex: ""
      },
      {
        title: "关联设备端口",
        dataIndex: ""
      },
    ];
  }

  UNSAFE_componentWillMount() {
    const { id } = getQueryVariable(this, "id");
    if (id) {
      // 获取FABRIC
      state.getFabric(id);
      // 获取端口关联列表
      state.getPortRefList(id);
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
          <BasicInfo infos={BasicInfoList} dataSource={state.fabricInfo} />
        </Card>
        <Card
          title={state.menuItem.title}
          extra={this.initExtra()}
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }} >
          <Table
            rowKey={record => record.storageUnitId}
            scroll={{ y: "76vh", x: 1500 }} pagination={false} bordered size="middle"
            columns={this.initColumns()}
            dataSource={state.portRefList} />
        </Card>
      </Card>
    )
  }
}

export default withRouter(SwitchFabric)
