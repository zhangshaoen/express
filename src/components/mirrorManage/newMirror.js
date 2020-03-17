import React from "react";
import { Modal, Select, Input, Button, Message } from 'antd';
import "../../assets/less/newMirror.less"

const { Option } = Select;
const { TextArea } = Input;

export default class NewMirror extends React.Component {
    constructor() {
        super();
        this.state = {
            changeData: '',           // 修改需要的基本信息
            virtualData: [],         // 虚拟机列表数据
            virtualName: '',         // 选择的虚拟机名称
            mirrorName: '',          // 镜像名称
            mirrorCode: '',          // 镜像编码
            mirrorDescribe: '',      // 镜像描述
        }
    };
    // 选择虚拟机
    selectVirtual = (value) => {
        this.setState({ virtualName: value })
    }
    // 镜像名称
    changeMirrorName = (e) => {
        const value = e.target.value
        this.setState({ mirrorName: value })
    }
    // 镜像编码
    changeMirrorCode = (e) => {
        const value = e.target.value;
        this.setState({ mirrorCode: value })
    }
    // 镜像描述
    changeMirrorDescribe = (e) => {
        const value = e.target.value
        this.setState({ mirrorDescribe: value })
    }
    // 确定
    newSubmit = () => {
        const { changeData, virtualName, mirrorName, mirrorCode, mirrorDescribe } = this.state;
        const newData = {

        };
        // 镜像名称符合数字、字母、下划线，以字母开头的0-100个字符
        const reg = /^[a-zA-Z][a-zA-Z0-9_]{0,100}$/;
        const state = reg.test(mirrorName);
        (!virtualName && !changeData) && Message.error("请选择虚拟机！");
        !mirrorName && Message.error("请填写镜像名称！");
        !mirrorCode && Message.error("请填写镜像编码！");
        (mirrorName && !state) && Message.error("镜像名称必须是数字、字母、下划线，以字母开头的0-100个字符!");
        ((changeData ? true : virtualName) && state && mirrorName && mirrorCode) && this.props.newSubmit(newData);
    }
    // 取消
    newCancel = () => {
        this.props.newCancel();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            virtualName: '',
            mirrorName: '',
            mirrorCode: '',
            mirrorDescribe: ''
        })
        const { changeData } = nextProps;
        const { mirrorName, mirrorCode, mirrorDescribe } = changeData;
        this.setState({ changeData, mirrorName, mirrorCode, mirrorDescribe })
    }
    render() {
        const { visible, changeData } = this.props;
        const { virtualData, virtualName, mirrorName, mirrorCode, mirrorDescribe } = this.state;
        if (!visible) {
            return null;
        }
        return (
            <Modal
                title={changeData ? '修改镜像' : '新建镜像'}
                visible={visible}
                className="newMirrorBody"
                onOk={this.newSubmit}
                onCancel={this.newCancel}
                footer={[
                    <Button type="primary" onClick={this.newSubmit}>
                        确定
                    </Button>,
                    <Button onClick={this.newCancel}>
                        取消
                    </Button>,
                ]}
            >
                <div className="virtualName" style={{ 'display': changeData ? 'none' : '' }}>
                    <p><i>*</i>选择虚拟机：</p>
                    <Select
                        onChange={this.selectVirtual}
                        className="select"
                        value={virtualName}
                    >
                        {
                            virtualData.map((item, index) => {
                                return (
                                    <Option key={index} value={item.name}>{item.name}</Option>
                                )
                            })
                        }
                    </Select>
                </div>
                <div className="mirrorName">
                    <p><i>*</i>镜像名称：</p>
                    <Input value={mirrorName} onChange={this.changeMirrorName} />
                </div>
                <div className="mirrorName">
                    <p><i>*</i>镜像编码：</p>
                    <Input value={mirrorCode} onChange={this.changeMirrorCode} />
                </div>
                <div className="mirrorDescribe">
                    <p>镜像描述：</p>
                    <TextArea value={mirrorDescribe} onChange={this.changeMirrorDescribe}></TextArea>
                </div>
            </Modal>
        )
    }
}