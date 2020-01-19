import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Row, Col, Card, Button, Table, Modal, Radio, message, InputNumber, Popconfirm } from 'antd';
import AddUnit from './AddUnit';
import { BasicInfoList, CapacityList, MBPSList, IOPSList } from "./BasicInfoConfig";
import BasicInfo from "../../components/BasicInfo";
import ProgressInfo from "../../components/ProgressInfo";
import state from '../../Store';
import { getQueryVariable } from '../../utils/getQueryVariable';
import { typeJudgment } from "../../utils/typeJudgment";

@observer
class Resource extends Component {

  state = {
    visible: false,
    addValues: {}
  };

  // 编辑
  editRecord = item => {
    item.edit = !item.edit;
    this.forceUpdate();
  }

  // 编辑
  numChange = (value, record, key) => {
    record[key] = value / 100;
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.form.validateFields(async (err, values) => {
      this.form.resetFields();
      if (!err) {
        this.setState({
          visible: false,
        }, () => {
          // 所属设备级别
          let storageLevelId = this.state.addValues.id;
          let addValues = { storageLevelId, ...values};
          for(let key in addValues) {
            if(["capacityMaxAllocationRatio", "mbpsMaxAllocationRatio", "iopsMaxAllocationRatio"].indexOf(key) > -1) {
              addValues[key] = typeJudgment(addValues[key]) === "number" ? addValues[key]/100 : addValues[key];
            }
          }              
          // 存储级别页面（特定存储资源池下特定级别）存储单元新增
          state.addStorageUnit(addValues).then(() => {
            // 根据 ID 获取存储级别页面存储单元列表查询
            state.getStorageUnitListByStorageLevelId(this.state.addValues.id);
          });
        });
      }
    })
  };

  handleCancel = e => {
    this.form.resetFields();
    this.setState({ visible: false, });
  };

  updateUnit = record => {
    record.edit = false;
    state.updateStorageUnit(record).then(() => {
      // 根据 ID 获取存储级别页面存储单元列表查询
      state.getStorageUnitListByStorageLevelId(this.state.addValues.id);
    })
  }

  deleteUnit = record => {
    state.deleteStorageUnit(record).then(() => {
      state.getStorageUnitListByStorageLevelId(this.state.addValues.id);
    })
  }

