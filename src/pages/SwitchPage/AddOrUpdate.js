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

  initOptions = () => {
    let options = [];
    state.deviceList.forEach((device, index) => {
      options.push(<Option value={device.name} key={index}>{device.name}</Option>);
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

    return (
      <Form {...formItemLayout}>
        <Item label='单元名称:'>
          {getFieldDecorator('name', {
            initialValue: null,
            rules: [{ required: true, message: '请输入单元名称!' }],
          })(<Input />)}
        </Item>
        <Item label='选择厂商:'>
          {
            getFieldDecorator('firm', {
              initialValue: "Brocade",
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
          {getFieldDecorator('storageEquipmentNames', {
            initialValue: [],
          })(<Select mode="multiple"></Select>)}
        </Item>
        <Item label='选择存储管理机:'>
          {getFieldDecorator('manageServiceName', {
            initialValue: "",
          })(<Select>
            {this.initOptions()}
          </Select>)}
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddOrUpdate);