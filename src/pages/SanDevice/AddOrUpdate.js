/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { Form, Select, Radio, Input, InputNumber } from 'antd';
// import state from '../../Store';

const { Item } = Form;
const { Option } = Select;

class AddOrUpdate extends Component {

  initOptions = () => {
    let options = [];    
    [{name: "aa"}]?.forEach((item, index) => {
      options.push(<Option value={item.name} key={index}>{item.name}</Option>);
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
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };

    const { getFieldDecorator } = this.props.form;

    // let { dataSource } = this.props;
    // let {  } = dataSource;

    return (
      <Form {...formItemLayout} >
        <Item label='分组名称:'>
          {getFieldDecorator('name', {
            initialValue: null,
            rules: [{ required: true, message: '请输入序号!' }],
          })(<Input  />)}
        </Item>
        <Item label='存储名称:'>
          {getFieldDecorator('storageName', {
            initialValue: [],
            rules: [{ required: true, message: '请选择Fabric1-Port!' }]
          })(<Select mode="multiple">
            {this.initOptions()}
          </Select>)}
        </Item>
        <Item label='VSAN名称:'>
          {getFieldDecorator('vsanName', {
            initialValue: [],
            rules: [{ required: true, message: '请选择Fabric1-Port!' }]
          })(<Select mode="multiple">
            {this.initOptions()}
          </Select>)}
        </Item>
        <Item label='初始MBPS:'>
          {getFieldDecorator('initialMbps', {
            initialValue: [],
            rules: [{ required: true, message: '请选择Fabric1-Port!' }]
          })(<InputNumber min={0} step={0.1} />)}
        </Item>
        <Item label='初始IOPS:'>
          {getFieldDecorator('initialIops', {
            initialValue: [],
            rules: [{ required: true, message: '请选择Fabric1-Port!' }]
          })(<InputNumber min={0} step={0.1} />)}
        </Item>
        <Item label='状态:'>
          {
            getFieldDecorator('isUse', {
              initialValue: "Y",
              rules: [{ required: true, message: '请选择状态!' }]
            })(
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="Y">是</Radio.Button>
                <Radio.Button value="N">否</Radio.Button>
              </Radio.Group>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddOrUpdate);