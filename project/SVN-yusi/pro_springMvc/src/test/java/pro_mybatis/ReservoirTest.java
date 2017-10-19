package pro_mybatis;

import java.util.List;

import org.junit.Before;
import org.junit.Test;

import mybatisPro.mybatisEntity.ReservoirEntity;
import mybatisPro.mybatisService.ReservoirManagerServiceImpl;
import mybatisPro.mybatisService.impl.ReservoirManagerService;

/**
 * 水库信息管理测试类
 * @author si.yu
 * @date 2017/6/27
 * @version 1.0
 * */
public class ReservoirTest {

	private ReservoirManagerService reservoirManagerService;
	
	@Before
	public void setUp(){
		reservoirManagerService = new ReservoirManagerServiceImpl();
	}
	
	@Test
	public void createReservoir(){
		
		ReservoirEntity reservoirEntity = new ReservoirEntity();
		reservoirEntity.setCnnmcd("#000003");
		reservoirEntity.setResnm("通州水库");
		reservoirEntity.setRestp("发电-蓄水水库");
		reservoirEntity.setAddvcd("100002");
		reservoirEntity.setAdumnm("北京市水文管理局");
		reservoirEntity.setDamsite("北京市通州区");
		reservoirEntity.setEsstym("1992-8-1");
		reservoirEntity.setEncl("甲级");
		reservoirEntity.setLvbslv("100");
		reservoirEntity.setRscci("水坝，发电站，监测站");
		reservoirEntity.setSchdep("北京市通州区水文管理局");
		reservoirEntity.setSaflev("中");
		reservoirEntity.setRsdasi("差");
		reservoirEntity.setVlar(360.53F);
		reservoirEntity.setComments(">>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<");
		reservoirEntity.setSort("2");
		
		boolean flag = 
				reservoirManagerService.createReservoir(reservoirEntity);
		System.out.println(flag);
		System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>"+reservoirEntity.getId());
	}
	
	@Test
	public void loadListOfReservoir(){
		
		List<ReservoirEntity> rEntities = 
				reservoirManagerService.findListOfReservoir();
		System.out.println(rEntities);
	}
	
	@Test
	public void loadReservoirInfoById(){
		
		ReservoirEntity rEntity = 
				reservoirManagerService.findReservoirById(6L);
		System.out.println(rEntity);
	}
	
	@Test 
	public void updateReservoirInfo(){
		
		ReservoirEntity rEntity = new ReservoirEntity();
		rEntity.setId(3L);
		rEntity.setComments("ajlkfajslkdfj");
		
		boolean updateFlag = 
				reservoirManagerService.updateReservoirInfo(rEntity);
		
		System.out.println(updateFlag);
		System.out.println(rEntity);
	}
}
