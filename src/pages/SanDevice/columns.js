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
    title: "序号",
    dataIndex: "序号",
    fixed: 'left',
    width: 50,
  },
  {
    title: "Fabric1-Port",
    dataIndex: "Fabric1-Port",
  },
  {
    title: "Fabric2-Port",
    dataIndex: "Fabric2-Port",
  },
  {
    title: "已用MBPS",
    dataIndex: "已用MBPS",
  },
  {
    title: "预分配MBPS",
    dataIndex: "预分配MBPS",
  },
  {
    title: "已用IOPS",
    dataIndex: "已用IOPS",
  },
  {
    title: "预分配IOPS",
    dataIndex: "预分配IOPS",
  },
  {
    title: "是否可用",
    dataIndex: "是否可用",
  },
  {
    title: "操作",
    dataIndex: "operation",
    fixed: 'right',
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