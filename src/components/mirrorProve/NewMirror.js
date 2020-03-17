import React from 'react';
import {Select, Radio, Input, Button} from 'antd';
import "../../assets/less/mirrorProve.less"

class NewMirror extends React.Component {
    constructor() {
        super();
        this.state = {
            mirrorArr: [1,2,3],
            mirrorValue: '',
            otherIP: '',
            changeCpu: '',
            changeMem: ''
        }
    };
    //点击确定按钮
    submitOk = () => {
        this.props.submitOk();
    };
    //点击取消按钮
    closeNew = () => {
        this.props.closeNew();
    };
    //选择镜像
    setMirror = (e) => {
        this.setState({mirrorValue: e})
    };
    //设置cpu
    setChangeCpu = (e) => {
        this.setState({changeCpu: e.target.value})
    };
    //设置MEM
    setChangeMem = (e) => {
        this.setState({changeMem: e.target.value})
    };
    //设置带外IP
    setOtherIp = (e) => {
        this.setState({otherIP: e.target.value})
    };
    render() {
        return (<div className="NewMirror">
            <div className="NewMirrorItem">
                <span className="NewMirrorItemTit"><i>*</i>选择镜像:</span>
                <Select
                    onChange={e => this.setMirror(e)}
                    value={this.state.mirrorValue}
                    style={{width: '100px'}}
                >
                    {this.state.mirrorArr.map((item, i) => (
                        <Select.Option key={i}>
                            {item}
                        </Select.Option>))}
                </Select>
            </div>
            <div className="NewMirrorItem">
                <span className="NewMirrorItemTit"><i>*</i>CPU:</span>
                <Radio.Group
                    value={this.state.changeCpu}
                    onChange={(e) => {this.setChangeCpu(e)}}
                >
                    <Radio value="2G">2G</Radio>
                    <Radio value="4G">4G</Radio>
                    <Radio value="8G">8G</Radio>
                </Radio.Group>
            </div>
            <div className="NewMirrorItem">
                <span className="NewMirrorItemTit"><i>*</i>MEM:</span>
                <Radio.Group
                    value={this.state.changeMem}
                    onChange={(e) => {this.setChangeMem(e)}}
                >
                    <Radio value="2G">2G</Radio>
                    <Radio value="4G">4G</Radio>
                    <Radio value="8G">8G</Radio>
                </Radio.Group>
            </div>
            <div className="NewMirrorItem">
                <span className="NewMirrorItemTit"><i>*</i>带外IP:</span>
                <Input
                    value={this.state.otherIP}
                    onChange={(e) => {this.setOtherIp(e)}}
                    style={{width: '100px'}}
                />
            </div>
            <div className="NewMirrorFooter">
                <Button onClick={this.submitOk}>确定</Button>
                <Button onClick={this.closeNew} style={{marginLeft: '20px'}}>取消</Button>
            </div>
        </div>)
    }
}

export default NewMirror;