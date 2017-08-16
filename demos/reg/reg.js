//验证手机号 eg:  checkTel("13812345678")
function checkTel(value){
	var re = /^1[3|4|5|7|8]\d{9}$/;//手机号码正则表达式
	return re.test(value);
}

//验证座机号  eg:  checkPhone("0577-22345678")
function checkPhone(value){
	var re=/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;//座机号正则表达式
	return re.test(value);
}

//验证邮箱  eg:  checkEmail("123456@qq.com")
function checkEmail(value){
	var re=/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;//邮箱正则表达式
	return re.test(value);
}

//验证只能是数字  eg:  checkNum("123")
function checkNum(value){
	var re=/^[0-9]*$/;
	return re.test(value);
}

//验证日期  eg:  checkDate("2017-07-27")
function checkDate(value){
	var re=/^\d{4}-\d{1,2}-\d{1,2}(\s\d{1,2}(:\d{1,2}(:\d{1,2})?)?)?$/;
	return re.test(value);
}

//验证数字个数 eg:  checkNumCount("123456")
function checkNumCount(value){
	var re=/^\d{6}$/;//数字个数正则表达式(6位)
	return re.test(value);
}

//验证数字是带1-2位小数的正数或负数(可以是不带小数点的整数) 
//eg:  checkNumDecimal("-12.55")  checkNumDecimal("12.3")  checkNumDecimal("12")
function checkNumDecimal(value){
	var re=/^(\-)?\d+(\.\d{1,2})?$/;
	return re.test(value);
}

//验证只能是汉字 eg:  checkChinese("中国")
function checkChinese(value){
	var re=/^[\u4e00-\u9fa5]{0,}$/;
	return re.test(value);
}

//验证只能是英文 eg:  checkEnglish("aA")
function checkEnglish(value){
	var re=/^[A-Za-z]+$/;
	return re.test(value);
}

//验证只能是英文或者数字 eg:  checkEngNum("123aaa")
function checkEngNum(value){
	var re=/^[A-Za-z0-9]+$/;
	return re.test(value);
}

//验证只能是英文和数字，只能是字母开头,6-16位  eg:  checkEngAndNum("aaa123AA")
function checkEngAndNum(value){
	var re=/^[A-Za-z]+[0-9A-Za-z]{5,15}$/;
	return re.test(value);
}

//验证只能是英文或者数字或者下划线 eg:  checkEngNumXia("123_aaa")
function checkEngNumXia(value){
	var re=/^\w+$/;
	return re.test(value);
}


//验证用户名 (所有字符，2-20位)eg:  checkUserName("123456")
function checkUserName(value){
	var re=/^.{2,20}$/;
	return re.test(value);
}

//验证密码 (6-18位，字母、数字、特殊符)eg:  checkPassword("123456")
function checkPassword(value){
	var re=/^.{6,18}$/;//.代表任何字符
	return re.test(value);
}

//验证身份证（18位）
function checkIdCard(value){
	var sfz18=0,	//身份证第18位
	    sfz=value,
	    test2=[1,0,"X",9,8,7,6,5,4,3,2],
	    sfz_array=sfz.split("");
	if(sfz.length!=18&&sfz.length!=0){	//	身份证不是18位		
		return false;
	}
	if(sfz.length==18){
		var test=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];		    
		for(var i=0;i<17;i++){
			sfz18+=test[i]*sfz_array[i];
		}
		sfz18%=11;		
		sfz18=test2[sfz18];
		if(sfz18!=sfz_array[17]){	//身份证的第18位按一定规律计算			
			 return false;
		}
		else return true;
	}
}

