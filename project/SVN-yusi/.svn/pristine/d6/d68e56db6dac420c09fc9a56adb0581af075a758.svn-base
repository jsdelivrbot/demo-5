package ekuter.data.reorganize;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import mybatisPro.dataBase.SqlSessionHander;
import mybatisPro.myBatisDao.AllDataCMapper;
import mybatisPro.myBatisDao.DataHistoryMapper;
import mybatisPro.myBatisDao.RainfallStatisticsMapper;
import mybatisPro.mybatisEntity.RpPptnEntity;

/**
 * 雨量历史数据（补漏）
 * 
 * @author feng.gao
 * @date 2017年9月8日
 * @version 1.0
 */
public class DataHistoryReo {

	private static final Logger logger = LoggerFactory.getLogger(DataHistoryReo.class);

	/**
	 * 获取测站最大采集时间
	 * 
	 * @param sta_id
	 * @return
	 */
	public String getMaxTime(Long sta_id) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession -> {
				DataHistoryMapper mapper = sqlsession.getMapper(DataHistoryMapper.class);
				String max_time = mapper.getMaxTime(sta_id);
				return max_time;
			});
		} catch (IOException e) {
			logger.error(e.getMessage());
		}
		return null;
	}

	/**
	 * 校验是否有增补数据
	 * 
	 * @param sta_id
	 * @param max_time
	 * @return
	 */
	public List<String> checkAddition(Long sta_id, String max_time) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession -> {
				DataHistoryMapper mapper = sqlsession.getMapper(DataHistoryMapper.class);
				List<String> list_map = mapper.checkAddition(sta_id, max_time);
				return list_map;
			});
		} catch (IOException e) {
			logger.error(e.getMessage());
		}

		return null;
	}

	/**
	 * 获取增补数据时间段内所有数据
	 * 
	 * @param collecttime
	 *            格式 yyyy-MM-dd HH:mm:ss 增补采集时间
	 * @param sta_id
	 * @return
	 */
	public List<RpPptnEntity> getAdditionData(String collecttime, Long sta_id) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession -> {
				DataHistoryMapper mapper = sqlsession.getMapper(DataHistoryMapper.class);
				List<RpPptnEntity> data_info = mapper.getAdditionData(collecttime, sta_id);
				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				RpPptnEntity entity = mapper.getLastDataInfo(collecttime, sta_id);
				// 数据处理
				List<RpPptnEntity> data = RainReorganize.HandleData(data_info, entity.getParavalue().toString());

				// data_info.add(entity);
				// // 排序
				// Collections.sort(data_info, new Comparator<RpPptnEntity>() {
				// @Override
				// public int compare(RpPptnEntity o1, RpPptnEntity o2) {
				// int compare = o2.getCollecttime().compareTo(o1.getCollecttime());
				// return compare;
				// }
				// });
				return data;
			});
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		return null;
	}

	/**
	 * 更新历史数据
	 * 
	 * @return
	 */
	public boolean updateHistoryData(List<RpPptnEntity> his_data, Long sta_id, String collecttime) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession -> {
				RainfallStatisticsMapper rain_mapper = sqlsession.getMapper(RainfallStatisticsMapper.class);
				DataHistoryMapper his_mapper = sqlsession.getMapper(DataHistoryMapper.class);
				AllDataCMapper all_mapper = sqlsession.getMapper(AllDataCMapper.class);
				// 获取该小时内雨量累计值
				Float time_rainfall = 0.0f;
				for (RpPptnEntity en : his_data) {
					System.out.println(en);
					time_rainfall = time_rainfall + en.getTime_rainfall();
				}
				// 校验该小时内数据是否已经存在
				Long hour_ifno_id = rain_mapper.getHourInfo(collecttime, sta_id);
				int flag = 0;
				// 如果存在则更新不存在则插入
				if (null == hour_ifno_id) {
					flag = rain_mapper.insertHourInfo(time_rainfall, collecttime, sta_id);

				} else {
					flag = rain_mapper.updateHourInfos(hour_ifno_id, time_rainfall);
				}
				sqlsession.commit();
				if (0 != flag) {
					// 查询所有增补数据
					List<Long> id_info = his_mapper.getAddition(sta_id, getMaxTime(sta_id));
					if (null != id_info && !id_info.isEmpty()) {
						all_mapper.updateUndistincInfo(id_info);
						sqlsession.commit();
					}
					return true;
				}
				return false;
			});
		} catch (Exception e) {

			e.printStackTrace();
		}
		return false;
	}
}
