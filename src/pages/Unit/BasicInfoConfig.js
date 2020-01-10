export const BasicInfoList =  [
  {
    label: "单元名称",
    key: "name",
  },
  {
    label: "设备名称",
    key: "storageEquipmentNames"
  },
  {
    label: "当前状态",
    key: "status",
    render: text => {
      if(text === "Y") {
        return "正常服务"
      }else if(text === "N") {
        return "维护状态"
      }
    }
  },
  {
    label: "所属数据中心",
    key: "dataCenter"
  },
  {
    label: "部署楼宇",
    key: "deploymentLocation",
  }
];

export const CapacityList =  [
  [
    {
      label: "容量",
      key: "initialCapacity",
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
      key: "initialIops",
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
