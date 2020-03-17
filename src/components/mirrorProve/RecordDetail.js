import React from 'react';
import {Table, Button, Pagination, Modal} from 'antd';
import "../../assets/less/mirrorProve.less"

class RecordDetal extends React.Component {
    constructor() {
        super();
        this.state = {
            mirrorName: '',//镜像名称
            mirrorConfig: '',//镜像配置
            virtualName: '',//虚拟机名称
            otherIP: '',//带外ip
            createPerson: '',//创建人
            createTime: '',//创建时间
            total: 0,//数据总数
            size: 10,//每页展示的数目
            page: 1,//当前页
            checked: false,//查看页面状态
            recordTitle: [{//表头信息
                title: '介质名称',
                dataIndex: 'agentName'
            }, {
                title: '介质类型',
                dataIndex: 'agentType'
            }, {
                title: '介质参数',
                dataIndex: 'agentPara'
            }, {
                title: '执行时间',
                dataIndex: 'implementName'
            }, {
                title: '执行结果',
                dataIndex: 'implementVal'
            }, {
                title: '执行结果',
                dataIndex: 'implementdoing',
                render: (text, record, index) => <a onClick={() => this.checkRecord(record)}>查看</a>
            }],
            recordArr: [{//数据信息
                key: 1,
                agentName: 'AAA',
                agentType: '规范性检查',
                agentPara: '1',
                implementName: '20200103',
                implementVal: '成功'
            }],
        }
    };
    //查看按钮
    checkRecord = () => {
        this.setState({checked: true});
    };
    //关闭按钮
    closeRecordDetal = () => {
        this.props.closeRecordDetal();
    }
    render() {
        return (<div className="recordParent">
            <div className="recordTop">
                <div className="recordItem">
                    <span>镜像名称：</span>
                    <span>{this.state.mirrorName}</span>
                </div>
                <div className="recordItem">
                    <span>镜像配置：</span>
                    <span>{this.state.mirrorConfig}</span>
                </div>
                <div className="recordItem">
                    <span>虚拟机名称：</span>
                    <span>{this.state.virtualName}</span>
                </div>
                <div className="recordItem">
                    <span>带外IP：</span>
                    <span>{this.state.otherIP}</span>
                </div>
                <div className="recordItem">
                    <span>创建人：</span>
                    <span>{this.state.createPerson}</span>
                </div>
                <div className="recordItem">
                    <span>创建时间：</span>
                    <span>{this.state.createTime}</span>
                </div>
            </div>
            <div className="recordMiddle">
                <Table
                    columns={this.state.recordTitle}
                    dataSource={this.state.recordArr}
                    pagination={false} 
                    style={{width: '700px'}}
                    bordered
                />
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
            </div>
            <div className="recordFooter">
                <Button onClick={() => this.closeRecordDetal()}>关闭</Button>
            </div>
            <Modal
                visible={this.state.checked}
                maskClosable={false}
                closable={false}
                footer={null}
                width='350px'
            >
                {this.state.checked ? <div></div> : null}
            </Modal>
        </div>)
    }
}

export default RecordDetal;