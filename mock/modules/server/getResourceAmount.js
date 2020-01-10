const { formatMockData } = require('../utils/util');
const Mock = require('mockjs');

const formatData = formatMockData("", "", "", {
  "code": 0,
  "data|3": [
    {
      "deviceCategories": [
        {
          "code|1": "",
          "dataCenterId|1": ["san", "nas", "switch"],
          "id|1": "",
          "isActive|1": "",
          "name|1": ["SAN", "NAS", "交换机"],
          "remark": "@word(3, 15)",
          "resourceTotal|1-100": 100,
          "storageResourcePools|2": [
            {
              "deviceCategoryId|1": "",
              "id|1": "",
              "isActive|1": "",
              "name|1": ["生产资源池", "多活资源池", "灾备资源池", "AP资源池"],
              "remark": "@word(3, 15)",
              "storageLevels|3": [
                {
                  "currentAllocatedCapacityRatio|1-100": 100,
                  "currentAllocatedIOPSRatio|1-100": 100,
                  "currentAllocatedMBPSRatio|1-100": 100,
                  "dataCenter": "",
                  "id|1": "",
                  "isActive|1": "",
                  "name|1": ["北京洋桥数据中心",  "北京稻香湖数据中心", "武汉南湖数据中"],
                  "remark": "@word(3, 15)",
                  "resourceTotal|1-100": 100,
                  "storageResourcePoolId|1": "",
                  "totalInitialCapacity|1-100": 100,
                  "unitsAmount": 0
                }
              ]
            }
          ]
        }
      ],
      "id|1": ["yanqiao", "daoxianhu", "wuhannanhu"],
      "isActive|1": "",
      "name|1": ["北京洋桥数据中心",  "北京稻香湖数据中心", "武汉南湖数据中"],
      "nasAvailableCapacityRatio|1-100": 100,
      "nasResourceTotal|1-100": 100,
      "remark": "@word(3, 15)",
      "resourceTotal|1-100": 100,
      "sanAvailableCapacityRatio|1-100": 100,
      "sanResourceTotal|1-100": 100,
      "switchPortRatio|1-100": 100,
      "switchResourceTotal|1-100": 100
    }
  ],
  "message": ""
})
const url = "/view/getResourceAmount";
const method = "get";

module.exports = {
  router: url,
  method,
  data: (req, res) => {
    res.json(Mock.mock(formatData))
  },
}
