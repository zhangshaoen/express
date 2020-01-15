/* eslint-disable array-callback-return */
import { observable, action, toJS } from 'mobx';
import headerMenuList from '../config/haderMenuConfig';
import { message } from 'antd';
import { getProperty } from '../utils/getProperty';
import {
  reqLeftTree,
  reqResourceAmount,
  reqDeviceTypeNum,
  reqDeviceTypeNumByDataCenter,
  reqDeviceTypePercentageByDataCenter,
  reqNumByDeviceType,
  reqDeviceNumByPool,
  reqDeviceCapacityByPool,
  reqStoragePoolListByDataCenter,
  reqDistributionRatioTrendByPool,
  reqStorageListByDeviceCategory,
  reqStorageLevelInfoByStorageResourcePool,
  reqStorageLevelNameByStorageResourcePool,
  reqAddStorageLevel,
  reqUpdateStorageLevelName,
  reqDeleteStorageLevel,
  reqStorageUnitListByStorageLevelId,
  reqStorageLevelInfoById,
  reqAddStorageUnit,
  reqDeleteStorageUnit,
  reqUpdateStorageUnit,
  reqStorageUnitInfoById,
  reqStorageControlListByStorageUnit,
  reqSanStorageList,
  reqAddStorageControl,
  reqSanStorage,
  reqUpdateStorageControl,
  reqUpdateStorageDevice,
  reqDeleteStorageControl,
  reqDeleteStorageDevice,
  reqStorageControlInfoByName,
  reqNasVolumeListByStorageControl,
  reqStorageByStorageName,
  reqStoragePoolByStorageName,
  reqStorageLunByStorageName,
  reqStoragePortByStorageName,
  reqManageServerList,
  reqNASStorageControlList,
  reqFreeSanStorageList,
  reqAllNetWorkUnitList,
  reqNetWorkUnitList,
  reqIdleFabricList,
  reqDeviceCategory,
  reqDeleteNetWorkUnit,
  reqUpdateNetWorkUnit,
  reqAddNetWorkUnit,
  reqNetWorkUnit,
  reqVsanList,

  reqFabric,
  reqPortRefList,


  reqSwitchList,
  reqZoneRefList
} from "../api";

class State {
  /**********          面包屑          **********/
  @observable breadcrumbList = [];
  // 面包屑随URL变化
  @action.bound
  breadcrumbByUrl = path => {
    let breadcrumbList = [];
    if (path.indexOf("/home") === 0) {
      breadcrumbList.push("存储资源池");
      this.breadcrumbList = breadcrumbList;
      this.defaultSelectedKeys = [path];
    } else if (path === "/404") {
      breadcrumbList.push("404");
      this.breadcrumbList = breadcrumbList;
    } else {
      headerMenuList.forEach(headerMenu => {
        if (headerMenu.key === path) {
          breadcrumbList.push(headerMenu.title);
        } else if (headerMenu.childrens) {
          let cItem = headerMenu.childrens.find(cItem => path.indexOf(cItem.key) === 0)
          if (cItem) {
            breadcrumbList.push(headerMenu.title);
            breadcrumbList.push(cItem.title);
          }
        }
      })
      this.breadcrumbList = breadcrumbList;
    }
  }
  // 面包屑随 header 点击变化
  @action.bound
  headerMenuClick = menu => {
    let breadcrumbList = [];
    headerMenuList.forEach(item => {
      if (item.key === menu.key) {
        breadcrumbList.push(item.title);
      } else if (item.childrens) {
        let cItem = item.childrens.find(cItem => menu.key.indexOf(cItem.key) === 0)
        if (cItem) {
          breadcrumbList.push(item.title);
          breadcrumbList.push(cItem.title);
        }
      }
    });
    this.breadcrumbList = breadcrumbList;
  }


