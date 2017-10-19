package mybatisPro.myBatisDao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import mybatisPro.mybatisEntity.RainfallEntity;
import mybatisPro.mybatisEntity.ReportStatusEntity;
import mybatisPro.mybatisEntity.ReservoirWaterLevelEntity;
import mybatisPro.mybatisEntity.RiverWaterLevelEntity;

/**
 * 人工站人工报讯管理
 * @author si.yu
 * @date 2017/08/16
 * @version 1.0
 * */
public interface ManMadeStationMapper {

	/**
	 * 人工上报数据(雨量数据插入)
	 * @param rainfallEntity
	 * @return
	 * */
	public int insertIntoRainFallData(RainfallEntity rainfallEntity);
	
	/**
	 * 人工上报数据（水库水位数据插入）
	 * @param reservoirWaterLevelEntity
	 * @return
	 * */
	public int insertResvoirData(ReservoirWaterLevelEntity reservoirWaterLevelEntity);
	
	/**
	 * 人工上报数据（河道水位数据插入）
	 * @param riverWaterLevelEntity
	 * @return
	 * */
	public int insertRiverData(RiverWaterLevelEntity riverWaterLevelEntity);
	
	
	/**
	 * 根据数据ID修改雨量数据
	 * @param rainfallEntity
	 * @return
	 * */
	public int updateRainFallData(RainfallEntity rainfallEntity);
	
	/**
	 * 根据数据ID修改水库水位数据
	 * @param rainfallEntity
	 * @return
	 * */
	public int updateResvoirData(ReservoirWaterLevelEntity reservoirWaterLevelEntity);
	
	/**
	 * 根据数据ID修改河道水位数据
	 * @param rainfallEntity
	 * @return
	 * */
	public int updateRiverData(RiverWaterLevelEntity riverWaterLevelEntity);
	
	/**
	 * 根据上报数据的日期查询是否已有上报装填
	 * @param reportTime
	 * @return
	 * */
	public ReportStatusEntity findReportStatus(@Param("reportTime")String reportTime);
	
	/**
	 * 插入上报状态数据
	 * @Param statusEntity
	 * @return
	 * */
	public int insertReportStatus(ReportStatusEntity statusEntity);
	
	/**
	 * 查询时间段内的所有上报数据状态
	 * @param begin_time
	 * @param end_time
	 * @return
	 * */
	public List<ReportStatusEntity> getListOfReportStatusData(
			@Param("beginTime")String begin_time,@Param("endTime")String end_time);
}
