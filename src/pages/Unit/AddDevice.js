/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { Form, Select, Radio, Input, InputNumber, Row, Col } from 'antd';
import state from '../../Store';

const { Item } = Form;
const { Option } = Select;


class AddDevice extends Component {

  isNasFormItem = (path, getFieldDecorator) => {
    if (/nas/.test(path)) {
      return (
        <Row>
          <Col span={24}>
            <Item label='控制器类别:'>
              {getFieldDecorator('type', {})
                (<Input />)}
            </Item>
          </Col>
          <Col span={24}>
            <Item label='控制器型号:'>
              {getFieldDecorator('model', {})
                (<Input />)}
            </Item>
          </Col>
          <Col span={24}>
            <Item label='位置:'>
              {getFieldDecorator('position', {})
                (<Input />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item label='是否可做心跳盘:' labelCol={{span: 12}} wrapperCol={{span: 12}}>
              {getFieldDecorator('isHeart', {
                initialValue: "Y",
              })(
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="Y">是</Radio.Button>
                  <Radio.Button value="N">否</Radio.Button>
                </Radio.Group>
              )}
            </Item>
          </Col>
          <Col span={12}>
            <Item label='初始INODE:' labelCol={{span: 12}} wrapperCol={{span: 12}}>
              {getFieldDecorator('initialInode', {})
                (<InputNumber min={0} step={0.1} />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item label='初始容量:' labelCol={{span: 12}} wrapperCol={{span: 12}}>
              {getFieldDecorator('initialCapacity', {})
                (<InputNumber min={0} step={0.1} />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item label='初始MBPS:' labelCol={{span: 12}} wrapperCol={{span: 12}}>
              {getFieldDecorator('initialMbps', {})
                (<InputNumber min={0} step={0.1} />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item label='初始IOPS:' labelCol={{span: 12}} wrapperCol={{span: 12}}>
              {getFieldDecorator('initialIops', {})
                (<InputNumber min={0} step={0.1} />)}
            </Item>
          </Col>
        </Row>
      )
    } else {
      return null
    }
  }

  multipleOptions = path => {
    let options = [];
    if (/nas/.test(path)) {
      state.nassTorageControlList?.forEach((item, index) => {
        options.push(<Option value={item.name} key={index}>{item.name}</Option>);
      });
    } else if (/san/.test(path)) {
      state.freeSanStorageList?.forEach((item, index) => {
        options.push(<Option value={item.storageName} key={index}>{item.storageName}</Option>);
      });
    }
    return options;
  }

  UNSAFE_componentWillMount() {
    // 将form对象通过setForm方法传递给父组件
    this.props.setForm(this.props.form)
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
    const { path } = this.props;
    let name = /nas/.test(path) ? "name" : /san/.test(path) ? "storageName" : "";
    return (
      <Form {...formItemLayout}>
        <Item label='设备名称:'>
          {getFieldDecorator(name, {
            initialValue: null,
            rules: [{ required: true, message: '请输入设备名称!' }],
          })(<Select>
            {this.multipleOptions(path)}
          </Select>)}
        </Item>
        <Item label='服务状态:'>
          {
            getFieldDecorator('status', {
              initialValue: "Y",
              rules: [{ required: true }]
            })(
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="Y">正常服务</Radio.Button>
                <Radio.Button value="N">维护状态</Radio.Button>
              </Radio.Group>
            )
          }
        </Item>
        {this.isNasFormItem(path, getFieldDecorator)}
      </Form>
    )
  }
}

export default Form.create()(AddDevice)