  /**********          左侧树          **********/
  // 左侧树
  @observable leftTree = [];
  // 左侧树选中项
  @observable defaultSelectedKeys = [];
  // 初始展开的 SubMenu 菜单项
  @observable defaultOpenKeys = [];
  // 页面展示标题
  @observable menuItem = {};
  // 获取左侧树
  @action.bound
  getLeftTree = async (pathname, id) => {
    const result = await reqLeftTree();
    if (result.code === 0) {
      /*** 待开发 ***/
      // 左侧树选中项
      this.defaultSelectedKeys = [id];
      // 左侧导航默认展开
      if (id && id !== "null") {
        // let defaultOpenKeys = filterSubValue(getProperty([result.data].concat([]), "id"), "id", id);
        // console.log(defaultOpenKeys);
        
        // defaultOpenKeys[0] = "home";
        // this.defaultOpenKeys = defaultOpenKeys;
      }



      this.leftTree = getProperty([result.data], "title");
      if (id && id !== "null") {
        // 页面展示标题
        // this.menuItem = filterSubValue([result.data], "id", id);
        // /** 点击刷新面包屑 **/
        // let breadcrumbList = this.menuItem.parent
        // if (breadcrumbList) {
        //   this.breadcrumbList = ["存储资源池", ...breadcrumbList];
        // }

      } else if (id === "null") {
        this.breadcrumbList = ["存储资源池", "建行数据中心"];
        this.defaultSelectedKeys = ["home"];
        this.defaultOpenKeys = ["home"];
      }
    } else {
      message.error("获取左侧树失败！失败信息：" + result.message)
    }
  }
  // 左侧导航点击事件
  @action.bound
  linkClick = item => {
    this.menuItem = item;
    this.defaultSelectedKeys = [item.key];
    /** 点击刷新面包屑 **/
    let breadcrumbList = item.parent;
    if (breadcrumbList) {
      this.breadcrumbList = ["存储资源池", ...breadcrumbList];
    }

    // if(item.id && item.id !== "null") {
    //     // 左侧树选中项
    //     this.selectedKeys = [item.id];
    //     // 左侧导航默认展开
    //     let openKeys = getProperty(this.leftTree, "id", "id", item.id);
    //     openKeys[0] = "home";
    //     this.openKeys = openKeys;
    // }else if (item.id === "null") {
    //   this.breadcrumbList = ["存储资源池", "建行数据中心"];
    //   this.selectedKeys = ["home"];
    //   this.openKeys = ["home"];
    // }

  };
  /**********          建行数据中心          **********/
  // 数据中心资源总数及占比
  @observable resources = [];
  @action.bound
  getHomeCharts = async () => {
    const result = await reqResourceAmount();
    if (result.code === 0) {
      let resources = [];
      result.data.forEach((item, index) => {
        resources.push({ name: item.name, value: item.resourceTotal });
      });
      this.resources = resources;
    } else {
      message.error("获取数据中心资源总数及占比数据失败！失败信息：" + result.message)
    }
  }
  // 数据中心下设备数量及占比
  @observable deviceList = [];
  @action.bound
  getDeviceTypeNum = async () => {
    const result = await reqDeviceTypeNum();
    if (result.code === 0) {
      let deviceList = [];
      result.data.forEach((item, index) => {
        deviceList.push({
          id: item.id,
          title: item.name,
          dataSource: [
            { value: item.sanResourceTotal, name: 'SAN', },
            { value: item.nasResourceTotal, name: 'NAS', },
            { value: item.switchResourceTotal, name: '交换机', }
          ]
        });
      });
      this.deviceList = deviceList;
    } else {
      message.error("获取数据中心下设备数量及占比数据失败！失败信息：" + result.message)
    }
  }
  // 存储设备类型及占比
  @observable devices = [];
  @action.bound
  getNumByDeviceType = async () => {
    const result = await reqNumByDeviceType();
    if (result.code === 0) {
      this.devices = [
        { value: result.data.sanResourceTotal, name: "SAN", },
        { value: result.data.nasResourceTotal, name: 'NAS', },
        { value: result.data.switchResourceTotal, name: '交换机', }
      ]
    } else {
      message.error("获取存储设备类型及占比数据失败！失败信息：" + result.message)
    }
  }


