import React from "react";
import { Button, Popconfirm } from 'antd';

export const storagePool = [
  {
    title: "存储池名称",
    dataIndex: "name"
  },
  {
    title: "可用容量",
    dataIndex: "availableCapacity"
  },
  {
    title: "已分配容量",
    dataIndex: "allocatedCapacity"
  },
  {
    title: "预分配容量",
    dataIndex: "beforAllocatedCapacity"
  },
  {
    title: "剩余容量",
    dataIndex: "surplusCapacity"
  },
  {
    title: "分配比例",
    dataIndex: "distributionRate"
  },
  {
    title: "LUN总数",
    dataIndex: "lunTotal"
  },
  {
    title: "LUN已分配数",
    dataIndex: "lunAssigned"
  },
  {
    title: "LUN预分配数量",
    dataIndex: "LUN预分配数量"
  },
  {
    title: "LUN剩余数量",
    dataIndex: "lunResiduals"
  }
];

export const lun = [
  {
    title: "存储池名称",
    dataIndex: "sanStoragePoolName",
    fixed: 'left',
    width: 150
  },
  {
    title: "LUN ID",
    dataIndex: "lunId",
  },
  {
    title: "LUN大小（G）",
    dataIndex: "lunSize",
  },
  {
    title: "所属view",
    dataIndex: "viewName",
  },
  {
    title: "状态",
    dataIndex: "isUse",
  },
  {
    title: "关联主机名称",
    dataIndex: "关联主机名称",
    fixed: 'right',
    width: 150,
  },
];

export const portGrout = [
  {
    title: "分组名称",
    dataIndex: "name",
    fixed: 'left',
    width: 150,
  },
  {
    title: "存储名称",
    dataIndex: "storageName",
  },
  {
    title: "VSAN名称",
    dataIndex: "vsanName",
  },
  {
    title: "初始MBPS",
    dataIndex: "initialMbps",
  },
  {
    title: "剩余MBPS",
    dataIndex: "surplusMbps",
  },
  {
    title: "初始IOPS",
    dataIndex: "initialIops",
  },
  {
    title: "剩余IOPS",
    dataIndex: "surplusIops",
  },
  {
    title: "状态",
    dataIndex: "isUse",
  },
  {
    title: "操作",
    dataIndex: "operation",
    fixed: 'right',
    width: 150,
    render: (text, record, index) => (
      <span>
        <Button onClick={() => this.showModal("update", record)} type='primary' size="small" style={{ marginRight: "10px" }}>编辑</Button>
        <Popconfirm title="是否确认删除当前设备？" onConfirm={() => this.deleteStoCon(record)}>
          <Button type='danger' size="small">删除</Button>
        </Popconfirm>
      </span>
    )
  },
];

export const port = [
  {
    title: "端口名称",
    dataIndex: "name",
    fixed: 'left',
    width: 150,
  },
  {
    title: "端口wwn",
    dataIndex: "wwn",
  },
  {
    title: "所在Fabric",
    dataIndex: "fabricName",
  },
  {
    title: "所属Vsan",
    dataIndex: "vsanName",
  },
  {
    title: "连接交换机名称",
    dataIndex: "连接交换机名称",
  },
  {
    title: "交换机端口号",
    dataIndex: "交换机端口号",
  },
]