  initColumns = path => {
    let columns = [
      {
        title: "单元名称",
        dataIndex: "name",
        width: 200,
        fixed: 'left',
      },
      // { title: "设备名称", dataIndex: "storageEquipmentNames" },
      {
        title: "所属数据中心",
        dataIndex: "dataCenter"
      },
      {
        title: "部署楼宇",
        dataIndex: "deploymentLocation"
      },
      {
        title: "容量分配比例最大值",
        dataIndex: "capacityMaxAllocationRatio",
        render: (text, record) => {
          if (record.edit) {
            return <InputNumber
              defaultValue={text * 100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
              onChange={value => this.numChange(value, record, "capacityMaxAllocationRatio")} />
          } else {
            return <span>{`${text * 100}%`}</span>
          }
        },
      },
      {
        title: "MBPS分配比例最大值",
        dataIndex: "mbpsMaxAllocationRatio",
        render: (text, record) => {
          if (record.edit) {
            return <InputNumber
              defaultValue={text * 100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
              onChange={value => this.numChange(value, record, "mbpsMaxAllocationRatio")} />
          } else {
            return <span>{`${text * 100}%`}</span>
          }
        }
      },
      {
        title: "IOPS分配比例最大值",
        dataIndex: "iopsMaxAllocationRatio",
        render: (text, record) => {
          if (record.edit) {
            return <InputNumber
              defaultValue={text * 100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
              onChange={value => this.numChange(value, record, "iopsMaxAllocationRatio")} />
          } else {
            return <span>{`${text * 100}%`}</span>
          }
        }
      },
      {
        title: "状态置换",
        dataIndex: "status",
        render: (text, record, index) => {
          let disabled = !record.edit;
          return (
            <Radio.Group defaultValue={text} disabled={disabled} onChange={e => state.storageUnitRadioGroupChange(index, e.target.value)} buttonStyle="solid" size="small">
              <Radio.Button value="Y" >正常服务</Radio.Button>
              <Radio.Button value="N" >维护状态</Radio.Button>
            </Radio.Group>
          )
        }
      },
      {
        title: "操作",
        dataIndex: "operation",
        fixed: 'right',
        width: 150,
        render: (text, record) => {
          return record.edit ? (
            <span>
              <Button
                type="primary" size="small" style={{ marginRight: "5px" }}
                onClick={() => this.updateUnit(record)}>
                保存
              </Button>
              <Popconfirm title="是否确认删除当前单元？" onConfirm={() => this.deleteUnit(record)}>
                <Button type="danger" size="small">删除</Button>
              </Popconfirm>
            </span>
          ) : (
              <Button type="primary" size="small" onClick={() => this.editRecord(record)}>
                编辑
            </Button>
            )
        }
      }
    ];

    if (/san/.test(path)) {
      columns.splice(3, 0, {
        title: "关联网络单元",
        dataIndex: "关联网络单元"
      })
    }

    return columns;
  }

  UNSAFE_componentWillMount() {
    const { pathname, id } = getQueryVariable(this, "id");
    if (id) {
      // 存储级别页面（特定存储资源池下特定级别）存储级别基本信息查询
      state.getStorageLevelInfoById(id).then(() => {
        let {id} = state.resourceInfo;
        this.setState({
          addValues: {id}
        });
      });
      // 根据 ID 获取存储级别页面存储单元列表查询
      state.getStorageUnitListByStorageLevelId(id);
      // 获取所有管理机列表
      state.getManageServerList();
      if(/nas/.test(pathname)) {
        // 存储级别页面所有未被单元添加且有效的NAS控制器名称列表
        state.getNASStorageControlList();
      }else if(/san/.test(pathname)) {
        // 获取未关联的SAN存储设备列表
        state.getFreeSanStorageList();
        // 获取所有网络单元
        state.getAllNetWorkUnitList();
      }
    } else {
      message.warning('当前页面没有获取正确参数，请点击左侧导航重新获取！');
    }
  }

  render() {
    return (
      <Card>
        <Card
          title="基本信息"
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }}
          style={{ marginBottom: "24px" }} >
          <BasicInfo infos={BasicInfoList} dataSource={state.resourceInfo} />
          <ProgressInfo
            title="容量"
            titColor="blue"
            infos={CapacityList}
            proportion={{ total: "totalInitialCapacity", part: ["currentAllocatedCapacity", "totalUsedCapacity"] }}
            dataSource={{ totalInitialCapacity: state.resourceInfo.totalInitialCapacity, currentAllocatedCapacity: state.resourceInfo.currentAllocatedCapacity, totalUsedCapacity: state.resourceInfo.totalUsedCapacity }} />
          <ProgressInfo
            title="MBPS"
            titColor="green"
            infos={MBPSList}
            proportion={{ total: "totalInitialMBPS", part: "currentAllocatedMBPS" }}
            dataSource={{ totalInitialMBPS: state.resourceInfo.totalInitialMBPS, currentAllocatedMBPS: state.resourceInfo.currentAllocatedMBPS }} />
          <ProgressInfo
            title="IOPS"
            titColor="orange"
            infos={IOPSList}
            proportion={{ total: "totalInitialIOPS", part: "currentAllocatedIOPS" }}
            dataSource={{ totalInitialIOPS: state.resourceInfo.totalInitialIOPS, currentAllocatedIOPS: state.resourceInfo.currentAllocatedIOPS }} />
        </Card>
        <Card
          title={state.menuItem?.title}
          className="card"
          headStyle={{ backgroundColor: "rgba(244, 247, 253, 1)" }} >
          <Row type="flex" justify="end">
            <Col span={3} style={{ marginBottom: "24px" }}>
              <Button onClick={this.showModal} type="primary">添加单元</Button>
            </Col>
            <Col span={24}>
              <Table
                rowKey={record => record.id}
                scroll={{ y: "76vh", x: 1700 }} pagination={false} bordered size="middle"
                columns={this.initColumns(this.props.location.pathname)}
                dataSource={state.resourceList} />
            </Col>
          </Row>
        </Card>
        <Modal
          title="添加单元"
          okText="确认"
          cancelText="取消"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div style={{height: "50vh", overflowY: "auto"}}>
            <AddUnit 
              path={this.props.location.pathname}
              setForm={form => { this.form = form }} />
          </div>
        </Modal>
      </Card>
    )
  }
}

export default withRouter(Resource)
