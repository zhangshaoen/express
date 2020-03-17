import React from 'react';
import {Table, Input, Button, Modal, Pagination} from 'antd';
import "../../assets/less/mirrorProve.less"
import NewMirror from './NewMirror';
import ProveDetal from './ProveDetal';
import RecordDetail from './RecordDetail';

const { confirm } = Modal;

class MirrorProve extends React.Component {
    constructor() {
        super();
        this.state = {
            mirrorName: '',//输入的镜像名称
            virtualName: '',//输入的虚拟机名称
            newMirrorVisible: false,//新增镜像验证页面状态
            proveDetalVisible: false,//验证页面显示状态
            recordDetalVisible: false,//查看页面显示状态
            total: 0,//数据总数
            size: 10,//每页显示数目
            page: 1,//当前页数
            mirrorTitle: [{
                title: '镜像名称',
                dataIndex: 'mirrorName'
            }, {
                title: '虚拟机名称',
                dataIndex: 'virtualName'
            }, {
                title: '创建时间',
                dataIndex: 'createTime'
            }, {
                title: '创建人',
                dataIndex: 'createPerson'
            }, {
                title: '镜像配置',
                dataIndex: 'mirrorConfig'
            }, {
                title: '带外IP',
                dataIndex: 'otherIP'
            }, {
                title: '验证记录',
                dataIndex: 'proveRecord',
                render: (text, record, index) => {
                    return <p>
                        <a onClick={() => this.recordDetal(record)}>查看</a>
                    </p>
                }
            }, {
                title: '状态',
                dataIndex: 'status'
            },{
                title: '操作',
                dataIndex: 'operate',
                render: (text, record, index) => {
                    return <p>
                        <a onClick={() => this.proveDetal(record)} style={{marginRight: '20px'}}>验证</a>
                        <a onClick={() => this.deleteVirtual(record)}>删除虚拟机</a>
                    </p>
                }
            }],
            mirrorData: [{
                key: 1,
                mirrorName: 'aaa',
                virtualName: 'aaa_test1',
                createTime: '2020.1.23',
                createPerson: 'ren',
                mirrorConfig: '2G 4G',
                otherIP: '1.2.3.4',
                status: '11111'
            }]
        }
    };
    //镜像名称输入
    setMirrorName = (e) => {
        this.setState({mirrorName: e.target.value});
    };
    //虚拟机名称输入
    setVirtualName = (e) => {
        this.setState({virtualName: e.target.value});
    };
    //回车搜索功能
    searchOk = (e) => {
        if(!e){e = window.event};
        if(e.keyCode === 13 || e.which === 13) {
            this.tableSearch();
        }
    };
    //搜索功能
    tableSearch = () => {}
    //新增镜像验证
    NewMirrorOk = () => {
        this.setState({newMirrorVisible: true})
    };
    //新增验证确定按钮
    submitOk = () => {};
    //新增验证取消按钮
    closeNew = () => {
        this.setState({newMirrorVisible: false})
    };
    //进入验证记录页面
    recordDetal = () => {
        this.setState({recordDetalVisible: true})
    };
    //验证记录页面关闭
    closeRecordDetal = () => {
        this.setState({recordDetalVisible: false})
    }
    //表格中点击验证
    proveDetal = () => {
        this.setState({proveDetalVisible: true})
    };
    //表格中镜像验证取消
    closeProveDetal = () => {
        this.setState({proveDetalVisible: false})
    };
    //删除虚拟机
    deleteVirtual = () => {
        let that = this;
        confirm({
            title: '确定要删除该虚拟机吗？',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                that.deleteVirtualOk();
            },
            onCancel() {}
        })
    }
    //调用删除虚拟机接口
    deleteVirtualOk = () => {}

    render() {
        return (<div className="mirrorTop">
            <p className="mirrorTitle">镜像验证页面</p>
            <div className="mirrorFun">
                <div className="mirrorFunItem">
                    <span>镜像名称:</span>
                    <Input
                        value={this.state.mirrorName}
                        onChange={(e) => {this.setMirrorName(e)}}
                        onKeyDown={this.searchOk}
                        style={{width: "150px",height: "30px",margin: "0 10px 0 5px"}}
                    />
                    <span>虚拟机名称:</span>
                    <Input
                        value={this.state.virtualName}
                        onChange={(e) => {this.setVirtualName(e)}}
                        onKeyDown={this.searchOk}
                        style={{width: "150px",height: "30px",margin: "0 10px 0 5px"}}
                    />
                    <Button className="mirrorSearch"
                        onClick={this.tableSearch}
                    >搜索</Button>
                </div>
                <div className="newMirrorProve">
                    <Button className="mirrorProve"
                        onClick={this.NewMirrorOk}
                    >镜像验证</Button>
                </div>
            </div>
            <Table 
                columns={this.state.mirrorTitle}
                dataSource={this.state.mirrorData}
                pagination={false} 
                size="small"
                bordered />
            <div className="pagination">
                <p className="total">共{this.state.total}条</p>
                <Pagination
                    showSizeChanger
                    pageSizeOptions={['5', '10', '20', '30']}
                    onShowSizeChange={this.changeSize}
                    total={this.state.total}
                    pageSize={this.state.size}
                    current={this.state.page}
                    onChange={this.changePage}
                />
            </div>
            <Modal
                title="镜像验证"
                visible={this.state.newMirrorVisible}
                maskClosable={false}
                closable={false}
                footer={null}
                width='350px'
            >{this.state.newMirrorVisible ? <NewMirror
                submitOk={this.submitOk}
                closeNew={this.closeNew}
            /> : null}</Modal>
            <Modal
                title="镜像验证"
                visible={this.state.proveDetalVisible}
                maskClosable={false}
                closable={false}
                footer={null}
                width='800px'
            >{this.state.proveDetalVisible ? <ProveDetal
                closeProveDetal={this.closeProveDetal}
            /> : null}</Modal>
            <Modal
                title="验证记录页面"
                visible={this.state.recordDetalVisible}
                maskClosable={false}
                closable={false}
                footer={null}
                width='800px'
            >{this.state.recordDetalVisible ? <RecordDetail
                closeRecordDetal={this.closeRecordDetal}
            /> : null}</Modal>
        </div>)
    }
}

export default MirrorProve;