  /**********          BASE          **********/
  // 根据 ID 获取当前数据中心 - 设备总览
  @observable baseRingDataSource = [];
  // 根据 ID 获取当前数据中心 - 各存储设备分配占比
  @observable availableCapacityRatio = [];
  @action.bound
  getBaseRingOrAvaCap = async id => {
    const resultBaseRing = await reqDeviceTypeNumByDataCenter(id);
    if (resultBaseRing.code === 0) {
      this.baseRingDataSource = [
        { value: resultBaseRing.data.sanResourceTotal, name: 'SAN', },
        { value: resultBaseRing.data.nasResourceTotal, name: 'NAS', },
        { value: resultBaseRing.data.switchResourceTotal, name: '交换机', }
      ];
    } else {
      message.error('获取获取当前数据中心设备总览数据失败！失败信息：' + resultBaseRing.message)
    }

    const resultAvaCap = await reqDeviceTypePercentageByDataCenter(id);
    if (resultAvaCap.code === 0) {
      this.availableCapacityRatio = {
        san: resultAvaCap.data.sanAvailableCapacityRatio,
        nas: resultAvaCap.data.nasAvailableCapacityRatio,
        switch: resultAvaCap.data.switchPortRatio,
      };
    } else {
      message.error('获取获取当前数据中心设备总览数据失败！失败信息：' + resultAvaCap.message)
    }
  }
  // 根据 ID 获取数据中心下资源池列表
  @observable resourcePoolOptions = [];
  @observable resourcePoolValue = null;
  @action.bound
  getStoragePoolListByDataCenter = async dataCenterId => {
    let result = await reqStoragePoolListByDataCenter(dataCenterId);
    if(result.code === 0) {
      this.resourcePoolValue = result.data[0].id;
      this.resourcePoolOptions = result.data;
      state.getDevNumOrDevCapByPool(result.data[0].id);
      state.getDistributionRatioTrendByPool(result.data[0].id, this.linkDate);
    }else {
      message.error("获取数据中心下资源池列表");
    }
  }

  // 根据资源池 ID 获取当前数据中心各资源池设备数量占比
  @observable deviceNumByPool = [];
  // 根据资源池 ID 获取当前数据中心各资源池设备容量占比
  @observable deviceCapacityByPool = [];
  @action.bound
  getDevNumOrDevCapByPool = async id => {
    this.resourcePoolValue = id;
    const resultDevNum = await reqDeviceNumByPool(id);
    if (resultDevNum.code === 0) {      
      this.deviceNumByPool = resultDevNum.data.storageLevels.map(item => {
        return { value: item.resourceTotal, name: item.name }
      })
    } else {
      message.error(`获取当前数据中心各资源池设备数量占比数据失败！失败信息：` + resultDevNum.message)
    }

    const resultDevCap = await reqDeviceCapacityByPool(id);
    if (resultDevCap.code === 0) {
      this.deviceCapacityByPool = resultDevCap.data.storageLevels.map(item => {
        return { value: item.currentAllocatedCapacityRatio, name: item.name }
      })
    } else {
      message.error(`获取当前数据中心各资源池设备容量占比数据失败！失败信息：` + resultDevNum.message)
    }
  }
  // 根据  资源池ID 时间 获取当前数据中心资源池分配比例趋势图
  @observable distributionRatioTrendByPool = [];
  @observable linkDate = "WEEK";
  @action.bound
  getDistributionRatioTrendByPool = async (storagePoolId, date) => {
    this.resourcePoolValue = storagePoolId;
    this.linkDate = date;
    const result = await reqDistributionRatioTrendByPool(storagePoolId, date);
    if (result.code === 0) {
      /** 根据  资源池ID 时间 获取当前数据中心资源池分配比例趋势图  **/
      this.distributionRatioTrendByPool = result.data;
    } else {
      message.error('获取当前数据中心资源池分配比例趋势图数据失败！失败信息：' + result.message)
    }
  }
  // 根据折线图图例选中状态展示
  @observable linkSelected = { "容量分配比例": true, "MBPS分配比例": true, "IOPS分配比例": true };
  @action.bound
  linkSelectedChange = value => {
    let selectedList = [
      { key: "capacity", title: "容量分配比例" },
      { key: "mbps", title: "MBPS分配比例" },
      { key: "iops", title: "IOPS分配比例" },
    ];
    let linkSelected = {};
    selectedList.forEach(selected => {
      let { title } = selected;
      if (selected.key !== value && value !== "all") {
        linkSelected[title] = false;
      } else {
        linkSelected[title] = true;
      }
    })
    this.linkSelected = linkSelected;
  }

