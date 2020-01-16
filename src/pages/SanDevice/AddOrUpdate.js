/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { Form, Select, Radio, InputNumber } from 'antd';
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
        <Item label='序号:'>
          {getFieldDecorator('name', {
            initialValue: null,
            rules: [{ required: true, message: '请输入序号!' }],
          })(<InputNumber min={0} />)}
        </Item>
        <Item label='Fabric1-Port:'>
          {getFieldDecorator('storageEquipmentNames', {
            initialValue: [],
            rules: [{ required: true, message: '请选择Fabric1-Port!' }]
          })(<Select mode="multiple">
            {this.initOptions()}
          </Select>)}
        </Item>
        <Item label='是否可用:'>
          {
            getFieldDecorator('status', {
              initialValue: "Y",
              rules: [{ required: true, message: '请选择是否可用!' }]
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