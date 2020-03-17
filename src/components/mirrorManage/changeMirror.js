import React from "react";
import { Modal, Select, Input, Button, Message, Radio } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

export default class ChangeMirror extends React.Component {
    constructor() {
        super();
        this.state = {
            mirrorData: '',                  // 镜像信息
            selectOperation: '',             // 选择操作
            mediumList: ['检查脚本', '巡查脚本'],                  // 介质列表
            selectMedium: '',                // 选择介质
            result: '',                      // 执行结果
        }
    }
    // 选择操作
    selectOperation = (e) => {
        const value = e.target.value;
        this.setState({ selectOperation: value })
    }
    // 选择介质
    selectMedium = (value) => {
        this.setState({ selectMedium: value })
    }
    // 执行
    changeSubmit = () => {
        this.props.changeSubmit()
    }
    // 关闭
    changeCancel = () => {
        this.props.changeCancel()
    }
    componentWillReceiveProps(nextProps) {
        const { mirrorData } = nextProps
        this.setState({ mirrorData })
    }
    render() {
        const { visible } = this.props;
        const { mirrorData, selectOperation, mediumList, selectMedium, result } = this.state;
        if (!visible) {
            return null;
        }
        return (
            <Modal
                title="修改镜像"
                width="60%"
                visible={visible}
                className="changeMirror"
                onOk={this.changeSubmit}
                onCancel={this.changeCancel}
                footer={[
                    <Button type="primary" onClick={this.changeSubmit}>
                        执行
                </Button>,
                    <Button onClick={this.changeCancel}>
                        关闭
                </Button>
                ]}
            >
                <div className="mirrorBaseInfo">
                    <div><p>镜像名称：</p>{mirrorData.a}</div>
                    <div><p>镜像编码：</p>{mirrorData.b}</div>
                    <div><p>虚拟机名称：</p>{mirrorData.c}</div>
                    <div><p>镜像描述：</p>{mirrorData.d}</div>
                    <div><p><i>*</i>选择操作：</p>
                        <Radio.Group onChange={this.selectOperation} value={selectOperation} className="radio">
                            <Radio value={1}>下发介质</Radio>
                            <Radio value={2}>执行介质</Radio>
                        </Radio.Group>
                    </div>
                    <div><p><i>*</i>选择介质：</p>
                        <Select
                            onChange={this.selectMedium}
                            className="select"
                            value={selectMedium}
                        >
                            {
                                mediumList.map((item, index) => {
                                    return (
                                        <Option key={index} value={item}>{item}</Option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                    <div><p>执行结果：</p><TextArea value={result} className="result"></TextArea></div>
                </div>
            </Modal>
        )
    }
}