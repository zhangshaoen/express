/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { Form, Select, Radio, Input, InputNumber, Row, Col } from 'antd';
// import state from '../../Store';

const { Item } = Form;
const { Option } = Select;

class AddOrUpdate extends Component {

  initOptions = type => {
    let options = [];
    if (type === "storageName") {
      [{ name: "aa" }]?.forEach((item, index) => {
        options.push(<Option value={item.name} key={index}>{item.name}</Option>);
      });
    } else if (type === "vsanName") {
      [{ name: "aa" }]?.forEach((item, index) => {
        options.push(<Option value={item.name} key={index}>{item.name}</Option>);
      });
    }

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

    let { dataSource } = this.props;
    let { name, storageName, vsanName, initialMbps, initialIops, isUse } = dataSource;

    return (
      <Form {...formItemLayout} >
        <Item label='分组名称:'>
          {getFieldDecorator('name', {
            initialValue: name,
            rules: [{ required: true, message: '请输入分组名称!' }],
          })(<Input />)}
        </Item>
        <Item label='存储名称:'>
          {getFieldDecorator('storageName', {
            initialValue: storageName,
            rules: [{ required: true, message: '请选择存储名称!' }]
          })(<Select mode="multiple">
            {this.initOptions('storageName')}
          </Select>)}
        </Item>
        <Item label='VSAN名称:'>
          {getFieldDecorator('vsanName', {
            initialValue: vsanName,
            rules: [{ required: true, message: '请选择VSAN名称!' }]
          })(<Select mode="multiple">
            {this.initOptions('vsanName')}
          </Select>)}
        </Item>
        <Row>
          <Col span={12}>
            <Item labelCol={{span: 12}} wrapperCol={{span: 12}} label='初始MBPS:'>
              {getFieldDecorator('initialMbps', {
                initialValue: initialMbps,
                rules: [{ required: true, message: '请输入初始MBPS!' }]
              })(<InputNumber min={0} step={0.1} />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item labelCol={{span: 12}} wrapperCol={{span: 12}} label='初始IOPS:'>
              {getFieldDecorator('initialIops', {
                initialValue: initialIops,
                rules: [{ required: true, message: '请输入初始IOPS!' }]
              })(<InputNumber min={0} step={0.1} />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item  labelCol={{span: 12}} wrapperCol={{span: 12}}label='状态:'>
              {
                getFieldDecorator('isUse', {
                  initialValue: isUse || "Y",
                  rules: [{ required: true, message: '请选择状态!' }]
                })(
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="Y">是</Radio.Button>
                    <Radio.Button value="N">否</Radio.Button>
                  </Radio.Group>
                )
              }
            </Item>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(AddOrUpdate);