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
        placeholder: "所属vsan",
        optionList: [{ code: "jsck", value: "Jack" }, { code: "lucy", value: "Lucy" }, { code: "tom", value: "Tom" },],
        code: "code",
        value: "value",
        onChange: value => console.log(`所属vfselected ${value}`)
      },
    ]
    return dataSource.map((item, index) => {
      return <Select
        key={index}
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
        title: "所属vs",
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
      state.getFabric(name);

      state.getZoneRefList(name);

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
          <BasicInfo infos={BasicInfoList} dataSource={{"zoneNums": state.zoneRefList.content?.length, ...state.fabricInfo}} />
        </Card>
        <Card
          title={state.menuItem?.title}
          extra={this.initExtra()}
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }} >
          <Table
            rowKey={record => record.storageUnitId}
            scroll={{ y: "76vh" }} pagination={false} bordered size="middle"
            columns={this.initColumns()}
            dataSource={state.zoneRefList.content} />
        </Card>
      </Card>
    )
  }
}

export default withRouter(SwitchZone)
