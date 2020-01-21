import ajax from './ajax';

const BASE = "";

// 展示左侧树
export const reqLeftTree = () => ajax(`${BASE}/view/getTree`);


// 数据中心资源总数及占比
export const reqResourceAmount = () => ajax(`${BASE}/view/getResourceAmount`);
// 数据中心下设备数量及占比
export const reqDeviceTypeNum = () => ajax(`${BASE}/view/getDeviceTypeNum`);
// 数据中心存储设备类型及占比
export const reqNumByDeviceType = () => ajax(`${BASE}/view/getNumByDeviceType`);


// 数据中心设备总览
export const reqDeviceTypeNumByDataCenter = dataCenterId => ajax(`${BASE}/view/getDeviceTypeNumByDataCenter`, {dataCenterId});
// 数据中心各存储设备分配占比
export const reqDeviceTypePercentageByDataCenter = dataCenterId => ajax(`${BASE}/view/getDeviceTypePercentageByDataCenter`, {dataCenterId});
// 数据中心资源池分配比例趋势图
export const reqDistributionRatioTrendByPool = (storagePoolId, date) => ajax(`${BASE}/view/getDistributionRatioTrendByPool`, {storagePoolId, date});
// 数据中心各资源池设备数量占比
export const reqDeviceNumByPool = storagePoolId => ajax(`${BASE}/view/getDeviceNumByPool`, {storagePoolId});
// 数据中心各资源池设备容量占比
export const reqDeviceCapacityByPool = storagePoolId => ajax(`${BASE}/view/getDeviceCapacityByPool`, {storagePoolId});
// 获取数据中心下资源池列表
export const reqStoragePoolListByDataCenter = dataCenterId => ajax(`${BASE}/view/getStoragePoolListByDataCenter`, {dataCenterId});


// 存储类型页面存储列表查询
export const reqStorageListByDeviceCategory = deviceCategoryId => ajax(`${BASE}/view/getStorageListByDeviceCategory`, {deviceCategoryId});


// 存储资源池页面资源池信息（含所有存储级别）查询
export const reqStorageLevelInfoByStorageResourcePool = storageResourcePoolId => ajax(`${BASE}/view/getStorageLevelInfoByStorageResourcePool`, {storageResourcePoolId});
// 存储资源池页面存储设备级别命名查询
export const reqStorageLevelNameByStorageResourcePool = storageResourcePoolId => ajax(`${BASE}/view/getStorageLevelNameByStorageResourcePool`, {storageResourcePoolId});
// 存储资源池页面存储设备级别命名新增
export const reqAddStorageLevel = storageLevel => ajax(`${BASE}/view/addStorageLevel`, storageLevel, "POST");
// 存储资源池页面存储设备级别命名编辑
export const reqUpdateStorageLevelName = storageLevel => ajax(`${BASE}/view/updateStorageLevelName`, storageLevel, "PUT");
// 存储资源池页面存储设备级别删除
export const reqDeleteStorageLevel = storageLevel => ajax(`${BASE}/view/deleteStorageLevel`, storageLevel, "DELETE");


