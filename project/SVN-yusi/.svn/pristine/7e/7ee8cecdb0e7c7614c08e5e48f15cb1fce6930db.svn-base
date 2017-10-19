package ekuter.mvc.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ekuter.mvc.constants.Constants;
import ekuter.mvc.exception.BusinessException;
import ekuter.mvc.util.DateUtil;
import ekuter.mvc.util.ResultMessageUtil;
import mybatisPro.mybatisService.impl.RainfallStatisticsService;

/**
 * 雨量统计
 * 
 * @date 2017年8月14日
 * @version 1.0
 */
@RestController
@RequestMapping("rainController")
public class RainfallStatisticsController {

	private static final Logger logger = LoggerFactory.getLogger(RainfallStatisticsController.class);

	@Autowired
	private RainfallStatisticsService rainService;

	/**
	 * 年雨量统计
	 * 
	 * @param year
	 *            年份
	 * @param type
	 *            测站类型
	 * @return
	 */
	@RequestMapping("yearRainInfo")
	public ResultMessageUtil rainInfoYear(String year, Integer type) {
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		if (year.isEmpty()) {
			logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
		}
		List<Map<String, Object>> rain_info = rainService.statisticsByYear(year, type);
		if (rain_info.isEmpty()) {
			resultMsg.setMsg("无该年份雨量数据");
			resultMsg.setStatus(0);
			return resultMsg;
		}
		resultMsg.setData(rain_info);
		resultMsg.setStatus(0);
		return resultMsg;
	}

	/**
	 * 天雨量统计
	 * 
	 * @param days
	 *            格式为：yyyy-mm-dd
	 * @param type
	 *            测站类型
	 * @return
	 */
	@RequestMapping("dayRainInfo")
	public ResultMessageUtil rainInfoDay(String days) {
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		if (days.isEmpty()) {
			logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
		}
		DateUtil uitl = new DateUtil();
		if (!uitl.checkDate(days)) {
			resultMsg.setMsg("日期格式错误  格式为：yyyy-mm-dd");
			resultMsg.setStatus(0);
			return resultMsg;
		}
		List<Map<String, Object>> rain_info = rainService.statisticsByDay(days);
		if (rain_info.isEmpty()) {
			resultMsg.setMsg("无该天份雨量数据");
			resultMsg.setStatus(0);
			return resultMsg;
		}
		resultMsg.setData(rain_info);
		resultMsg.setStatus(0);
		return resultMsg;
	}

	/**
	 * 月雨量统计
	 * 
	 * @param month
	 *            格式为：yyyy-mm
	 * @return
	 */
	@RequestMapping("monthsRainInfo")
	public ResultMessageUtil rainInfoMonth(String month, Integer type) {
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		if (month.isEmpty()) {
			logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
		}
		DateUtil uitl = new DateUtil();
		if (!uitl.checkMonth(month)) {
			resultMsg.setMsg("日期格式错误  格式为：yyyy-mm");
			resultMsg.setStatus(0);
			return resultMsg;
		}
		List<Map<String, Object>> rain_info = rainService.statisticsByMonth(month, type);
		if (rain_info.isEmpty()) {
			resultMsg.setMsg("无该月份雨量数据");
			resultMsg.setStatus(0);
			return resultMsg;
		}
		resultMsg.setData(rain_info);
		resultMsg.setStatus(0);
		return resultMsg;
	}

}
