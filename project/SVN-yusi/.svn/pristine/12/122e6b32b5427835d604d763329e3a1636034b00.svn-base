package mybatisPro.myBatisDao;

import java.util.List;

import mybatisPro.mybatisEntity.UserEntity;

/**
 * 用户管理数据层
 * @author si.yu
 * */
public interface UserMapper {

	/**
	 * 查询用户列表
	 * */
	public List<UserEntity> getUserInfo();

	/**
	 * 根据用户名查询用户信息
	 * @param username
	 * */
	public UserEntity getUserInfoByUsername(String username);

	/**
	 * 修改用户信息（修改密码）
	 * @param userEntity
	 * @return boolean
	 * */
	public int updateUserInfo(UserEntity userEntity);
}