  /**********          存储列表          **********/
  //NAS存储列表
  @observable storageList = [];
  @action.bound
  getStorageListByDeviceCategory = async id => {
    const result = await reqStorageListByDeviceCategory(id);
    if (result.code === 0) {
      this.storageList = result.data;
    } else {
      message.error(`获取存储类型页面存储列表数据失败！失败信息：` + result.message)
    }
  }


  /**********          资源池          **********/
  // 存储资源池页面资源池信息（含所有存储级别）查询
  @observable resourcePoolList = [];
  @action.bound
  getStorageLevelInfoByStorageResourcePool = async id => {
    const result = await reqStorageLevelInfoByStorageResourcePool(id);
    if (result.code === 0) {
      this.resourcePoolList = result.data;
    } else {
      message.error("获取存储资源池页面资源池列表数据失败！失败信息：" + result.message)
    }
  }
  // 存储资源池页面存储设备级别命名查询
  @observable resourcePoolInfo = [];
  @action.bound
  getStorageLevelNameByStorageResourcePool = async id => {
    const result = await reqStorageLevelNameByStorageResourcePool(id);
    if (result.code === 0) {      
      this.resourcePoolInfo = result.data;
    } else {
      message.error("获取存储资源池页面存储设备级别命名查询数据失败！失败信息：" + result.message)
    }
  }
  // 存储资源池页面存储设备级别命名新增
  @action.bound
  addStorageLevel = async storageLevel => {
    const result = await reqAddStorageLevel(storageLevel);
    if (result.code === 0) {

      message.success(`存储资源池页面存储设备级别命名新增成功！`);
    } else {
      message.error("存储资源池页面存储设备级别命名新增失败！失败信息：" + result.message)
    }
  }
  // 存储资源池页面存储设备级别命名编辑
  @action.bound
  updateStorageLevelName = async storageLevel => {
    const result = await reqUpdateStorageLevelName(storageLevel);
    if (result.code === 0) {

      message.success(`存储资源池页面存储设备级别命名编辑成功！`);
    } else {
      message.error("存储资源池页面存储设备级别命名编辑失败！失败信息：" + result.message)
    }
  }
  // 存储资源池页面存储设备级别删除
  @action.bound
  deleteStorageLevel = async storageLevel => {
    const result = await reqDeleteStorageLevel(storageLevel);
    if (result.code === 0) {

      message.success(`存储资源池页面存储设备级别删除成功！`);
    } else {
      message.error("存储资源池页面存储设备级别删除失败！失败信息：" + result.message)
    }
  }


  /**********          存储级别(资源)          **********/
  // 存储级别页面存储单元列表查询
  @observable resourceList = [];
  @action.bound
  getStorageUnitListByStorageLevelId = async id => {
    const result = await reqStorageUnitListByStorageLevelId(id);
    if (result.code === 0) {
      const edit = { edit: false };
      this.resourceList = result.data.map(item => Object.assign(item, edit));
    } else {
      message.error("获取存储级别页面存储单元列表数据失败！失败信息：" + result.message)
    }
  }
  // 存储级别页面（特定存储资源池下特定级别）存储级别基本信息查询
  @observable resourceInfo = {};
  @action.bound
  getStorageLevelInfoById = async id => {
    const result = await reqStorageLevelInfoById(id);
    if (result.code === 0) {
      this.resourceInfo = result.data;
    } else {
      message.error("获取存储级别页面（特定存储资源池下特定级别）存储级别基本信息数据失败！失败信息：" + result.message)
    }
  }
  // 待开发   存储级别页面（特定存储资源池下特定级别）存储单元新增
  @action.bound
  addStorageUnit = async storageUnit => {
    const result = await reqAddStorageUnit(storageUnit);
    if (result.code === 0) {

      message.success(`存储级别页面（特定存储资源池下特定级别）存储单元新增成功！`);
    } else {
      message.error(`存储级别页面（特定存储资源池下特定级别）存储单元新增失败！失败信息：` + result.message);
    }
  }
  // 存储级别页面 存储单元 状态置换
  @action.bound
  storageUnitRadioGroupChange = (index, value) => {
    let resourceList = this.resourceList.concat([]);
    resourceList[index].status = value;
    this.resourceList = resourceList;
  }
  //存储级别页面（特定存储资源池下特定级别）存储单元编辑
  @action.bound
  updateStorageUnit = async storageUnit => {
    const result = await reqUpdateStorageUnit(storageUnit);
    if (result.code === 0) {
      message.success(`存储级别页面（特定存储资源池下特定级别）存储单元编辑成功！`);
    } else {
      message.error(`存储级别页面（特定存储资源池下特定级别）存储单元编辑失败！失败信息：` + result.message);
    }
  }
  // 存储级别页面（特定存储资源池下特定级别）存储单元删除
  @action.bound
  deleteStorageUnit = async storageUnit => {
    const result = await reqDeleteStorageUnit(storageUnit);
    if (result.code === 0) {

      message.success(`存储级别页面（特定存储资源池下特定级别）存储单元删除成功！`);
    } else {
      message.error(`存储级别页面（特定存储资源池下特定级别）存储单元删除失败！失败信息：` + result.message);
    }
  }

