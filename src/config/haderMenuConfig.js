import urlBase from './urlBase';
const headerMenuList = [
  {
    key: urlBase + "/home",
    icon: "appstore",
    title: "存储资源池"
  },
  {
    key: urlBase + "/storageDevice",
    icon: "apartment",
    title: "存储设备管理",
    childrens: [
      {
        key: urlBase + "/sanStorageDevice",
        title: "SAN存储设备管理"
      },
      {
        key: urlBase + "/nasStorageDevice",
        title: "NAS存储设备管理"
      },
      {
        key: urlBase + "/fiberSwitchManage",
        title: "光纤交换机管理"
      },
      {
        key: urlBase + "/storageManagement",
        title: "存储管理机管理"
      },
    ]
  },
  {
    key: urlBase + "/acquisition",
    icon: "dashboard",
    title: "定时数据采集"
  },
  {
    key: urlBase + "/set",
    icon: "setting",
    title: "设置"
  }
]

export default headerMenuList;