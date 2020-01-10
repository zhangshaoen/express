const menuList = [
  {
    key: "/home",
    title: "建行数据中心",
    childrens: [
      {
        key: "/home/base",
        title: "北京洋桥数据中心",
        childrens: [
          {
            key: "/home/san",
            title: "SAN存储",
            childrens: [
              {
                key: "/home/san/resourcePool",
                title: "生产资源池",
                childrens: [
                  {
                    key: "/home/san/resource",
                    title: "白金NAS",
                    childrens: [
                      {
                        key: "/home/san/unit",
                        title: "单元01",
                        childrens: [
                          {
                            key: "/home/sanDevice",
                            title: "Netapp-nas-01",
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            key: "/home/nas",
            title: "NAS存储",
            childrens: [
              {
                key: "/home/nas/resourcePool",
                title: "生产资源池",
                childrens: [
                  {
                    key: "/home/nas/resource",
                    title: "白金NAS",
                    childrens: [
                      {
                        key: "/home/nas/unit",
                        title: "单元01",
                        childrens: [
                          {
                            key: "/home/nasDevice",
                            title: "Netapp-nas-01",
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
    ]
  }
]

export default menuList;