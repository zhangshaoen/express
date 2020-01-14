export const BasicInfoList =  [
  {
    label: "存储名称",
    key: "name",
  },
  {
    label: "序列号",
    key: "sn"
  },
  {
    label: "厂商",
    key: "manufacturer",
  },
  {
    label: "管理IP",
    key: "manageIp"
  },
  {
    label: "存储类型",
    key: "type",
  },{
    label: "设备型号",
    key: "model",
  },
  {
    label: "数据中心",
    key: "dataCenter"
  },
  {
    label: "设备位置",
    key: "position",
  },
  {
    label: "存储状态",
    key: "status",
    render: text => {
      if(text === "Y") {
        return "正常服务"
      }else if(text === "N"){
        return "维护状态"
      }
    }
  },
  {
    label: "镜像存储名称",
    key: "",
  },
];
export const CapacityList =  [
  [
    {
      label: "容量",
      key: "ainitialCapacity",
    },
    {
      label: "容量分配比例最大值",
      key: "capacityMaxAllocationRatio"
    },
  ],
  [
    {
      label: "已分配容量",
      key: "allocatedCapacity"
    },
    {
      label: "当前容量分配比例",
      key: "capacityAllocationRatio"
    },
  ]
];

export const MBPSList =  [
  [
    {
      label: "初始化MBPS",
      key: "initialMbps",
    },
    {
      label: "MBPS分配比例最大值",
      key: "mbpsMaxAllocationRatio"
    },
  ],
  [
    {
      label: "已分配MBPS",
      key: "usedMbps"
    },
    {
      label: "当前MBPS分配比例",
      key: "mbpsAllocationRatio"
    },
  ]
];

export const IOPSList =  [
  [
    {
      label: "初始化IOPS",
      key: "finitialIops",
    },
    {
      label: "IOPS分配比例最大值",
      key: "iopsMaxAllocationRatio"
    },
  ],
  [
    {
      label: "已分配IOPS",
      key: "usedIops"
    },
    {
      label: "当前IOPS分配比例",
      key: "iopsAllocationRatio"
    },
  ]
];