export const BasicInfoList =  [
  {
    label: "单元名称",
    key: "name",
  },
  {
    label: "资源类型",
    key: "deviceCategoryId"
  },
  {
    label: "设备厂商",
    key: "manufacturer"
  },
  {
    label: "数据中心",
    key: "dataCenterName"
  },
  {
    label: "设备位置",
    key: "position",
  },
  {
    label: "服务状态",
    key: "status",
    render: text => {
      if(text === "Y") {
        return "正常服务"
      }else if(text === "N") {
        return "维护状态"
      }
    }
  }
];