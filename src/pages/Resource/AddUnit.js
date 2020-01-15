/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { Form, Select, Radio, Input, InputNumber } from 'antd';
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
      return null
    }
  }

  initOptions = () => {
    let options = [];    
    state.manageServerList?.forEach((item, index) => {
      options.push(<Option value={item.name} key={item.sn}>{item.name}</Option>);
    });
    return options;
  }

  multipleOptions = path => {
    let options = [];
    if(/nas/.test(path)) {
      state.nassTorageControlList?.forEach((item, index) => {
        options.push(<Option value={item.name} key={index}>{item.name}</Option>);
      });    
    }else if(/san/.test(path)) {
      state.freeSanStorageList?.forEach((item, index) => {
        options.push(<Option value={item.storageName} key={index}>{item.storageName}</Option>);
      });  
    }    
    return options;
  }

  netWorkUnitOptions = () => {
    let options = [];
    state.allNetWorkUnitList?.forEach((item, index) => {
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
        span: 8
      },
      wrapperCol: {
        span: 16
      },
    };

    const { getFieldDecorator } = this.props.form;
    const { path } = this.props;

    return (
      <Form {...formItemLayout} >
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
            {this.multipleOptions(path)}
          </Select>)}
        </Item>
        { this.initFormItem(path, getFieldDecorator) }
        <Item label='状态:'>
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
        <Item label='选择存储管理机:'>
          {getFieldDecorator('manageServiceName', {
            initialValue: "",
          })(<Select>
            {this.initOptions()}
          </Select>)}
        </Item>
        <Item label='容量分配比例最大值:'>
          {getFieldDecorator('capacityMaxAllocationRatio', {})
          (<InputNumber
            style={{width: "100%"}}
            min={0}
            formatter={value => `${value}%`}
            parser={value => value.replace('%', '')}/>
          )}
        </Item>
        <Item label='MBPS分配比例最大值:'>
          {getFieldDecorator('mbpsMaxAllocationRatio', {})
          (<InputNumber
            style={{width: "100%"}}
            min={0}
            formatter={value => `${value}%`}
            parser={value => value.replace('%', '')}/>
          )}
        </Item>
        <Item label='IOPS分配比例最大值:'>
          {getFieldDecorator('iopsMaxAllocationRatio', {})
          (<InputNumber
            style={{width: "100%"}}
            min={0}
            formatter={value => `${value}%`}
            parser={value => value.replace('%', '')}/>
          )}
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddUnit);