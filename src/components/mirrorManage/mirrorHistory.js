import React from "react";
import { Modal, Input, Button, Table, Pagination } from 'antd';
import moment from 'moment';
import "../../assets/less/newMirror.less"

const { TextArea } = Input;
export default class MirrorHistory extends React.Component {
    constructor() {
        super();
        this.state = {
            mirrorData:'',           // 镜像信息
            operatData: [],          // 操作记录
            total: 0,                // 数据总数
            page: 1,                 // 当前页数
            size: 10,                // 每页展示数据量

        }
    }
    // 查看执行结果
    showResult=()=>{
        
    }
    // 关闭制作历史记录页
    historyCancel = () => {
        this.props.historyCancel()
    }
    componentWillReceiveProps(nextProps){
        const {mirrorData} = nextProps;
        this.setState({mirrorData})
    }
    render() {
        const { visible } = this.props
        const { mirrorData, operatData, total, page, size } = this.state;
        const columns = [
            {
                title: '介质名称',
                dataIndex: 'name',
            },{
                title: '操作',
                dataIndex: 'name',
            },{
                title: '执行时间',
                dataIndex: 'name',
            },{
                title: '执行状态',
                dataIndex: 'name',
            },{
                title: '执行结果',
                dataIndex: 'name',
                render: text => <a onClick={this.showResult}>查看</a>,
            }
        ]
        if(!visible){
            return null
        }
        return (
            <Modal
                title="制作历史记录"
                width="70%"
                visible={visible}
                className="mirrorHistory"
                onCancel={this.historyCancel}
                footer={[
                    <Button onClick={this.historyCancel}>
                        关闭
                    </Button>
                ]}
            >
                <div className="mirrorBaseInfo">
                    <p className="mirrorHalf"><span>镜像名称：</span>{mirrorData.a}</p>
                    <p className="mirrorHalf"><span>虚拟机名称：</span>{mirrorData.c}</p>
                    <p className="mirrorHalf"><span>镜像状态：</span>{mirrorData.h}</p>
                    <p className="mirrorHalf"><span>镜像编码：</span>{mirrorData.b}</p>
                    <p className="mirrorHalf"><span>制作人：</span>{mirrorData.e}</p>
                    <p className="mirrorHalf"><span>制作时间：</span>{moment(mirrorData.f).format('YYYY-MM-DD HH:mm:ss')}</p>
                    <div className="mirrorAll"><span>镜像描述：</span><TextArea value={mirrorData.d} disabled className="mirrorDescribe"></TextArea></div>
                </div>
                <Table bordered columns={columns} dataSource={operatData} pagination={false} size="small"/>
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
            </Modal>
        )
    }
}