// 存储级别页面（特定存储资源池下特定级别）存储级别基本信息查询
export const reqStorageLevelInfoById = storageLevelId => ajax(`${BASE}/view/getStorageLevelInfoById`, {storageLevelId});
// 存储级别页面存储单元列表查询
export const reqStorageUnitListByStorageLevelId = storageLevelId => ajax(`${BASE}/view/getStorageUnitListByStorageLevel`, {storageLevelId});
// 存储级别页面（特定存储资源池下特定级别）存储单元新增
export const reqAddStorageUnit = storageUnit => ajax(`${BASE}/view/addStorageUnit`, storageUnit, "POST");
// 存储级别页面（特定存储资源池下特定级别）存储单元编辑
export const reqUpdateStorageUnit = storageUnit => ajax(`${BASE}/view/updateStorageUnit`, storageUnit, "PUT");
// 存储级别页面（特定存储资源池下特定级别）存储单元删除
export const reqDeleteStorageUnit = storageUnit => ajax(`${BASE}/view/deleteStorageUnit`, storageUnit, "DELETE");
// 获取所有管理机列表
export const reqManageServerList = () => ajax(`${BASE}/view/switch/getManageServerList`);
// 存储级别页面所有未被单元添加且有效的NAS控制器名称列表
export const reqNASStorageControlList = () => ajax(`${BASE}/view/getNASStorageControlList`);
// 获取未关联的SAN存储设备列表
export const reqFreeSanStorageList = () => ajax(`${BASE}/view/getFreeSanStorageList`);
// 获取所有网络单元
export const reqAllNetWorkUnitList = () => ajax(`${BASE}/view/switch/getAllNetWorkUnitList`);


// 存储单元页面基本信息查询
export const reqStorageUnitInfoById = storageUnitId => ajax(`${BASE}/view/getStorageUnitInfoById`, {storageUnitId});
// 存储单元页面存储控制器列表查询
export const reqStorageControlListByStorageUnit = storageUnitId => ajax(`${BASE}/view/getStorageControlListByStorageUnit`, {storageUnitId});
// 获取SAN存储设备列表
export const reqSanStorageList = storageUnitId => ajax(`${BASE}/view/getSanStorageList`, {storageUnitId});
// 存储单元页面存储控制器列表项新增
export const reqAddStorageControl = storageUnit => ajax(`${BASE}/view/addStorageControl`, storageUnit, "POST");
// SAN存储设备新增
export const reqSanStorage = storage => ajax(`${BASE}/view/saveSanStorage`, storage, "POST");
// 存储单元页面存储控制器列表项编辑
export const reqUpdateStorageControl = storageControl => ajax(`${BASE}/view/updateStorageControl`, storageControl, "PUT");
// 存储单元页面存储设备列表项编辑
export const reqUpdateStorageDevice = storage => ajax(`${BASE}/view/updateStorageDevice`, storage, "PUT");
// 存储单元页面存储控制器列表项删除
export const reqDeleteStorageControl = storageControl => ajax(`${BASE}/view/deleteStorageControl`, storageControl, "DELETE");
// 存储单元页面存储设备列表项删除
export const reqDeleteStorageDevice = storage => ajax(`${BASE}/view/deleteStorageDevice`, storage, "DELETE");


// NAS 存储控制器页面基本信息查询
export const reqStorageControlInfoByName = storageControlName => ajax(`${BASE}/view/getStorageControlInfoByName`, {storageControlName});
// 存储控制器页面NAS卷列表查询
export const reqNasVolumeListByStorageControl = storageControlName => ajax(`${BASE}/view/getNasVolumeListByStorageControl`, {storageControlName});

// SAN 展示存储设备信息
export const reqStorageByStorageName = storageName => ajax(`${BASE}/view/getStorageByStorageName`, {storageName});
// 展示存储设备下存储池列表
export const reqStoragePoolByStorageName = storageName => ajax(`${BASE}/view/getStoragePoolByStorageName`, {storageName});
// 展示存储设备下LUN列表
export const reqStorageLunByStorageName = (storageName, sanStoragePoolName, viewName) => ajax(`${BASE}/view/getStorageLunByStorageName`, {storageName, sanStoragePoolName, viewName});
// 获取所有view列表
export const reqViewList = () => ajax(`${BASE}/view/getViewList`);
// 展示存储设备下端口列表
export const reqStoragePortByStorageName = (storageName, fabricName) => ajax(`${BASE}/view/getStoragePortByStorageName`, {storageName, fabricName});
// 获取所有FABRIC
export const reqFabricList = () => ajax(`${BASE}/view/switch/getFabricList`);
// 获取端口分组列表
export const reqPortGroupList = storageName => ajax(`${BASE}/view/getPortGroupList`, {storageName});
// 编辑端口分组
export const reqUpdatePortGroup = portCustomGroup => ajax(`${BASE}/view/updatePortGroup`, portCustomGroup, "PUT");
// 删除端口分组
export const reqDeletePortGroup = portCustomGroupName => ajax(`${BASE}/view/deletePortGroup?portCustomGroupName=${portCustomGroupName}`, {}, "DELETE");
// 端口分组根据存储设备名称获取对应VSAN列表
export const reqVsanListByStorageName = storageName => ajax(`${BASE}/view/getVsanListByStorageName`, {storageName});
// 添加端口分组
export const reqAddPortGroup = portCustomGroup => ajax(`${BASE}/view/addPortGroup`, portCustomGroup, "POST");

