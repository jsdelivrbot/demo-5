$(function(){
	var userId = localStorage.getItem("userId");
	var token = localStorage.getItem("token");
	var surplus = 60;//倒计时时间
	var codeNum;
	var realName,gender,nationId,idType,idNumber,province,city,county,provinceName,cityName,countyName,phone,code,certificateImgUrl,schoolOrganization,
	matchId,matchName,matchAgeId,matchAgeName,classes,parentEmail;
	var login = {
		init: function(){
			var _this = this;
			$(".header-login,.header-logged").hide();
			//_this.checkValOne();
			//_this.getcode();
			_this.clickSubmit();
			_this.uploadPhoto();
		},
		checkValOne: function(){
			var _this = this;
			
			$('.stepOne input').focus(function(){
				$(this).parent("li").css("border-bottom","1px solid #ef6002");
			});
			$('.stepOne input').blur(function(){
				$(this).parent("li").css("border-bottom","1px solid #dad9d9");
			});
			//按钮变化
			$('.stepOne input').on('input propertychange', function() {
				if($('#register_phone').val() != "" && $('#register_code').val() != "") {
					$('.btn-next-two').removeAttr("disabled").css("background","#EF6002");
				} else {
					$('.btn-next-two').attr("disabled",true).css("background","#373533");
				}
			});
			
			$('.btn-next-two').on("click",function(){
				if($("#register_code").val() !== codeNum){
					$(".stepOne .error-tip").html("验证码错误，请重新输入!");
				}else{
					phone = $("#register_phone").val(),
					code = $("#register_code").val();
					
					$('.register-stepProcess .active').next('li').addClass('active');
					$("div.active").removeClass('active').next('div').addClass('active');
				}
			})
		},
		checkValTwo: function(){
			var _this = this;
			if($('#register_name').val() == ""){
				$('#register_name').next().html("请输入姓名!");
				return false;
			}else if($('#register_name').val() !== "" && !/^[a-zA-Z\u4e00-\u9fa5]{1,15}$/.test($('#register_name').val().trim())){
				$('#register_name').next().html("请输入真实姓名!");
				return false;
			}else{
				$('#register_name').next().html("");
			}
			
			if($('#register_nation').val() == ""){
				$('#register_nation').next().html("请选择民族!");
				return false;
			}else{
				$('#register_nation').next().html("");
			}
			
			if($('#register_sex').val() == ""){
				$('#register_sex').next().html("请选择性别!");
				return false;
			}else{
				$('#register_sex').next().html("");
			}
			
			if($('#register_cert').val() == ""){
				$('#register_cert').next().html("请选择证件类型!");
				return false;
			}else{
				$('#register_cert').next().html("");
			}
			
			if($('#register_idNumber').val() == ""){
				$('#register_idNumber').next().html("请输入证件号码!");
				return false;
			}else if($('#register_idNumber').val() !== "" && !/^[a-zA-Z\d]{0,18}$/.test($('#register_idNumber').val().trim())){
				$('#register_idNumber').next().html("请输入正确的证件号码!");
				return false;
			}else{
				$('#register_idNumber').next().html("");
			}
			
			if($('#register_province').val() == ""){
				$('#register_province').nextAll("span").html("请选择所在地区!");
				return false;
			}else{
				$('#register_province').nextAll("span").html("");
			}

			return true;
		},
		checkValThree: function(){
			var _this = this;
			
			if($('#register_photo img').attr("src") == "../images/xw_login_image_photo.png"){
				$('#register_photo').nextAll("span").html("请上传证件照!");
				return false;
			}else{
				$('#register_photo').nextAll("span").html("");
			}
			
			if($('#register_school').val() == ""){
				$('#register_school').next().html("请选择学校/机构!");
				return false;
			}else{
				$('#register_school').next().html("");
			}
			
			if($('#register_class').val() == ""){
				$('#register_class').next().html("请填写所属班级!");
				return false;
			}else{
				$('#register_class').next().html("");
			}
			
			if($('#register_mailbox').val() == ""){
				$('#register_mailbox').next().html("请填写家长邮箱！");
				return false;
			}else if($('#register_mailbox').val() !== "" && !/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/.test($('#register_mailbox').val().trim())){
				$('#register_mailbox').next().html("请输入正确的邮箱地址!");
				return false;
			}else{
				$('#register_mailbox').next().html("");
			}
			
			if($('#register_match').val() == ""){
				$('#register_match').nextAll("span").html("请填写项目！");
				return false;
			}else{
				$('#register_match').nextAll("span").html("");
			}
			
			if($('#register_group').val() == ""){
				$('#register_group').next().html("请填写组别！");
				return false;
			}else{
				$('#register_group').next().html("");
			}
			
			return true;
			
		},
		clickSubmit: function(){
			var _this = this;
			$('.btn-next-three').on("click",function(){
				if(_this.checkValTwo()){
					
					realName = $("#register_name").val(),
					nationId = $("#register_nation").val(),
					gender = $("#register_sex").val(),
					idType = $("#register_cert").val(),
					idNumber = $("#register_idNumber").val(),
					province = $("#register_province").val(),
					city = $("#register_city").val(),
					county = $("#register_county").val(),
					provinceName = $("#register_province").children('option:selected').text(),
					cityName = $("#register_city").children('option:selected').text(),
					countyName = $("#register_county").children('option:selected').text(),
					
					$('.register-stepProcess .active').next('li').addClass('active');
					$("div.active").removeClass('active').next('div').addClass('active');
					_this.uploadPhoto();
				}
			})
			
			$('.btn-submit').on("click",function(){
				if(_this.checkValThree()){
					uploader.upload();//上传证件照
					
					uploader.on('uploadSuccess', function( file,response ) {//证件照上传成功
						console.log(response);
						if(response.result == 1){
							certificateImgUrl = response.data.url;
			  				console.log(certificateImgUrl);
						}
						schoolOrganization = $('#register_school').val(),
						classes = $('#register_class').val(),
						parentEmail = $('#register_mailbox').val(),
						matchId = $('#register_match').val(),
						matchName = $('#register_match').children('option:selected').text(),
						matchAgeId = $('#register_group').val(),
						matchAgeName = $('#register_group').children('option:selected').text();
						
						registerdata = {'userId': userId,'token':token,'realName': realName,'gender': gender,'idType': idType,'idNumber': idNumber,'province': province,
						'city': city,'county': county,'provinceName': provinceName,'cityName': cityName,'countyName': countyName,
						'certificateImgUrl': certificateImgUrl,'schoolOrganization': schoolOrganization,
						'matchId': matchId,'matchName': matchName,'matchAgeId': matchAgeId,'matchAgeName': matchAgeName,
						'classes': classes,'parentEmail': parentEmail,'nationId':nationId,'currentVersion':currentVersion};
						
						$.ajax({
							type:"post",
							url: urlPash + '/star/user/login_after_auth',
							dataType: "jsonp",
							jsonp:"jsonpCallback",
							data: registerdata,
							beforeSend: function(){
								$('#loading').show();$('.btn-submit').attr({ disabled: "disabled" });
							},
							success: function(data){
								console.log(data);
								if(data.result == 1){
									localStorage.setItem("status", 1);
									layer('认证成功',3,function(){window.location.href = basePath + "website/html/information.jsp";});
								}else if( data.msg == "用户已经认证过!"){
									layer('您已经认证过了!',3,function(){window.location.href = basePath + "website/html/information.jsp";});
								}else{
									layer('认证失败，请稍后重试!',3)
								}
							},
							error: function(){
								console.log("请求失败！")
							}
						});
					})
				}
			})
			
		},
		//校验手机
		checkPhone: function(val){
			var _this = this;
			var phoneVal = val.val();
			if(phoneVal == ""){
				$(".stepOne .error-tip").html("请输入手机号!");
				return false;
			}else if(phoneVal !== "" && !/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(phoneVal.trim())){
				$(".stepOne .error-tip").html("请输入正确的手机号!");
				return false;
			}else{
				return true;
			}
		},
		//校验验证码
		checkCode:function(val){
			var _this = this;
			var codeVal = val.val();
			if(codeVal == ""){
				$(".stepOne .error-tip").html("请输入验证码!");
				return false;
			}else{
				return true;
			}
		},
		// 发送验证码
		getcode: function(){
			var _this = this;
			$('.btn-code').on('click',function(){
				var phone = $('#register_phone');
				var btn = $(this);
				if(_this.checkPhone(phone)){
					btn.attr("disabled",true);
					$.ajax({
						type: "get",
						url: urlPash + "/star/user/getVerifyCode?operation=1&phone=" + phone.val(),
						dataType: "jsonp",
						jsonp:"jsonpCallback",
						success:function(data){
							console.log(data);
							switch(data.result){
					 			case "1":
		 							_this.countDown(btn);
									codeNum = data.data.code;
		 							$(".stepOne .error-tip").html("短信发送成功!");
					 				break;
				 				case "200": $(".stepOne .error-tip").html("用户不存在!");btn.removeAttr("disabled"); break;
					 			case "205": $(".stepOne .error-tip").html("手机号已注册!");btn.removeAttr("disabled"); break;
					 			case "206": $(".stepOne .error-tip").html("手机验证码错误!");btn.removeAttr("disabled"); break;
								default: $(".stepOne .error-tip").html("网络出错!");btn.removeAttr("disabled"); break;
							}
						},
						error:function(){
							$(".stepOne .error-tip").html("请求失败!");btn.removeAttr("disabled"); 
						}
					})
				}
			})
		},
		//验证码倒计时
		countDown:function(btn){
			var _this = this;
			
			if(surplus == 1){
				btn.removeAttr("disabled").css("color","#ef6002").val("获取验证码");
				surplus = 60;
			}else{
				btn.attr("disabled",true).css("color","#686868");
				surplus --;
				btn.val( "重新发送" + surplus + "秒");
				setTimeout(function(){
					_this.countDown(btn)
				},1000)
			}
		},
		uploadPhoto: function(){
			var _this = this;
			// 初始化Web Uploader
			uploader = WebUploader.create({
			    // 选完文件后，是否自动上传。
			    auto: false,
			    // swf文件路径
			    swf: './Uploader.swf',
			    runtimeOrder:false,
			    // 文件接收服务端。
		   		server: imgUrlPash + '/file/upload',
			    // 选择文件的按钮。可选。
			    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
			    pick: '#filePicker',	
			    fileVal:'file',
			    // 只允许选择图片文件。
			    accept:{
			    	title:'Images',
			    	extensions:'gif,jpg,jpeg,bmp,png',
			    	mimeTypes:'image/gif,image/jpg,image/jpeg,image/bmp,image/png'
			    }
			});
			
			// 当有文件添加进来的时候
			uploader.on( 'fileQueued', function( file) {
			    var $img = $('<img>');
			    // $list为容器jQuery实例
			    $(".uploader-list img").remove();
			    $(".uploader-list").append( $img );
			    $(".photo-box span").text("已选择文件");
			    // 创建缩略图
			    // 如果为非图片文件，可以不用调用此方法。
			    // thumbnailWidth x thumbnailHeight 为 100 x 100
			    uploader.makeThumb( file, function( error, src ) {
			        if ( error ) {
			            $img.replaceWith('<span>不能预览</span>');
			            return;
			        }
			        $img.attr( 'src', src );
			    }, 46, 48 );			       
			});
			// 文件上传失败，显示上传出错。
			uploader.on( 'uploadError', function( file, data ) {
			    $(".stepThree li:first-child .error-tip").text("上传证件照失败");
			});	
		},
	}
	login.init();
})