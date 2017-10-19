package mybatisPro.mybatisService;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import ekuter.mvc.constants.Constants;
import ekuter.mvc.exception.BusinessException;
import mybatisPro.dataBase.SqlSessionHander;

import mybatisPro.myBatisDao.UserMapper;
import mybatisPro.mybatisEntity.UserEntity;
import mybatisPro.mybatisService.impl.UserSer;

/**
 * 用户信息管理实现类
 * @author si.yu
 * */
@Service
public class UserSerImpl implements UserSer{
	
//	@Autowired
//	private PasswordHelper passwordHelper;

	private static final Logger logger=LoggerFactory.getLogger(UserSerImpl.class);
	/**
	 * 查询所有用户信息
	 * */
	@Override
	public List<UserEntity> getUserInfo() {
		try{
			return SqlSessionHander.SqlExecute(sqlsession->{
				UserMapper userMapper = sqlsession.getMapper(UserMapper.class);
				List<UserEntity> user_info_list = userMapper.getUserInfo();
				return user_info_list;
			});
			
		}catch(Exception e){  
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_USERINFO_1"));
		}
	}

	
	/**
	 * 根据用户名查找用户信息
	 * @param username
	 * @return
	 * */
	@Override
	public UserEntity getUserInfoByUsername(String username) {
		try{
			return SqlSessionHander.SqlExecute(sqlsession->{
				UserMapper userMapper = sqlsession.getMapper(UserMapper.class);
				UserEntity user_info = userMapper.getUserInfoByUsername(username);
				return user_info;
				
			});
			
		}catch(Exception e){
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_USERINFO_2"));
		}
	}


	/**
	 * 修改用户信息（修改密码）
	 * @param userEntity
	 * @return boolean
	 * */
	@Override
	public boolean updateUserInfo(UserEntity userEntity) {
		
		PasswordHelper passwordHelper = new PasswordHelper();
		passwordHelper.encryptPassword(userEntity);
		
		try{
			return SqlSessionHander.SqlExecute(sqlsession->{
				UserMapper userMapper = sqlsession.getMapper(UserMapper.class);
				int updateFlag = userMapper.updateUserInfo(userEntity);
				sqlsession.commit();
				
				if(updateFlag == 1){
					return true;
				}else{
					return false;
				}
			});
			
		}catch(Exception e){
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_USERINFO_3"));
		}
	}

}
