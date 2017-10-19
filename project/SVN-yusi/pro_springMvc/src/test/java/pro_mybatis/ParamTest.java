package pro_mybatis;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;

import mybatisPro.mybatisEntity.StationParamEntity;
import mybatisPro.mybatisService.StationParamServiceImpl;
import mybatisPro.mybatisService.impl.StationParamService;

/**
 * 测站系数测试类
 * @author si.yu
 * @date 2017/07/26
 * @version 1.0
 * */
public class ParamTest {

	private StationParamService paramService;
	
	@Before
	public void setUp(){
		paramService = new StationParamServiceImpl();
	}
	
	@Test
	public void getParamOfStation(){
		Float param = paramService.getStationParamByStaId(12l);
		System.out.println(param);
	}
	
	@Test
	public void addParamList(){
		
		List<StationParamEntity> paramList = new ArrayList<StationParamEntity>();
		StationParamEntity entity1 = new StationParamEntity();
		entity1.setArea_id(1l);
		entity1.setSta_id(12l);
		entity1.setParam(0.2f);
		StationParamEntity entity2 = new StationParamEntity();
		entity2.setArea_id(1l);
		entity2.setSta_id(18l);
		entity2.setParam(0.8f);
		
		paramList.add(entity1);
		paramList.add(entity2);
		
		boolean addFlag = paramService.addParam(paramList);
		System.out.println(addFlag);
		
	}
	
	@Test
	public void updateParamList(){
		
		List<StationParamEntity> paramList = new ArrayList<StationParamEntity>();
		StationParamEntity entity1 = new StationParamEntity();
		entity1.setArea_id(1l);
		entity1.setSta_id(13l);
		entity1.setParam(0.2f);
		StationParamEntity entity2 = new StationParamEntity();
		entity2.setArea_id(1l);
		entity2.setSta_id(14l);
		entity2.setParam(0.8f);
		
		paramList.add(entity1);
		paramList.add(entity2);
		
		boolean addFlag = paramService.updateParam(paramList);
		System.out.println(addFlag);
	}
}
