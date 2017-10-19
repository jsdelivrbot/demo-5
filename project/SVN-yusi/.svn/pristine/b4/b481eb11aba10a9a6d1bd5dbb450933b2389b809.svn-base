package mybatisPro.myBatisDao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;


/**
 * 自动站数据增补数据层接口
 * @author si.yu
 * @date 2017/09/01
 * @version 1.0
 * */
public interface DataSupplementMapper {

	/**
	 * 查询雨量测站数据
	 * @param sta_id
	 * @param begin_time
	 * @param end_time
	 * @return
	 * */
	public List<Map<String, Object>> getRainfallStationData(@Param("staId")Long sta_id,
			@Param("beginTime")String begin_time,@Param("endTime")String end_time);
	
	/**
	 * 查询水库水位站测站数据
	 * @param sta_id
	 * @param begin_time
	 * @param end_time
	 * @return
	 * */
	public List<Map<String, Object>> getResvoirStationData(@Param("staId")Long sta_id,
			@Param("beginTime")String begin_time,@Param("endTime")String end_time);
	
	/**
	 * 查询河道水位站测站数据
	 * @param sta_id
	 * @param begin_time
	 * @param end_time
	 * @return
	 * */
	public List<Map<String, Object>> getRiverStationData(@Param("staId")Long sta_id,
			@Param("beginTime")String begin_time,@Param("endTime")String end_time);

}
