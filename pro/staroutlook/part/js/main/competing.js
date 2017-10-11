$(function(){
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		indicators: false //是否显示滚动条
	});
	
	var userId = localStorage.getItem("userId");    
	var certificateImgUrl;
	var realName = sessionStorage.getItem("realName"),
    	gender = sessionStorage.getItem("gender"),
    	nationId = sessionStorage.getItem("nationId"),
    	nationName = sessionStorage.getItem("nationName"),
    	idType = sessionStorage.getItem("idType"),
    	idNumber = sessionStorage.getItem("idNumber"),
    	
    	province = sessionStorage.getItem("province"),
    	city = sessionStorage.getItem("city"),
    	county = sessionStorage.getItem("county"),
    	provinceName = sessionStorage.getItem("provinceName"),
    	cityName = sessionStorage.getItem("cityName"),
    	countyName = sessionStorage.getItem("countyName"),
    	
    	phone = sessionStorage.getItem("phone"),
    	code = sessionStorage.getItem("code");
    
    	
	var matchAreaName,matchAreaId,schoolOrganization,
	matchId,matchName,matchAgeId,matchAgeName,classes,parentEmail;
	
	var logindata,matchdata;
	// 上传证件照
	// 初始化Web Uploader
	var uploader = WebUploader.create({
	    // 选完文件后，是否自动上传。
	    auto: false,
	    // swf文件路径
	    swf: 'Uploader.swf',
	    // 文件接收服务端。
   		server: '/star/image/upload',
	    // 选择文件的按钮。可选。
	    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
	    pick: '#filePicker',	
	    fileVal:'image',

	    // 只允许选择图片文件。
	    accept: {
	        title: 'Images',
	        extensions: 'gif,jpg,jpeg,bmp,png',
	        mimeTypes: 'image/*'
	    }
	});
	// 当有文件添加进来的时候
	uploader.on( 'fileQueued', function( file ) {
	    var $img = $('<img>');
	    // $list为容器jQuery实例
	    $(".uploader-list img").remove();
	    $(".uploader-list").append( $img );
	    // 创建缩略图
	    // 如果为非图片文件，可以不用调用此方法。
	    // thumbnailWidth x thumbnailHeight 为 100 x 100
	    uploader.makeThumb( file, function( error, src ) {
	        if ( error ) {
	            $img.replaceWith('<span>不能预览</span>');
	            return;
	        }
	        $img.attr( 'src', src );
	    }, 100, 100 ); 
	    changeColor();
	});
	

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
	       	$(".layer").css("height","4.8rem");    

	       	$(".sure").on("click",function(){
	       		$(_this).css("color","#fff");
	       			
	       		changeColor();
	       });
	    });
    }
	// 赛区
	/*var competAreaData = [{'id': '0', 'value': '女性'},
    			   {'id': '1', 'value': '男性'}];
    var selectcompetArea = document.querySelector('#selectcompetArea');
    var competArea = document.querySelector('#competArea');
    choose(competArea,selectcompetArea,competAreaData);*/
	
	$.ajax({
		type:"post",
		url:"/star/video/match/matchAndArea",
		dataType: "json",
		success: function(data){
			console.log(data)
			if(data.result == 1){
				var areaList = '';
				areaList += '<ul>';
				$.each(data.data.matchAreaList,function(index,obj){
					areaList += '<li data-id="'+ obj.id +'">'+ obj.name +'</li>';
				});	
				areaList += '</ul>';
				$("#competAreaPopover .mui-scroll").append(areaList);
			}else{
				layer.open({content: data.msg,style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
			}
		}
	});
		
	$("#selectcompetArea").click(function(){
		mui("#competAreaPopover").popover("show");
		$("#cancel").click(function(){
			mui("#competAreaPopover").popover("hide");
		});
		$("#confirm").click(function(){
			mui("#competAreaPopover").popover("hide");
		});
		$("#competAreaPopover li").click(function(){
			matchAreaId = $(this).attr("data-id");
			matchAreaName = $(this).text();
			$("#selectcompetArea").text(matchAreaName).css("color","#fff");
			mui("#competAreaPopover").popover("hide");
			changeColor();
		});	
	});
	
	

	// 项目组别
	var showGeneralDom = document.querySelector('#showGeneral');
    var suIdDom = document.querySelector('#suId');
    var weiIdDom = document.querySelector('#weiId');
    showGeneralDom.addEventListener('click', function () {
        var suId = showGeneralDom.dataset['su_id'];
        var suValue = showGeneralDom.dataset['su_value'];
        var weiId = showGeneralDom.dataset['wei_id'];
        var weiValue = showGeneralDom.dataset['wei_value'];
        var sanguoSelect = new IosSelect(2, 
            [suData, weiData],
            {
                itemHeight: 35,
                oneLevelId: suId,
                twoLevelId: weiId,
                callback: function (selectOneObj, selectTwoObj) {
                    suIdDom.value = selectOneObj.id;
                    weiIdDom.value = selectTwoObj.id;
                    showGeneralDom.innerHTML = selectOneObj.value + '-' + selectTwoObj.value;
					$(showGeneralDom).css("color","#fff");
                    showGeneralDom.dataset['su_id'] = selectOneObj.id;
                    showGeneralDom.dataset['su_value'] = selectOneObj.value;
                    showGeneralDom.dataset['wei_id'] = selectTwoObj.id;
                    showGeneralDom.dataset['wei_value'] = selectTwoObj.value;
                }
        });
        $(".layer").css("height","4.8rem");   
        
        $(".sure").on("click",function(){
    		changeColor();
        });
    });
    
    
    
	
	$(".btn-close").on("click",function(e){
		mui("#confirmPopover").popover("hide");
	});
	
	$("#confirmButton").on("click",function(){
		//if( checkVal($("#fileList img"),3) && checkVal($("#selectcompetArea"),1) 
		if( checkVal($("#fileList img"),3) 
		    && checkVal($("#school"),0,/^[a-zA-Z\d\u4e00-\u9fa5]+$/)
		    && checkVal($("#class"),0,/^[a-zA-Z\d\u4e00-\u9fa5]+$/) 
		    && checkVal($("#email"),0,/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/)
			&& checkVal($("#showGeneral"),1)){
				
				schoolOrganization = $("#school").val();
				matchId = $("#showGeneral").attr("data-su_id");
				matchName = $("#showGeneral").attr("data-su_value");
				matchAgeId = $("#showGeneral").attr("data-wei_id");
				matchAgeName = $("#showGeneral").attr("data-wei_value");
				classes = $("#class").val();
				parentEmail = $("#email").val();
				
			    mui("#confirmPopover").popover("toggle");
		    
			    $(".user-head img").attr("src",$("#fileList img").attr("src"));
			    $("#name").text(realName);
			    $("#card").text(idNumber); 
			   

			    sex = gender === "0" ? "女" : "男";			    
			    $("#sex").text(sex);
			    
			    $("#nation").text(nationName);
			    $("#area").text(provinceName + "-" + cityName + "-" + countyName);			   
				$("#schoolText").text(schoolOrganization);
				$("#matchArea").text(matchAreaName);
				$("#group").text(matchName+"-"+matchAgeName);
				$("#popoverClass").text(classes);
				$("#popoverEmail").text(parentEmail);
			    // 姓名超出时居中
				if($("#name").text().length > 8){
					$(".user-head").css("vertical-align","baseline");
				}	    

		}	
	});
	
	
	
	function checkVal(obj,type,reg){
		if(type == 0){ // 输入框
			var msg = obj.prev().html().replace(/\:/,"");
			if(obj.val() == ""){
				layer.open({content: msg+'不能为空',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				obj.focus();
				return false;
			}else if(!reg.test(obj.val())){	
				obj.val("");
				layer.open({content: msg+'格式不正确',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				obj.focus();
				$("#confirmButton").attr("disabled","disabled").css("background","rgba(255,255,255,.25)");
				return false;
			}else{
				return true;
			}
		}else if(type == 1){ // 选择框
			var msg = obj.prev().html().replace(/\:/,"");
			if(obj.text() == "请选择"){
				layer.open({content: msg+'不能为空',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				return false;
			}else{
				return true;
			}
		}else if(type == 3){ // 图片
			if(obj.attr("src").indexOf("data") < 0){
				layer.open({content: '证件照不能为空',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				return false;
			}else{
				return true;
			}
		}
	}
	
	
	$("#send").on("tap",function(){
		
		uploader.upload();
		
		uploader.on( 'uploadSuccess', function( file,response ) {
		
		  	if(response.result == 1){
		  		certificateImgUrl = response.data.url;
		  		console.log(certificateImgUrl);
		  		phone = sessionStorage.getItem("phone");
		  		logindata = {'realName': realName,'gender': gender,'idType': idType,'idNumber': idNumber,
					 'province': province,'city': city,'county': county,'provinceName': provinceName,
			         'cityName': cityName,'countyName': countyName,'phone': phone,'code': code,
			         'certificateImgUrl': certificateImgUrl,
			  	     'schoolOrganization': schoolOrganization,'matchId': matchId,
			  		 'matchName': matchName,'matchAgeId': matchAgeId,'matchAgeName': matchAgeName,'classes': classes,
			  	     'parentEmail': parentEmail,'nationId':nationId,currentVersion:current};
			  	     
			  	 
			  	matchdata = {'userId': userId,'realName': realName,'gender': gender,'idType': idType,'idNumber': idNumber,
					 'province': province,'city': city,'county': county,'provinceName': provinceName,
			         'cityName': cityName,'countyName': countyName,
			         'certificateImgUrl': certificateImgUrl,
			  	     'schoolOrganization': schoolOrganization,'matchId': matchId,
			  		 'matchName': matchName,'matchAgeId': matchAgeId,'matchAgeName': matchAgeName,'classes': classes,
			  	     'parentEmail': parentEmail,'nationId':nationId,currentVersion:current};
		  		
		  		
		  		var phone = localStorage.getItem("phone");
				if(phone == null){
					successAjax("/star/user/auth",logindata,"../html/matchinfo.html");	
				}else{
					successAjax("/star/user/login_after_auth",matchdata,"../html/matchinfo.html");
				}
		  	}
			
		});
		
	});
	
	function successAjax(url,data,goto){
		$.ajax({
			type:"post",
			url:url,
			dataType: "json",
			data: data,
			success: function(data){
				console.log(data);
				if(data.result == 1){
					if(data.data.token != null){
						localStorage.setItem("token",data.data.token);
						localStorage.setItem("userId",data.data.user.id);
					}
					layer.open({content: '认证成功',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
					setTimeout(function(){
						window.location.href = goto;
					},2000)
				}else{
					layer.open({content: data.msg,style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				}
			}
		});
	}
	
	
	$("input,textarea").on("input propertychange",function(){
    	changeColor();
    });
    
   	
   	function changeColor(){
   		if($("#fileList img").attr("src") == "../images/profilePic.png" || $("#school").val() == "" || $("#class").val() == "" || $("#email").val() == "" ||
    		//$("#suId").val() == "" || $("#selectcompetArea").text() == "请选择"){
    		$("#suId").val() == ""){
    			$("#confirmButton").attr("disabled","disabled").css("background","rgba(255,255,255,.25)");
    		}else{
    			$("#confirmButton").removeAttr("disabled","disabled").css("background","#ff296a");
    		}
   	}
	
});
