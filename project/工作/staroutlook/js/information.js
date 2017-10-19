$(function(){
	var phone = localStorage.getItem("phone");
	var html = '<li class="codeLi">\
					<label for="code">验证码:</label>\
					<input type="tel" id="code" value=""/>\
					<button id="sendCode" class="sendCode">发送验证码</button>\
				</li>';
	if(phone == null){
		$(".container").append(html);
	}else{
		$("#phone").val(phone).attr("disabled","disabled");
	}
	
	/*姓名特殊情况
	$("#name").keyup(function(){
		if($(this).val().length > 14){
			$(this).parent().css("height","1.38rem")
		}
		if($(this).val().length <= 14){
			$(this).parent().css("height","1rem")
		}
	});*/
	
	// 返回
	$("#return").on("click",function(){
		layer.open({
			content: '退出后填写的信息将不会保存，确认退出选手认证？'
		    ,btn: ['确认', '取消']
		    ,yes: function(index){
		          window.history.back(-1);
		          layer.close(index);
		    }
		});
	});
	
	// 获取验证码
	function countDown(remain){
		var timer;
		$("#sendCode").html("重新发送 "+ (--remain)).addClass("active").attr("disabled","disabled");
		timer = window.setInterval(function(){
			remain--;
			if(remain > 0){			
				$("#sendCode").html("重新发送 "+ remain);
			}else if(remain <= 0){
				$("#sendCode").html("发送验证码").removeClass("active").removeAttr("disabled");
				clearInterval(timer);
			}
		},1000);
		
	}
	var codeNum;
	$("#sendCode").on("click",function(){
		var phone = $("#phone").val(); 
		if(checkVal($("#phone"),0,/\d{11}/)){
			countDown(60);
			$.ajax({
				type:"post",
				url:"/star/user/getVerifyCode",
				dataType: "json",
				data: {'phone': phone,'operation': 4,currentVersion:current},
				success: function(data){
					switch(data.result){
						case "1":
							console.log(data.data.code);
							codeNum = data.data.code;
							layer.open({content: '短信发送成功',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
							break;
						case "200":
							layer.open({content: '用户不存在',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
							break;
						case "205":
							layer.open({content: '手机号已绑定其他参赛编码，请更换手机号',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
							break;
						case "206":
							layer.open({content: '手机验证码操作类型错误',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
							break;
					}
				}
			});
		}
	});
	
	// 下一步
	$("#nextButton").on("click",function(){
		if( checkVal($("#name"),0,/^[a-zA-Z\u4e00-\u9fa5]{1,15}$/) 
			&& checkVal($("#selectSex"),1) 
			&& checkVal($("#selectCertificateType"),1) 
			&& checkVal($("#certificate"),0,/^[a-zA-Z\d]{8,18}$/) 
			&& checkVal($("#show_contact"),1)){
				
				if($("#code").val() !== codeNum){
					layer.open({content: '验证码错误，请重新输入',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				}else{
					storage("realName",$("#name").val());
					storage("gender",$("#sex").val());
					storage("nationId",nationId);
					storage("nationName",nationName);
					storage("idType",$("#certificateType").val());
					storage("idNumber",$("#certificate").val());
					storage("province",$("#contact_province_code").val());
					storage("city",$("#contact_city_code").val());
					storage("county",$("#contact_district_code").val());
					storage("provinceName",$("#contact_province_code").attr("data-province-name"));
					storage("cityName",$("#contact_city_code").attr("data-city-name"));
					storage("countyName",$("#contact_district_code").attr("data-district-name"));
					storage("phone",$("#phone").val());	
					storage("code",$("#code").val());			
					window.location.href = "../html/competing.html";
				}			
		}		
	});
	function storage(name,obj){
		sessionStorage.setItem(name,obj);
	}
	
	
	
	function checkVal(obj,type,reg){
		var msg = obj.prev().html().replace(/\:/,"");
		if(type == 0){
			if(obj.val() == ""){
				layer.open({content: msg+'不能为空',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});		
				setTimeout(function(){
					obj.focus();
				},2000);
				return false;
			}else if(!reg.test(obj.val())){	
				obj.val("");
				layer.open({content: msg+'格式不正确',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				$("#nextButton").attr("disabled","disabled").css("background","rgba(255,255,255,.25)");
				setTimeout(function(){
					obj.focus();
				},2000);
				return false;
			}else{
				return true;
			}
		}else if(type == 1){
			if(obj.text() == "请选择"){
				layer.open({content: msg+'不能为空',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				return false;
			}else{
				return true;
			}
		}
	}
	
	
	

	function choose(inputObj,selectObj,dataObj){
    	selectObj.addEventListener('click', function () {
    		var _this = $(this);
	        var bankId = selectObj.dataset['id'];
	        var bankName = selectObj.dataset['value'];
	
	        var bankSelect = new IosSelect(1, 
	            [dataObj],
	            {
	                itemHeight: 35,
	                oneLevelId: bankId,
	                callback: function (selectOneObj) {
	                    inputObj.value = selectOneObj.id;
	                    selectObj.innerHTML = selectOneObj.value;
	                    selectObj.dataset['id'] = selectOneObj.id;
	                    selectObj.dataset['value'] = selectOneObj.value;
	                }
	        });       
	       	$(".layer").css({"height":"4.8rem"});    
	       	
	       	$(".sure").on("click",function(){	
	       		$(_this).css("color","#fff");
		    	changeColor();
	       });

	    });
	   
    }
	// 性别
	var sexData = [{'id': '0', 'value': '女性'},
    			   {'id': '1', 'value': '男性'}];
    var selectSex = document.querySelector('#selectSex');
    var sex = document.querySelector('#sex');
    choose(sex,selectSex,sexData);
    
    // 民族
    var nationData = [{"id":1,"name":"汉族"},{"id":2,"name":"回族"},{"id":3,"name":"维吾尔族"},{"id":4,"name":"哈萨克族"},{"id":5,"name":"塔吉克族"},{"id":6,"name":"乌兹别克族"},{"id":7,"name":"塔塔尔族"},{"id":8,"name":"柯尔克孜族"},{"id":9,"name":"东乡族"},{"id":10,"name":"保安族"},{"id":11,"name":"撒拉族"},{"id":12,"name":"壮族"},{"id":13,"name":"苗族"},{"id":14,"name":"满族"},{"id":15,"name":"土家族"},{"id":16,"name":"彝族"},{"id":17,"name":"蒙古族"},{"id":18,"name":"藏族"},{"id":19,"name":"布依族"},{"id":20,"name":"侗族"},{"id":21,"name":"瑶族"},{"id":22,"name":"朝鲜族"},{"id":23,"name":"白族"},{"id":24,"name":"哈尼族"},{"id":25,"name":"黎族"},{"id":26,"name":"傣族"},{"id":27,"name":"畲族"},{"id":28,"name":"僳僳族"},{"id":29,"name":"仡佬族"},{"id":30,"name":"拉祜族"},{"id":31,"name":"水族"},{"id":32,"name":"佤族"},{"id":33,"name":"纳西族"},{"id":34,"name":"羌族"},{"id":35,"name":"土族"},{"id":36,"name":"仫佬族"},{"id":37,"name":"锡伯族"},{"id":38,"name":"达斡尔族"},{"id":39,"name":"景颇族"},{"id":40,"name":"毛南族"},{"id":41,"name":"布朗族"},{"id":42,"name":"阿昌族"},{"id":43,"name":"普米族"},{"id":44,"name":"鄂温克族"},{"id":45,"name":"怒族"},{"id":46,"name":"京族"},{"id":47,"name":"基诺族"},{"id":48,"name":"德昂族"},{"id":49,"name":"俄罗斯族"},{"id":50,"name":"裕固族"},{"id":51,"name":"门巴族"},{"id":52,"name":"鄂伦春族"},{"id":53,"name":"独龙族"},{"id":54,"name":"赫哲族"},{"id":55,"name":"高山族"},{"id":56,"name":"珞巴族"}];
	var html = '';
	html += "<ul>";
	$.each(nationData, function(index,obj) {
		html += '<li data-id="'+ obj.id +'">'+ obj.name +'</li>';
	});
	html += "</ul>";
	$("#nationPopover .mui-scroll").append(html);
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 
	});
	
	$("#nation").click(function(){
		mui("#nationPopover").popover("show");
		$("#cancel,#confirm").click(function(){
			mui("#nationPopover").popover("hide");
		});
		
		$("#nationPopover li").on("tap",function(){
			nationId = $(this).attr("data-id");
			nationName = $(this).text();
			$("#nation").text(nationName).css("color","#fff");
			mui("#nationPopover").popover("hide");
			changeColor();
		});	
	});
    
    // 证件类型
	var certificateData = [{'id': '1', 'value': '身份证'},
    			   {'id': '2', 'value': '（港澳台）护照'},
    			   {'id': '3', 'value': '港澳通行证'},
    			   {'id': '4', 'value': '香港身份证'},
    			   {'id': '5', 'value': '台胞证'},
    			   {'id': '6', 'value': '护照'}];
    var selectCertificateType = document.querySelector('#selectCertificateType');
    var certificateType = document.querySelector('#certificateType');
    choose(certificateType,selectCertificateType,certificateData);
    
    //　地区
    var selectContactDom = $('#select_contact');
    var showContactDom = $('#show_contact');
    var contactProvinceCodeDom = $('#contact_province_code');
    var contactCityCodeDom = $('#contact_city_code');
    var contactDistrictCodeDom = $('#contact_district_code');
    var areaStr; // 显示的地区字符
    showContactDom.on("click", function () {
    	var _this = $(this);
        var sccode = showContactDom.attr('data-city-code');
        var scname = showContactDom.attr('data-city-name');

        var oneLevelId = showContactDom.attr('data-province-code');
        var twoLevelId = showContactDom.attr('data-city-code');
        var threeLevelId = showContactDom.attr('data-district-code');
        var iosSelect = new IosSelect(3, 
            [iosProvinces, iosCitys, iosCountys],
            {
                itemHeight: 35,
                oneTwoRelation: 1,
                twoThreeRelation: 1,
                oneLevelId: oneLevelId,
                twoLevelId: twoLevelId,
                threeLevelId: threeLevelId,
                callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                    contactProvinceCodeDom.val(selectOneObj.id); 
                    contactProvinceCodeDom.attr('data-province-name', selectOneObj.value);
                    contactCityCodeDom.val(selectTwoObj.id);
                    contactCityCodeDom.attr('data-city-name', selectTwoObj.value);
                    contactDistrictCodeDom.val(selectThreeObj.id);
                    contactDistrictCodeDom.attr('data-district-name', selectThreeObj.value);

                    showContactDom.attr('data-province-code', selectOneObj.id);
                    showContactDom.attr('data-city-code', selectTwoObj.id);
                    showContactDom.attr('data-district-code', selectThreeObj.id);                        
        			showContactDom.text(areaStr);                  
                }
        });
         
        $(".sure").on("tap",function(){
        	$(_this).css("color","#fff");     
        	
        	areaStr = $(".at").text();
        	if(areaStr.length>13){
        		var overStr = areaStr.slice(8, 8 + (areaStr.length - 13)); 
        		areaStr = areaStr.replace(overStr,"...")
        	}else{
        		areaStr = areaStr;
        	}
       		
	    	

        });
        $(".sure").on("click",function(){
       		changeColor();
        });
    });
    

	$("input,textarea").on("input propertychange",function(){
    	changeColor();
    });
   
    function changeColor(){
    	if($("#name").val() == "" || $("#nation").text() == "请选择" || $("#sex").val() == "" ||
    		$("#certificateType").val() == "" || $("#contact_province_code").val() == "" || $("#phone").val() == "" ||
    		$("#code").val() == "" || $("#certificate").val() == ""){
    			$("#nextButton").attr("disabled","disabled").css("background","rgba(255,255,255,.25)");
    		}else{
    			$("#nextButton").removeAttr("disabled").css("background","#ff296a");
    		}
    }

});
