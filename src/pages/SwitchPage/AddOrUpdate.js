import React, { Component } from 'react';
import { Form, Select, Radio, Input } from 'antd';
import state from '../../Store';

const { Item } = Form;
const { Option } = Select;

class AddOrUpdate extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
  }

  initOptions = (list, type) => {
    let key = null;
    if(type === "fabric") {
      key = "fabricName"
    }else if(type === "manage") {
      key = "name"
    }
    let options = [];
    list.forEach((device, index) => {
      options.push(<Option value={device[key]} key={index}>{device[key]}</Option>);
    });
    return options;
  }

  UNSAFE_componentWillMount() {
    // 将form对象通过setForm方法传递给父组件
    this.props.setForm(this.props.form);

  }

  render() {

    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      },
    };

    const { getFieldDecorator } = this.props.form;
    let { dataSource } = this.props;
    let { name, manufacturer, fabricList, manageServiceName } =dataSource;
    return (
      <Form {...formItemLayout}>
        <Item label='单元名称:'>
          {getFieldDecorator('name', {
            initialValue: name,
            rules: [{ required: true, message: '请输入单元名称!' }],
          })(<Input />)}
        </Item>
        <Item label='选择厂商:'>
          {
            getFieldDecorator('manufacturer', {
              initialValue: manufacturer || "Brocade",
              rules: [{ required: true }]
            })(
              <Radio.Group>
                <Radio value="Brocade">Brocade</Radio>
                <Radio value="Cisco">Cisco</Radio>
              </Radio.Group>
            )
          }
        </Item>
        <Item label='选择设备:'>
          {getFieldDecorator('fabricList', {
            initialValue: fabricList,
          })(<Select mode="multiple">
            {this.initOptions(state.idleFabricList, "fabric")}
          </Select>)}
        </Item>
        <Item label='选择存储管理机:'>
          {getFieldDecorator('manageServiceName', {
            initialValue: manageServiceName,
          })(<Select>
            {this.initOptions(state.manageServerList, "manage")}
          </Select>)}
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddOrUpdate);