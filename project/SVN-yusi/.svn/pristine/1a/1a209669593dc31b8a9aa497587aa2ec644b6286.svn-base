package pro_mybatis;

import java.util.List;

import org.junit.Before;
import org.junit.Test;

import mybatisPro.mybatisEntity.UserEntity;
import mybatisPro.mybatisService.UserSerImpl;
import mybatisPro.mybatisService.impl.UserSer;

/**
 * 用户管理测试类
 * @author si.yu
 * */
public class UserTest {

	private UserSer user;
	
	@Before
	public void setUp(){
		user = new UserSerImpl();
	}
	
	@Test
	public void getUserInfo(){
		
		List<UserEntity> userInfo =  user.getUserInfo();
		System.out.println(userInfo);
	}
	
	@Test
	public void getUserInfoByUserName(){ 
		
		UserEntity userInfo =  user.getUserInfoByUsername("123");
		System.out.println(userInfo);
	}
	
	@Test
	public void updateUserInfo(){ 
		
		UserEntity userInfo = new UserEntity();
		userInfo.setId(4);
		userInfo.setUsername("admin");
		userInfo.setPassword("123456");
		boolean updateFlag = user.updateUserInfo(userInfo);
		
		System.out.println(updateFlag);
		System.out.println(userInfo);
	}
}