  // 获取所有管理机列表
  @observable manageServerList = [];
  @action.bound
  getManageServerList = async () => {
    const result = await reqManageServerList();
    if (result.code === 0) {
      this.manageServerList = result.data;
    } else {
      message.error("获取获取NAS所有管理机列表数据失败！失败信息：" + result.message)
    }
  }
  // 存储级别页面所有未被单元添加且有效的NAS控制器名称列表
  @observable nassTorageControlList = [];
  @action.bound
  getNASStorageControlList = async () => {
    let result = await reqNASStorageControlList();
    if (result.code === 0) {
      this.nassTorageControlList = result.data;
    } else {
      message.error("存储级别页面所有未被单元添加且有效的NAS控制器名称列表数据失败！失败信息：" + result.message)
    }
  }
  // 获取未关联的SAN存储设备列表
  @observable freeSanStorageList = [];
  @action.bound
  getFreeSanStorageList = async () => {
    let result = await reqFreeSanStorageList();
    if (result.code === 0) {
      this.freeSanStorageList = result.data;
    } else {
      message.error("获取未关联的SAN存储设备列表数据失败！失败信息：" + result.message)
    }
  }
  // 获取所有网络单元
  @observable allNetWorkUnitList = [];
  @action.bound
  getAllNetWorkUnitList = async () => {
    let result = await reqAllNetWorkUnitList();
    if (result.code === 0) {
      this.allNetWorkUnitList = result.data;
    } else {
      message.error("获取所有网络单元数据失败！失败信息：" + result.message)
    }
  }



  /**********          存储单元(资源)          **********/
  // 存储单元页面基本信息查询
  @observable unitBasicInfo = {};
  @action.bound
  getStorageUnitInfoById = async id => {
    const result = await reqStorageUnitInfoById(id);
    if (result.code === 0) {
      this.unitBasicInfo = result.data;
    } else {
      message.error("获取存储单元页面基本信息数据失败！失败信息：" + result.message)
    }
  }
  // 存储单元页面存储控制器列表查询
  @observable unitList = [];
  @action.bound
  getStorageControlListByStorageUnit = async storageUnitId => {
    const result = await reqStorageControlListByStorageUnit(storageUnitId);
    if (result.code === 0) {
      this.unitList = result.data;
    } else {
      message.error("获取存储单元页面存储控制器列表数据失败！失败信息：" + result.message)
    }
  }
  // 获取SAN存储设备列表
  @observable sanUnitList = [];
  @action.bound
  getSanStorageList = async storageUnitId => {
    const result = await reqSanStorageList(storageUnitId);
    if (result.code === 0) {
      this.sanUnitList = result.data;
    } else {
      message.error("获取SAN存储设备列表数据失败！失败信息：" + result.message)
    }
  }
  // 待开发   存储单元页面存储控制器列表项新增
  @action.bound
  addStorageControl = async storageUnit => {
    const result = await reqAddStorageControl(storageUnit);
    if (result.code === 0) {

      message.success(`存储单元页面存储控制器列表项新增成功！`);
    } else {
      message.error("存储单元页面存储控制器列表项新增失败！失败信息：" + result.message)
    }
  }
  // SAN存储设备新增
  @action.bound
  saveSanStorage = async storage => {
    const result = await reqSanStorage(storage);
    if (result.code === 0) {

      message.success(`SAN存储设备新增成功！`);
    } else {
      message.error("SAN存储设备新增失败！失败信息：" + result.message)
    }
  }
  // 存储单元页面存储控制器列表项编辑 
  @action.bound
  updateStorageControl = async storageControl => {
    const result = await reqUpdateStorageControl(storageControl);
    if (result.code === 0) {

      message.success(`存储单元页面存储控制器列表项编辑成功！`);
    } else {
      message.error("存储单元页面存储控制器列表项编辑失败！失败信息：" + result.message)
    }
  }
  // 存储单元页面存储设备列表项编辑
  @action.bound
  updateStorageDevice = async storage => {
    const result = await reqUpdateStorageDevice(storage);
    if (result.code === 0) {

      message.success(`存储单元页面存储设备列表项编辑成功！`);
    } else {
      message.error("存储单元页面存储设备列表项编辑失败！失败信息：" + result.message)
    }
  }
  // 存储单元页面存储控制器列表项删除
  @action.bound
  deleteStorageControl = async storageControl => {  
    const result = await reqDeleteStorageControl(toJS(storageControl));
    if (result.code === 0) {
      message.success(`存储单元页面存储控制器列表项删除成功！`);
    } else {
      message.error("存储单元页面存储控制器列表项删除失败！失败信息：" + result.message)
    }
  }
  // 存储单元页面存储设备列表项删除
  @action.bound
  deleteStorageDevice = async storage => {
    const result = await reqDeleteStorageDevice(toJS(storage));
    if (result.code === 0) {
      message.success(`存储单元页面存储设备列表项删除成功！`);
    } else {
      message.error("存储单元页面存储设备列表项删除失败！失败信息：" + result.message)
    }
  }


