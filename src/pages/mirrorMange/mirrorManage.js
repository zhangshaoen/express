import React from "react";
import { Collapse, Input, Button, Table, Pagination, Modal } from 'antd';
import $ from 'jquery';
import moment from 'moment';
import NewMirror from '../../components/mirrorManage/newMirror.js'
import MirrorHistory from '../../components/mirrorManage/mirrorHistory.js'
import ChangeMirror from '../../components/mirrorManage/changeMirror.js'
import '../../assets/less/mirrorManage.less'

const { Panel } = Collapse;
const { confirm } = Modal;

export default class MirrorManage extends React.Component {
    constructor() {
        super();
        this.state = {
            mirrorAllData: [{ a: "time", b: "time", c: 'a', d: 'd', e: 'e', f: 998874221, h: 'a', key: 1 }],         // 镜像数据
            total: 0,               // 数据总数
            page: 1,                // 当前页数
            size: 10,                // 每页展示数据量
            newVisible: false,      // 新增镜像页的展示状态
            changeData: '',         // 需要修改的基本信息
            historyState: false,    // 制作历史记录页面状态
            changeState: false,     // 修改镜像页面状态
            mirrorData: '',          // 镜像数据
        }
    }
    // 搜索镜像
    search = () => {

    };
    // 新建镜像
    newMirror = () => {
        this.setState({ newVisible: true })
    }
    // 新建镜像页面的确定
    newSubmit = () => {
        this.setState({ newVisible: false })
    }
    // 新建镜像页面的关闭
    newCancel = () => {
        this.setState({
            newVisible: false,
            changeData: ''
        })
    }
    // 修改镜像基本信息
    changeMirror(record) {
        this.setState({ newVisible: true })
        const data = {
            mirrorName: record.a,
            mirrorCode: record.b,
            mirrorDescribe: record.d
        }
        this.setState({ changeData: data })
    }
    // 查看镜像制作历史记录
    showHistory(item) {
        this.setState({
            historyState: true,
            mirrorData: item
        })
    }
    // 镜像制作历史记录关闭
    historyCancel = () => {
        this.setState({
            historyState: false,
            mirrorData: ''
        })
    }
    // 修改
    amend(item) {
        this.setState({
            changeState: true,
            mirrorData: item
        })
    }
    // 修改镜像执行
    changeSubmit = () => {
        this.setState({ changeState: false, mirrorData: '' })
    }
    // 修改镜像关闭
    changeCancel = () => {
        this.setState({ changeState: false, mirrorData: '' })
    }
    // 生成镜像
    build = () => {
        confirm({
            title: '请确认是否导为ovf模板?',
            content: '',
            okText:"确认",
            cancelText:"取消",
            onOk() {
            },
            onCancel() { },
        });
    }
    // 发布
    issue = () => {
        confirm({
            title: '请确认是否发布该镜像?',
            content: '',
            okText:"确认",
            cancelText:"取消",
            onOk() {
            },
            onCancel() { },
        });
    }
    // 下载
    dowload = () => {
    }
    // 删除
    delete = () => {
        confirm({
            title: '请确认是否删除?',
            content: '',
            okText:"确认",
            cancelText:"取消",
            onOk() {
            },
            onCancel() { }
        });
    }
    // 改变每页展示的数据量
    changeSize = (page, size) => {
        this.setState({ size })
    }
    // 改变页数
    changePage = (page, size) => {
        this.setState({ page })
    }
    componentDidMount() {
    }
    render() {
        const { mirrorAllData, total, page, size } = this.state;
        const columns = [
            {
                title: '镜像名称',
                dataIndex: 'templateName',
                render: (text, record) => <a onClick={this.changeMirror.bind(this, record)}>{text}</a>,
            }, {
                title: '镜像编码',
                dataIndex: 'templateCode',
            }, {
                title: '虚拟机名称',
                dataIndex: 'c',
            }, {
                title: '镜像描述',
                dataIndex: 'remark',
            }, {
                title: '制作人',
                dataIndex: 'createUser',
            }, {
                title: '制作时间',
                dataIndex: 'createTime',
                render: text => <span>{text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : ''}</span>,
            }, {
                title: '镜像状态',
                dataIndex: 'state',
            }, {
                title: '制作历史记录',
                dataIndex: 'i',
                render: (text, record) => <a onClick={this.showHistory.bind(this, record)}>查看</a>,
            }, {
                title: '操作',
                dataIndex: 'action',
                render: (text, record, index) => <div>
                    <Button type="link" onClick={this.amend.bind(this, record)}>修改</Button>
                    <Button type="link" onClick={this.build}>生成镜像</Button>
                    <Button type="link" onClick={this.issue}>发布</Button>
                    <Button type="link" onClick={this.dowload}>下载</Button>
                    <Button type="link" onClick={this.delete}>删除</Button>
                </div>,
            }
        ];
        return (
            <div className="mirrorManage">
                <Collapse defaultActiveKey={['1']}>
                    <Panel showArrow={false} header="镜像管理" key="1">
                        <div className="mirrorSearch">
                            <Input placeholder="请输入镜像名称" />
                            <Button type="primary" onClick={this.search}>搜索</Button>
                            <Button className="newMirror" type="primary" onClick={this.newMirror}>新建镜像</Button>
                        </div>
                        <Table bordered columns={columns} dataSource={mirrorAllData} pagination={false} size="small" />
                        <div className="pagination">
                            <p className="total">共{total}条</p>
                            <Pagination
                                showSizeChanger
                                pageSizeOptions={['5', '10', '20', '30']}
                                onShowSizeChange={this.changeSize}
                                total={total}
                                pageSize={size}
                                current={page}
                                onChange={this.changePage}
                            />
                        </div>
                        <NewMirror
                            changeData={this.state.changeData}
                            visible={this.state.newVisible}
                            newSubmit={this.newSubmit}
                            newCancel={this.newCancel}
                        />
                        <MirrorHistory
                            visible={this.state.historyState}
                            mirrorData={this.state.mirrorData}
                            historyCancel={this.historyCancel}
                        />
                        <ChangeMirror
                            visible={this.state.changeState}
                            mirrorData={this.state.mirrorData}
                            changeSubmit={this.changeSubmit}
                            changeCancel={this.changeCancel}
                        />
                    </Panel>
                </Collapse>

            </div>
        )
    }
}