export const BasicInfoList =  [
  {
    label: "资源池名称",
    key: "name",
  },
  {
    label: "所属数据中心",
    key: "dataCenterName"
  }
];

export const CapacityList =  [
  [
    {
      label: "初始化容量",
      key: "totalInitialCapacity",
    },
    {
      label: "",
      key: null
    },
  ],
  [
    {
      label: "已分配容量",
      key: "currentAllocatedCapacity"
    },
    {
      label: "已使用容量",
      key: "totalUsedCapacity"
    },
  ]
];

export const MBPSList =  [
  [
    {
      label: "初始化MBPS",
      key: "totalInitialMBPS",
    },
    {
      label: "",
      key: ""
    },
  ],
  [
    {
      label: "已分配MBPS",
      key: "currentAllocatedMBPS"
    },
    {
      label: "",
      key: ""
    },
  ]
];

export const IOPSList =  [
  [
    {
      label: "初始化IOPS",
      key: "totalInitialIOPS",
    },
    {
      label: "",
      key: ""
    },
  ],
  [
    {
      label: "已分配IOPS",
      key: "currentAllocatedIOPS"
    },
    {
      label: "",
      key: ""
    },
  ]
];