  /**********          存储控制器NAS         **********/
  // NAS存储控制器页面基本信息
  @observable nasDeviceInfo = {};
  @action.bound
  getStorageControlInfoByName = async storageControlName => {
    const result = await reqStorageControlInfoByName(storageControlName);
    if (result.code === 0) {      
      this.nasDeviceInfo = result.data;
    } else {
      message.error("获取存储控制器页面基本信息失败！失败信息：" + result.message)
    }
  }
  // 存储控制器页面NAS卷列表查询
  @observable nasDeviceList = [];
  @action.bound
  getNasVolumeListByStorageControl = async storageControlName => {
    const result = await reqNasVolumeListByStorageControl(storageControlName);
    if (result.code === 0) {
      this.nasDeviceList = result.data;

    } else {
      message.error("获取NAS存储控制器页面NAS卷列表失败！失败信息：" + result.message)
    }
  }

  /**********          存储控制器SAN         **********/
  // SAN 展示存储设备信息
  @observable sanDeviceList = [];
  @action.bound
  getStorageByStorageName = async storageName => {
    let result = await reqStorageByStorageName(storageName);
    if (result.code === 0) {   
      this.sanDeviceList = result.data;
    } else {
      message.error("获取SAN存储控制器页面基本信息失败！失败信息：" + result.message)
    }
  }
  // 展示存储设备下存储池列表
  @observable sanDevicePoolList = [];
  @action.bound
  getStoragePoolByStorageName = async storageName => {
    let result = await reqStoragePoolByStorageName(storageName);
    if (result.code === 0) {      
      this.sanDevicePoolList = result.data;
    } else {
      message.error("获取SAN存储设备下存储池列表失败！失败信息：" + result.message)
    }
  }
  // 展示存储设备下LUN列表
  @observable sanDeviceLunList = [];
  @action.bound
  getStorageLunByStorageName = async storageName => {
    let result = await reqStorageLunByStorageName(storageName);
    if (result.code === 0) {        
      this.sanDeviceLunList = result.data;
    } else {
      message.error("获取SAN存储设备下LUN列表失败！失败信息：" + result.message)
    }
  }
  // 展示存储设备下端口列表
  @observable sanDevicePortList = [];
  @action.bound
  getStoragePortByStorageName = async storageName => {
    let result = await reqStoragePortByStorageName(storageName);
    if (result.code === 0) {      
      this.sanDevicePortList = result.data;
    } else {
      message.error("获取SAN存储设备下端口列表失败！失败信息：" + result.message)
    }
  }

