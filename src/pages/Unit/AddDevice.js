/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { Form, Select, Radio} from 'antd';
import state from '../../Store';

const { Item } = Form;
const { Option } = Select;


class AddDevice extends Component {

  isHeart = (path, getFieldDecorator) => {
    if(/nas/.test(path)) {
      return (
        <Item label='是否可做心跳盘:'>
        {getFieldDecorator('isHeart', {
            initialValue: "Y",
          })(
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="Y">是</Radio.Button>
            <Radio.Button value="N">否</Radio.Button>
          </Radio.Group>
        )}
      </Item>
      )
    }else {
      return null
    }
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
        { this.isHeart(path, getFieldDecorator) }
      </Form>
    )
  }
}

export default Form.create()(AddDevice)