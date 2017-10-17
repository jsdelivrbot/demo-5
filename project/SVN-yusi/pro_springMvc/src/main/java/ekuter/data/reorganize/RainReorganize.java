package ekuter.data.reorganize;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import mybatisPro.dataBase.GetSqlSessionFactory;
import mybatisPro.dataBase.SqlSessionHander;
import mybatisPro.myBatisDao.AllDataCMapper;
import mybatisPro.myBatisDao.RpPptnMapper;
import mybatisPro.mybatisEntity.RpPptnEntity;

/**
 * 雨量数据整编
 * 
 * @author feng.gao
 * @date 2017年8月25日
 * @version 1.0
 */
public class RainReorganize {

	private static final Logger logger = LoggerFactory.getLogger(RainReorganize.class);

	/**
	 * 获取雨量站ID
	 * 
	 * @return
	 */
	public static List<Long> getStaID() {
		try {
			return SqlSessionHander.SqlExecute(sqlsession -> {
				AllDataCMapper all_mapper = sqlsession.getMapper(AllDataCMapper.class);
				List<Long> id_list = all_mapper.getStaId();
				return id_list;
			});
		} catch (IOException e) {
			// logger.error(e.getMessage());
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 获取雨量数据信息
	 * 
	 * @param sta_id
	 * @return
	 */
	public static List<RpPptnEntity> getRainDataInfo(Long sta_id, String collect_time) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession -> {
				AllDataCMapper all_mapper = sqlsession.getMapper(AllDataCMapper.class);
				List<RpPptnEntity> data_info = all_mapper.getRainDataInfo(sta_id, collect_time);
				return data_info;
			});
		} catch (IOException e) {
			// logger.error(e.getMessage());
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 数据处理
	 * 
	 * @param data_info
	 * @return
	 */
	public static List<RpPptnEntity> HandleData(List<RpPptnEntity> data_info, String value) {
		// 雨量增值计算
		for (int index = 0; index < data_info.size(); index++) {
			RpPptnEntity sta_en = data_info.get(index);
			if (index + 1 < data_info.size()) {
				RpPptnEntity end_en = data_info.get(index + 1);
				Float time_rainfall = sta_en.getParavalue() - end_en.getParavalue();
				if (time_rainfall.floatValue() > 0) {
					sta_en.setTime_rainfall(time_rainfall);
				} else {
					sta_en.setTime_rainfall(0.0f);
				}
			} else if (index == data_info.size() - 1) {
				if (null != value) {
					Float rain_value = Float.valueOf(value);
					Float add_rain = sta_en.getParavalue() - rain_value;
					if (add_rain.floatValue() > 0) {
						sta_en.setTime_rainfall(add_rain);
					} else {
						sta_en.setTime_rainfall(0.0f);
					}
				} else {
					data_info.remove(index);
				}
			} else {
				data_info.remove(index);
			}
		}
		return data_info;
	}

	/**
	 * 数据导入
	 * 
	 * @return
	 */
	public static boolean importData() {
		List<Long> id_info = getStaID();
		if (id_info != null && !id_info.isEmpty()) {
			SqlSession sqlsession = null;
			try {
				sqlsession = GetSqlSessionFactory.getInstance().openSession(ExecutorType.BATCH);
				RpPptnMapper mapper = sqlsession.getMapper(RpPptnMapper.class);
				AllDataCMapper all_mapper = sqlsession.getMapper(AllDataCMapper.class);
				for (Long sta_id : id_info) {

					String collect_time = null;
					String value = null;
					// 获取最大collecttime
					Map<String, Object> time_map = all_mapper.getMaxRainCollectTime(sta_id);
					if (null != time_map) {
						String collecttime = time_map.get(DataTag.COLLECT_TIME).toString();
						String va = time_map.get(DataTag.PARA_VALUE).toString();
						if (collecttime != null && !collecttime.isEmpty()) {
							collect_time = collecttime;
						}
						if (va != null && !va.isEmpty()) {
							value = va;
						}
					}
					List<RpPptnEntity> data_info = getRainDataInfo(sta_id, collect_time);
					if (null == data_info) {
						continue;
					}
					List<RpPptnEntity> data = HandleData(data_info, value);
					if (data != null && !data.isEmpty()) {
						// 每批commit个数
						int batchCount = 1000;
						// 每批最后一个下标
						int batchLastIndex = batchCount;
						for (int index = 0; index < data.size();) {
							if (batchLastIndex >= data.size()) {
								batchLastIndex = data.size();
								mapper.insertDataInfo(data.subList(index, batchLastIndex));
								sqlsession.commit();
								break;
							} else {
								mapper.insertDataInfo(data.subList(index, batchLastIndex));
								sqlsession.commit();
								// 清理缓存，防止溢出
								sqlsession.clearCache();
								index = batchLastIndex;
								batchLastIndex = index + (batchCount - 1);
							}
						}
						// 更新处理状态
						List<Long> rain_id = all_mapper.getRainDataId(sta_id, collect_time);
						if (null != rain_id && !rain_id.isEmpty()) {
							all_mapper.updateUndistincInfo(rain_id);
						}
						// 修改雨量最大collecttime标记
						DataUtil.updateMaxFlag();
						// 重新标记collecttime
						DataUtil.changeRainInfo();

						sqlsession.commit();
					}

				}
				return true;
			} catch (Exception e) {
				sqlsession.rollback();
				// logger.error(e.getMessage());
				e.printStackTrace();
			} finally {
				sqlsession.close();
			}
		}
		return false;
	}

	public static void main(String[] args) {
		// System.out.println(RainReorganize.importData());

		try {
			SqlSessionHander.SqlExecute(sqlsession -> {
				AllDataCMapper all_mapper = sqlsession.getMapper(AllDataCMapper.class);
				Map<String, Object> map = all_mapper.getMaxRainCollectTime(12L);
				String collecttime = map.get(DataTag.COLLECT_TIME).toString();
				String va = map.get(DataTag.PARA_VALUE).toString();
				System.out.println(va + "::::" + collecttime);
				return null;
			});
		} catch (IOException e) {
			logger.error(e.getMessage());
		}
	}
}