  /**********          交换机         **********/
  // 获取设备类型信息
  @observable switchPageInfo = {}
  @action.bound
  getDeviceCategory = async deviceCategoryId => {
    const result = await reqDeviceCategory(deviceCategoryId);
    if (result.code === 0) {
      this.switchPageInfo = result.data;

    } else {
      message.error("获取设备类型信息失败！失败信息：" + result.message)
    }
  }
  // 获取网络单元信息
  @observable switchPageList = [];
  @action.bound
  getNetWorkUnitList = async deviceCategoryId => {
    const result = await reqNetWorkUnitList(deviceCategoryId);
    if (result.code === 0) {
      this.switchPageList = result.data;
    } else {
      message.error("获取网络单元列表失败！失败信息：" + result.message)
    }
  }
  // 获取所有未分配的FABRIC
  @observable idleFabricList = [];
  @action.bound
  getIdleFabricList = async () => {
    const result = await reqIdleFabricList();
    if (result.code === 0) {
      this.idleFabricList = result.data;
    } else {
      message.error("获取网络单元列表失败！失败信息：" + result.message)
    }
  }
  // 删除网络单元
  switchDeleteNetWorkUnit = async netWorkUnitId => {
    const result = await reqDeleteNetWorkUnit(netWorkUnitId);
    if (result.code === 0) {
      message.success(`删除网络单元成功！`);
    } else {
      message.error("删除网络单元失败！失败信息：" + result.message)
    }
  }
  // 修改网络单元
  updateNetWorkUnit = async netWorkUnit => {
    const result = await reqUpdateNetWorkUnit(netWorkUnit);
    if (result.code === 0) {
      message.success(`修改网络单元成功！`);
    } else {
      message.error("修改网络单元失败！失败信息：" + result.message)
    }
  }
  // 添加网络单元
  addNetWorkUnit = async netWorkUnit => {
    const result = await reqAddNetWorkUnit(netWorkUnit);
    if (result.code === 0) {
      message.success(`添加网络单元成功！`);
    } else {
      message.error("添加网络单元失败！失败信息：" + result.message)
    }
  }
  /**********          交换机单元         **********/
  // 获取网络单元信息
  @observable switchUnitInfo = {};
  @action.bound
  getNetWorkUnit = async netWorkUnitId => {
    const result = await reqNetWorkUnit(netWorkUnitId);
    if (result.code === 0) {
      this.switchUnitInfo = result.data;

    } else {
      message.error("获取设备类型信息失败！失败信息：" + result.message)
    }
  }
  // 获取VSAN列表
  @observable switchUnitList = [];
  @action.bound
  getVsanList = async netWorkUnitId => {
    const result = await reqVsanList(netWorkUnitId);
    if (result.code === 0) {
      this.switchUnitList = result.data;

    } else {
      message.error("获取VSAN列表失败！失败信息：" + result.message)
    }
  }



  /**********          交换机FABRIC         **********/
  // 获取FABRIC
  @observable fabricInfo = {};
  @action.bound
  getFabric = async fabricName => {
    let result = await reqFabric(fabricName);
    if (result.code === 0) {
      this.fabricInfo = result.data;
    } else {
      message.error("获取FABRIC信息失败！失败信息：" + result.message)
    }
  }
  // 获取端口关联列表
  @observable portRefList = [];
  @action.bound
  getPortRefList = async (fabricName, pageNumber = 1, pageSize = 100) => {
    let result = await reqPortRefList(fabricName, pageNumber, pageSize);
    if (result.code === 0) {
      // this.portRefList = result.data;
    } else {
      message.error("获取端口关联列表失败！失败信息：" + result.message)
    }
  }





  // 物理交换机列表
  @observable deviceSwitchList = [];
  @action.bound
  getSwitchList = async (fabricName, pageNumber = 1, pageSize = 100) => {
    let result = await reqSwitchList(fabricName, pageNumber, pageSize);
    if (result.code === 0) {
      this.deviceSwitchList = result.data;
    } else {
      message.error("获取端口关联列表失败！失败信息：" + result.message)
    }
  }
  // 获取zone列表
  @observable zoneRefList = [];
  @action.bound
  getZoneRefList = async (fabricName, pageNumber = 1, pageSize = 100) => {
    let result = await reqZoneRefList(fabricName, pageNumber, pageSize);
    if (result.code === 0) {
      this.zoneRefList = result.data;
    } else {
      message.error("获取端口关联列表失败！失败信息：" + result.message)
    }
  }
  

}


const state = new State()

export default state;
