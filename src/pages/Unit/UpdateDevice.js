/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { Form, Input, Radio, InputNumber, Row, Col } from 'antd';

const { Item } = Form;

class UpdateDevice extends Component {

  isNasFormItem = (path, getFieldDecorator, dataSource) => {
    if (/nas/.test(path)) {
      let { type, model, position, isHeart, initialInode, initialCapacity, initialMbps, initialIops  } = dataSource;
      return (
        <Row>
          <Col span={24}>
            <Item label='控制器类别:'>
              {getFieldDecorator('type', {
                initialValue: type,
              })(<Input />)}
            </Item>
          </Col>
          <Col span={24}>
            <Item label='控制器型号:'>
              {getFieldDecorator('model', {
                initialValue: model,
              })(<Input />)}
            </Item>
          </Col>
          <Col span={24}>
            <Item label='位置:'>
              {getFieldDecorator('position', {
                initialValue: position,
              })(<Input />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item label='是否可做心跳盘:' labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
              {getFieldDecorator('isHeart', {
                initialValue: isHeart,
              })(
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="Y">是</Radio.Button>
                  <Radio.Button value="N">否</Radio.Button>
                </Radio.Group>
              )}
            </Item>
          </Col>
          <Col span={12}>
            <Item label='初始INODE:' labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
              {getFieldDecorator('initialInode', {
                initialValue: initialInode,
              })(<InputNumber min={0} step={0.1} />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item label='初始容量:' labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
              {getFieldDecorator('initialCapacity', {
                initialValue: initialCapacity,
              })(<InputNumber min={0} step={0.1} />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item label='初始MBPS:' labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
              {getFieldDecorator('initialMbps', {
                initialValue: initialMbps,
              })(<InputNumber min={0} step={0.1} />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item label='初始IOPS:' labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
              {getFieldDecorator('initialIops', {
                initialValue: initialIops,
              })(<InputNumber min={0} step={0.1} />)}
            </Item>
          </Col>
        </Row>
      )
    } else {
      return null
    }
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
    let { path, dataSource } = this.props;
    let { name, storageName, status } = dataSource;
    let deviceName = /nas/.test(path) ? "name" : /san/.test(path) ? "storageName" : "";
    return (
      <Form {...formItemLayout}>
        <Item label='设备名称:'>
          {getFieldDecorator(deviceName, {
            initialValue: deviceName === "name" ? name : deviceName === "storageName" ? storageName : "",
            rules: [{ message: '请输入设备名称!' }],
          })(<Input disabled />)}
        </Item>
        <Item label='服务状态:'>
          {
            getFieldDecorator('status', {
              initialValue: status,
              rules: [{ required: true }]
            })(
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="Y">正常服务</Radio.Button>
                <Radio.Button value="N">维护状态</Radio.Button>
              </Radio.Group>
            )
          }
        </Item>
        {this.isNasFormItem(path, getFieldDecorator, dataSource)}
      </Form>
    )
  }
}

export default Form.create()(UpdateDevice)