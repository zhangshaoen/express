import React, { Component } from 'react';
import { Form, Select, Radio} from 'antd';


const { Item } = Form;

class UpdateDevice extends Component {

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

    return (
      <Form {...formItemLayout}>
        <Item label='设备名称:'>
          {getFieldDecorator('name', {
            initialValue: null,
            rules: [{ required: true, message: '请输入设备名称!' }],
          })(<Select></Select>)}
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
      </Form>
    )
  }
}

export default Form.create()(UpdateDevice)