// 获取设备类型信息
export const reqDeviceCategory = deviceCategoryId => ajax(`${BASE}/view/switch/getDeviceCategory`, {deviceCategoryId});
// 获取网络单元列表
export const reqNetWorkUnitList = deviceCategoryId => ajax(`${BASE}/view/switch/getNetWorkUnitList`, {deviceCategoryId});
// 获取所有未分配的FABRIC
export const reqIdleFabricList = () => ajax(`${BASE}/view/switch/getIdleFabricList`);
// 删除网络单元
export const reqDeleteNetWorkUnit = netWorkUnitId => ajax(`${BASE}/view/switch/deleteNetWorkUnit?netWorkUnitId=${netWorkUnitId}`, {}, "DELETE");
// 修改网络单元
export const reqUpdateNetWorkUnit = netWorkUnit => ajax(`${BASE}/view/switch/updateNetWorkUnit`, netWorkUnit, "PUT");
// 添加网络单元
export const reqAddNetWorkUnit = netWorkUnit => ajax(`${BASE}/view/switch/addNetWorkUnit`, netWorkUnit, "POST");


// 获取网络单元信息
export const reqNetWorkUnit = netWorkUnitId => ajax(`${BASE}/view/switch/getNetWorkUnit`, {netWorkUnitId});
// 获取VSAN列表
export const reqVsanList = netWorkUnitId => ajax(`${BASE}/view/switch/getVsanList`, {netWorkUnitId});


// 获取FABRIC
export const reqFabric = fabricName => ajax(`${BASE}/view/switch/getFabric`, {fabricName});
// 获取端口关联列表
export const reqPortRefList = (fabricName, switchName, vsanName, pageNumber, pageSize) => ajax(`${BASE}/view/switch/getPortRefList?fabricName=${fabricName}&switchName=${switchName}&vsanName=${vsanName}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
// 物理交换机列表根据FabricName
export const reqSwitchListByFabricName = fabricName => ajax(`${BASE}/view/switch/getSwitchListByFabricName`, {fabricName});
// 获取vsan列表根据FabricName
export const reqVsanListByFabricName = fabricName => ajax(`${BASE}/view/switch/getVsanListByFabricName`, {fabricName});


// 物理交换机列表
export const reqSwitchList = (fabricName, pageNumber, pageSize) => ajax(`${BASE}/view/switch/getSwitchList?fabricName=${fabricName}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
// 获取zone列表
export const reqZoneRefList = (fabricName, zoneName, zoneSetName, vsanName, pageNumber, pageSize) => ajax(`${BASE}/view/switch/getZoneRefList?fabricName=${fabricName}&zoneName=${zoneName}&zoneSetName=${zoneSetName}&vsanName=${vsanName}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
// 获取zone列表根据FabricName
export const reqZoneRefListByFabricName = fabricName => ajax(`${BASE}/view/switch/getZoneRefListByFabricName`, {fabricName});
// 获取zoneSet列表根据FabricName
export const reqZoneSetListByFabricName = fabricName => ajax(`${BASE}/view/switch/getZoneSetListByFabricName`, {fabricName});

