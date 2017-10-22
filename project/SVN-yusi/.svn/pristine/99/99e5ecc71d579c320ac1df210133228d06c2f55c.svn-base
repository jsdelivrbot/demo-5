package mybatisPro.mybatisService.impl;

import java.util.Date;
import java.util.List;
import ekuter.mvc.util.ManMadeStationDataUtil;
import mybatisPro.mybatisEntity.ReportStatusEntity;

/**
 * 人工报讯业务层接口
 * @author si.yu
 * @date 2017/08/22
 * @version 1.0
 * */
public interface ManMadeStaionService {

	/**
	 * 人工上报数据
	 * @return
	 * */
	public boolean ManMadeDataReport(List<ManMadeStationDataUtil> manMadeStationList,Date reportTime);
	
	/**
	 * 根据上报数据的日期查询是否已有上报装填
	 * @param reportTime
	 * @return
	 * */
	public ReportStatusEntity findReportStatus(String reportTime);
	
	/**
	 * 插入上报状态数据
	 * @Param statusEntity
	 * @return
	 * */
	public Boolean insertReportStatus(ReportStatusEntity statusEntity);
	
	/**
	 * 查询时间段内的所有上报数据状态
	 * @param begin_time
	 * @param end_time
	 * @return
	 * */
	public List<ReportStatusEntity> getListOfReportStatusData(String begin_time,String end_time);
}
