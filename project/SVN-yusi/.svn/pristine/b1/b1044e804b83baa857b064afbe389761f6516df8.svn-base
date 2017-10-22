package ekuter.mvc.controller;

import java.util.HashMap;
import java.util.Map;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ekuter.mvc.constants.Constants;
import ekuter.mvc.util.LoadExceProperties;
import ekuter.mvc.util.ResultMessageUtil;

/**
 * 返回地图服务配置数据
 * @author si.yu
 * @date 2017/09/13
 * @version 1.0
 * */
@RestController
@RequestMapping("geoServer")
public class GeoServerConfigController {
	
//	private static final Logger logger = LoggerFactory.getLogger(GeoServerConfigController.class);
	
	//地图服务设置
	private static final String GEOSERVER_CONF = "geo-server.properties";
	
	/**
	 * 返回地图配置
	 * @return
	 * */
	@RequestMapping("config")
	public ResultMessageUtil getGeoServerConfig(){
		
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		
		readExceMessage();
		
		Map<String, Object> geoConfig = new HashMap<String,Object>();
		
		geoConfig.put("LAYERS", Constants.EXCEPTION_MAP.get("LAYERS"));
		geoConfig.put("VERSION", Constants.EXCEPTION_MAP.get("VERSION"));
		geoConfig.put("BBOX", Constants.EXCEPTION_MAP.get("BBOX"));
		geoConfig.put("CRS", Constants.EXCEPTION_MAP.get("CRS"));
		geoConfig.put("WIDTH", Constants.EXCEPTION_MAP.get("WIDTH"));
		geoConfig.put("HEIGHT", Constants.EXCEPTION_MAP.get("HEIGHT"));
		geoConfig.put("projection", Constants.EXCEPTION_MAP.get("PROJECTION"));
		geoConfig.put("url", Constants.EXCEPTION_MAP.get("URL"));
		geoConfig.put("extent", Constants.EXCEPTION_MAP.get("EXTENT"));
		geoConfig.put("center", Constants.EXCEPTION_MAP.get("CENTER"));
		geoConfig.put("zoom", Constants.EXCEPTION_MAP.get("ZOOM"));
		geoConfig.put("maxZoom", Constants.EXCEPTION_MAP.get("MAXZOOM"));
		geoConfig.put("minZoom", Constants.EXCEPTION_MAP.get("MINZOOM"));
		
		
		resultMsg.setData(geoConfig);
		
		return resultMsg;
	}
	
	/**
	 * 读取异常配置文件
	 * @param key
	 * @return
	 * */
  public static void readExceMessage(){
  	String conf_path = GEOSERVER_CONF;
  	LoadExceProperties.loadExceptionFile(conf_path);
  }
}
