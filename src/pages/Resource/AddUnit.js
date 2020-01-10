/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { Form, Select, Radio, Input } from 'antd';
import state from '../../Store';

const { Item } = Form;
const { Option } = Select;

class AddUnit extends Component {

  initFormItem = (path, getFieldDecorator) => {
    if (/san/.test(path)) {
      return <Item label='关联网络单元:'>
        {getFieldDecorator('name2')(<Select>
            {this.netWorkUnitOptions()}
          </Select>)}
      </Item>
    } else if (/nas/.test(path)) {
      return <Item label='是否可做心跳盘'>
        {getFieldDecorator('isHeart', {
          initialValue: "Y",
          rules: [{ required: true }]
        })(
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="Y">是</Radio.Button>
            <Radio.Button value="N">否</Radio.Button>
          </Radio.Group>
        )}
      </Item>
    }
  }

  initOptions = () => {
    let options = [];    
    state.manageServerList?.forEach((item, index) => {
      options.push(<Option value={item.sn} key={item.sn}>{item.name}</Option>);
    });
    return options;
  }

  multipleOptions = () => {
    let options = [];
    state.nassTorageControlList?.forEach((item, index) => {
      options.push(<Option value={item.manageIp} key={index}>{item.manageServerName}</Option>);
    });
    return options;
  }

  netWorkUnitOptions = () => {
    let options = [];
    state.switchPageList?.forEach((item, index) => {
      options.push(<Option value={item.id} key={index}>{item.name}</Option>);
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
    const { path } = this.props;

    return (
      <Form {...formItemLayout}>
        <Item label='单元名称:'>
          {getFieldDecorator('name', {
            initialValue: null,
            rules: [{ required: true, message: '请输入单元名称!' }],
          })(<Input />)}
        </Item>
        <Item label='选择设备:'>
          {getFieldDecorator('storageEquipmentNames', {
            initialValue: [],
          })(<Select mode="multiple">
            {this.multipleOptions()}
          </Select>)}
        </Item>
        { this.initFormItem(path, getFieldDecorator) }
        <Item label='状态:'>
          {
            getFieldDecorator('useState', {
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

export default Form.create()(AddUnit);