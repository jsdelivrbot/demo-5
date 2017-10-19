package ekuter.mvc.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import ekuter.data.reorganize.DataTag;
import mybatisPro.dataBase.SqlSessionHander;
import mybatisPro.myBatisDao.RainfallStatisticsMapper;
import mybatisPro.myBatisDao.StationStatusMapper;

/**
 * 雨量统计定时工具
 *
 * @date 2017年8月11日
 *
 * @version 1.0
 */
@Component("rainfallTimer")
public class RainfallTimerUtil {

	private static final Logger logger = LoggerFactory.getLogger(RainfallTimerUtil.class);

	private static final int SUCCESS = 0;

	/**
	 * 每小时雨量统计
	 */
	public void rainStatByHours() {
		try {
			SqlSessionHander.SqlExecute(sqlsession -> {
				try {
					RainfallStatisticsMapper rain_mapper = sqlsession.getMapper(RainfallStatisticsMapper.class);
					String now_time = DateUtil.getBeforeTime(0);
					// 检查信息是否已经存在
					int flag = rain_mapper.checkRainInfo(now_time, DataTag.HOUR);
					if (SUCCESS == flag) {
						rain_mapper.statisticsByHour(now_time);
					} else {
						rain_mapper.deleteRainInfo(now_time, DataTag.HOUR);
						rain_mapper.statisticsByHour(now_time);
					}
					sqlsession.commit();
				} catch (Exception e) {
					sqlsession.rollback();
					logger.error(e.getMessage());
				}
				return null;
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
		}
	}

	/**
	 * 每天雨量统计
	 */
	public void rainStatByDays() {
		try {
			SqlSessionHander.SqlExecute(sqlsession -> {
				try {
					RainfallStatisticsMapper rain_mapper = sqlsession.getMapper(RainfallStatisticsMapper.class);
					String now_time = DateUtil.getBeforeTime(1);
					// 检查信息是否已经存在
					int flag = rain_mapper.checkRainInfo(now_time, DataTag.DAY);
					if (SUCCESS == flag) {
						rain_mapper.statisticsByDays(now_time);
					} else {
						rain_mapper.deleteRainInfo(now_time, DataTag.DAY);
						rain_mapper.statisticsByDays(now_time);
					}
					sqlsession.commit();
				} catch (Exception e) {
					sqlsession.rollback();
					logger.error(e.getMessage());
				}
				return null;

			});
		} catch (Exception e) {
			logger.info(e.getMessage());
		}
	}

	/**
	 * 每个月雨量统计
	 */
	public void rainStatByMonths() {
		try {
			SqlSessionHander.SqlExecute(sqlsession -> {
				try {
					RainfallStatisticsMapper rain_mapper = sqlsession.getMapper(RainfallStatisticsMapper.class);
					String now_time = DateUtil.getBeforeTime(0);
					// 检查信息是否已经存在
					int flag = rain_mapper.checkRainInfo(now_time, DataTag.MONTHS);
					if (SUCCESS == flag) {
						rain_mapper.statisticsByMonths(now_time);
					} else {
						rain_mapper.deleteRainInfo(now_time, DataTag.MONTHS);
						rain_mapper.statisticsByMonths(now_time);
					}
					sqlsession.commit();
				} catch (Exception e) {
					sqlsession.rollback();
					logger.error(e.getMessage());
				}
				return null;

			});
		} catch (Exception e) {
			logger.info(e.getMessage());
		}
	}

	/**
	 * 测站状态数据整编
	 */
	public void stationStatus() {
		try {
			SqlSessionHander.SqlExecute(sqlsession -> {
				try {
					StationStatusMapper station_mapper = sqlsession.getMapper(StationStatusMapper.class);
					// 获取前天数据
					String now_time = DateUtil.getBeforeTime(1);
					// 校验是否已经存在该天的数据
					int flag = station_mapper.checkStatusInfo(now_time);
					if (SUCCESS == flag) {
						station_mapper.dateStatistics(now_time);
					} else {
						station_mapper.deleteStatusInfo(now_time);
						station_mapper.dateStatistics(now_time);
					}
					sqlsession.commit();
				} catch (Exception e) {
					sqlsession.rollback();
					logger.info(e.getMessage());
				}
				return null;
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
		}
	}
}
