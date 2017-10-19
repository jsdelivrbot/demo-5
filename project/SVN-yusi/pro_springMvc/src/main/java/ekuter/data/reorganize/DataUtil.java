package ekuter.data.reorganize;

import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import mybatisPro.dataBase.SqlSessionHander;
import mybatisPro.myBatisDao.AllDataCMapper;
import mybatisPro.myBatisDao.RpPptnMapper;

/**
 * 数据整编工具类
 * 
 * @author feng.gao
 * @date 2017年9月7日
 * @version 1.0
 */
public class DataUtil {

	private static final Logger logger = LoggerFactory.getLogger(DataUtil.class);

	/**
	 * 获取最大ID
	 * 
	 * @return
	 */
	public static Long getMaxId() {
		try {
			return SqlSessionHander.SqlExecute(sqlsession -> {
				AllDataCMapper mapper = sqlsession.getMapper(AllDataCMapper.class);
				Long max_id = mapper.getMaxId();
				return max_id;
			});
		} catch (IOException e) {
			logger.error(e.getMessage());
		}
		return null;
	}

	/**
	 * 雨量站信息
	 */
	public static void changeRainInfo() {
		List<Long> sta_id_list = RainReorganize.getStaID();
		if (null != sta_id_list && !sta_id_list.isEmpty()) {
			try {
				SqlSessionHander.SqlExecute(sqlsession -> {
					RpPptnMapper mapper = sqlsession.getMapper(RpPptnMapper.class);
					AllDataCMapper all_mapper = sqlsession.getMapper(AllDataCMapper.class);
					sta_id_list.forEach(sta_id -> {
						Long id = mapper.getMaxCollectTime(sta_id);
						if (null != id) {
							all_mapper.updateMaxFlag(id);
							sqlsession.commit();
						}
					});
					return null;
				});
				// DataTag.rain_info_map = rain_map;
			} catch (IOException e) {
				logger.error(e.getMessage());
			}
		}

	}

	// 更新记录最大collecttime标记
	public static void updateMaxFlag() {
		try {
			SqlSessionHander.SqlExecute(sqlsession -> {
				AllDataCMapper all_mapper = sqlsession.getMapper(AllDataCMapper.class);
				List<Long> rain_max_collect_id = all_mapper.getMaxCollectTimeId();
				if (null == rain_max_collect_id || rain_max_collect_id.isEmpty()) {
					return null;
				}
				all_mapper.updateMaxFlagFalse(rain_max_collect_id);
				sqlsession.commit();
				return null;
			});
		} catch (IOException e) {
			logger.error(e.getMessage());
		}
	}

	public static void main(String[] args) {
		DataUtil.changeRainInfo();
	}

}
