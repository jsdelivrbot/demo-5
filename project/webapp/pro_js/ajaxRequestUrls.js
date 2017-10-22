/**
 * 所有前台数据请求跳转后台接口URL Created by EKuter-amu on 2017/6/20.
 */

/* 登录 */
var submitLoginFormUrl = "loginController/login";

/* 测站信息管理 */
var createStationUrl = "station/createStation";//创建测站
var getStationListUrl = "station/getStationList";//查询测站列表
var getStationInfoDetailUrl = "station/getStationInfoDetail";//根据测站ID查询测站信息
var updateStationInfoUrl = "station/updateStationInfo";//修改测站信息
/* 测站类型管理 */
var getTypeListUrl = "stationType/getTypeList";//查询测站类型列表
/* 区域管理 */
var createAreaUrl = "areaController/createArea";//新建区域
var getListOfAreaUrl = "areaController/getListOfArea";//查询区域列表
var getAreaDetailInfoUrl = "areaController/getAreaDetailInfo";//根据区域ID查询区域信息
var updateAreaInfoUrl = "areaController/updateAreaInfo";//修改区域信息
/* 区域平均降雨量查询 */
var areaAverageRainfallUrl = "areaRainfall/areaAverageRainfall";
/* 所有含雨量测站数据信息 */
var rainfallStationCountInfoUrl = "station/rainfallStationList";
/* 根据区域ID查询测站系数列表 */
var getAreaStationParamListUrl = "areaRainfall/getAreaStationParamList";
/* 区域算法管理 */
var analysisManagerUrl = "areaRainfall/analysisManager";
/* 实时信息查询：水库信息查询接口 */
var getWaterLevelInfoUrl = "waterLevel/getWaterLevelInfo";
/* 实时信息查询：河道信息查询接口 */
var getRiverWaterLevelInfoUrl = "waterLevel/getRiverWaterLevelInfo";
/* 水位统计：水库水位数据列表查询接口 */
var getResvoirDataListUrl = "waterLevel/getResvoirDataList";
/* 水位统计：河道水位数据列表查询接口 */
var getRiverDataListUrl = "waterLevel/getRiverDataList";
/* 水位统计：测站列表查询 */
var getStationNameListUrl = "waterLevel/getStationNameList";
/* 水位统计：水库水位Echarts图数据接口 */
var getResvoirDataForEchartsUrl = "waterLevel/getResvoirDataForEcharts";
/* 水位统计：河道水位Echarts图数据接口 */
var getRiverDataForEchartsUrl = "waterLevel/getRiverDataForEcharts";
/*雨量统计：年统计接口*/
var getYearRainInfoUrl = "rainController/yearRainInfo";
/*雨量统计：月统计接口*/
var getMonthRainInfoUrl = "rainController/monthsRainInfo";
/*雨量统计：日统计接口*/
var getDayRainInfoUrl = "rainController/dayRainInfo";

/* 人工报讯功能查询  */
var getManMadeDataListUrl = "manMadeStation/getManMadeDataList";

/* 人工报讯功能新增报讯  */
var manMadeReportDataUrl = "manMadeStation/manMadeReportData";

/* 人工报讯查询报讯状态 */
var getListOfReportStatusUrl = "manMadeStation/getListOfReportStatus";

/* 测站状态列表查询 */
var getStatusInfoListUrl = "stationStatus/getStatusInfoList";

/* 数据修补数据加载接口 */
var getStationDataUrl = "dataSupplement/getStationData";

/* 数据修补数据增补接口 */
var addMonitorDataUrl = "dataSupplement/addMonitorData";

/* 数据修补数据修改接口 */
var updateMonitorDataUrl = "dataSupplement/updateMonitorData";

/* 地图服务配置 */
var geoServerConfigUrl = "geoServer/config";

/* 测站删除 */
var stationDelete = "station/deleteStation";