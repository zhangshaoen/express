import React, { Component } from 'react';
import { Form, Select, Input, Row, Col } from 'antd';
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
        <Row gutter={24}>
          <Col span={12}>
            <Item label='管理机名称:'>
              {getFieldDecorator('name', {
                initialValue: null,
                rules: [{ required: true, message: '请输入管理机名称!' }],
              })(<Input />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item label='序列号:'>
              {
                getFieldDecorator('sn', {
                  initialValue: null,
                  rules: [{ required: true, message: '请输入管理机序列号!' }]
                })(<Input />)
              }
            </Item>
          </Col>
          <Col span={12}>
            <Item label='管理IP:'>
              {
                getFieldDecorator('ip', {
                  initialValue: "Brocade",
                })(<Input />)
              }
            </Item>
          </Col>
          <Col span={12}>
            <Item label='操作系统:'>
              {
                getFieldDecorator('os', {
                  initialValue: "Brocade",
                })(<Input />)
              }
            </Item>
          </Col>
          <Col span={12}>
            <Item label='数据中心:'>
              {getFieldDecorator('manageServiceName', {
                initialValue: "",
              })(<Select>
                {this.initOptions()}
              </Select>)}
            </Item>
          </Col>
          <Col span={12}>
            <Item label='部署位置:'>
              {getFieldDecorator('where', {
                initialValue: [],
              })(<Select></Select>)}
            </Item>
          </Col>
          <Col span={12}>
            <Item label='支持存储设备类型:'>
              {getFieldDecorator('type', {
                initialValue: "",
              })(<Select>
                {this.initOptions()}
              </Select>)}
            </Item>
          </Col>
          <Col span={12}>
            <Item label='备注:'>
              {getFieldDecorator('remark', {
                initialValue: "",
              })(<Input />)}
            </Item>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(AddOrUpdate);