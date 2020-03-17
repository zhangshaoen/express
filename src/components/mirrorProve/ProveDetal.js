import React from 'react';
import {Select, Input, Button} from 'antd';
import "../../assets/less/mirrorProve.less"

const { TextArea } = Input;

class ProveDetal extends React.Component {
    constructor() {
        super();
        this.state = {
            mirrorName: '',//镜像名字
            mirrorConfig: '',//镜像配置
            virtualName: '',//虚拟机名字
            otherIP: '',//带外ip
            resultsValue: '',//执行结果
            mediaParameter: '',//介质参数
            checkOperate: '',//操作验证
            choceMedia: ''//选择介质
        }
    };
    //选择介质
    setChoceMedia = (e) => {
        this.setState({choceMedia: e});
    };
    //设置介质参数
    setMediaParameter = (e) => {
        this.setState({mediaParameter: e.targer.value});
    };
    //设置操作验证
    setCheckOperate = (e) => {
        this.setState({checkOperate: e});
    };
    //执行按钮
    carryOut = () => {}
    //取消按钮
    closePage = () => {
        this.props.closeProveDetal();
    };
    //执行结果
    setResultsValue = (e) => {};
    render() {
        return (<div className="proveParent">
            <div className="proveTop">
                <div className="proveItem">
                    <p>镜像名称：</p>
                    <span>{this.state.mirrorName}</span>
                </div>
                <div className="proveItem">
                    <p>镜像配置：</p>
                    <span>{this.state.mirrorConfig}</span>
                </div>
                <div className="proveItem">
                    <p>虚拟机名称：</p>
                    <span>{this.state.virtualName}</span>
                </div>
                <div className="proveItem">
                    <p>外带IP：</p>
                    <span>{this.state.otherIP}</span>
                </div>
            </div>
            <div className="proveMiddle">
                <div className="proveMiddleItem">
                    <p><i>*</i>选择介质：</p>
                    <Select
                        value={this.state.choceMedia}
                        onChange={this.setChoceMedia}
                        style={{width: '200px'}}
                    ></Select>
                </div>
                <div className="proveMiddleItem">
                    <p>介质参数：</p>
                    <Input
                        value={this.state.mediaParameter}
                        onChange={this.setMediaParameter}
                        style={{width: '200px'}}
                    />
                </div>
                <div className="proveMiddleItem">
                    <p><i>*</i>操作验证：</p>
                    <Select
                        value={this.state.checkOperate}
                        onChange={this.setCheckOperate}
                        style={{width: '200px'}}
                    >
                        <Select.Option value="checkConfig" key="checkConfig">验证配置</Select.Option>
                        <Select.Option value="checkVersion" key="checkVersion">检查版本</Select.Option>
                        <Select.Option value="checkNorm" key="checkNorm">规范检查</Select.Option>
                        <Select.Option value="vulnerScan" key="vulnerScan">漏洞扫描</Select.Option>
                    </Select>
                </div>
                <div className="proveMiddleItem">
                    <p>执行结果：</p>
                    <TextArea 
                        className="proveResult"
                        value={this.state.resultsValue}
                        onChange={this.setResultsValue}
                    ></TextArea>
                </div>
            </div>
            <div className="proveFooter">
                <Button
                    onClick={this.carryOut}
                >执行</Button>
                <Button
                    style={{marginLeft: '20px'}}
                    onClick={() => this.closePage()}>取消</Button>
            </div>
        </div>)
    }
}

export default ProveDetal;