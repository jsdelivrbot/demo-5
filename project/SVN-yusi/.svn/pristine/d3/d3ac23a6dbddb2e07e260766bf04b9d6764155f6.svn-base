package mybatisPro.mybatisService.impl;


import java.util.List;

import mybatisPro.mybatisEntity.UserEntity;

/**
 * 用户信息管理接口
 * @author si.yu
 * */
public interface UserSer {

	/**
	 * 查询所有用户信息
	 * */
	public List<UserEntity> getUserInfo();
	
	/**
	 * 根据用户名查找用户信息
	 * @param username
	 * @return
	 * */
	public UserEntity getUserInfoByUsername(String username);
	
	/**
	 * 修改用户信息（修改密码）
	 * @param userEntity
	 * @return boolean
	 * */
	public boolean updateUserInfo(UserEntity userEntity);
}
