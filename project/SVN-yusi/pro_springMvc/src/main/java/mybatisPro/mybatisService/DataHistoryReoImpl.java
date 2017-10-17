package mybatisPro.mybatisService;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import mybatisPro.dataBase.SqlSessionHander;
import mybatisPro.myBatisDao.RainfallStatisticsMapper;
import mybatisPro.mybatisService.impl.DataHistoryReor;

/**
 * 雨量历史
 * 
 * @author feng.gao
 * @date 2017年9月11日
 * @version 1.0
 */
@Service
public class DataHistoryReoImpl implements DataHistoryReor {

	private static final Logger logger = LoggerFactory.getLogger(DataHistoryReoImpl.class);

	/**
	 * 更新雨量历史记录
	 */
	@Override
	public boolean updateHistoryInfo(String time, Float time_rainfall, Long sta_id) {

		try {
			return SqlSessionHander.SqlExecute(sqlsession -> {
				RainfallStatisticsMapper rain_mapper = sqlsession.getMapper(RainfallStatisticsMapper.class);
				Long hour_id = rain_mapper.getHourInfo(time, sta_id);
				int flag = 0;
				if (null != hour_id) {
					flag = rain_mapper.updateHourInfo(hour_id, time_rainfall);
				} else {
					flag = rain_mapper.insertHourInfo(time_rainfall, time, sta_id);
				}
				sqlsession.commit();
				if (0 != flag) {
					return true;
				}
				return false;
			});
		} catch (IOException e) {
			logger.error(e.getMessage());
		}
		return false;
	}
}
