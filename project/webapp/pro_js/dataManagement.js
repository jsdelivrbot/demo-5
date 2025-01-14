var successReturn=0;
var time_off=1;//拍报段次默认为1
var isFirst=true;//自动站第一次新建
var isNewFirst=true;//自动站第一次编辑
var wmsIsFirst=true;
var haslayer=false;//是否出现弹窗 //自动站编辑弹窗
var hasCreateLayer=false;//自动站新建弹窗
var hasWmsCreateLayer=false;//人工站新建弹窗
var hasWmsLayer=false;//人工站修改弹窗
var rxPhone = /^(13[0-9]|15[012356789]|18[0-9]|17[678]|14[57])[0-9]{8}$/;// 验证手机

//左侧导航栏切换
function changeLeftNav(){
		$(this).addClass('active').siblings().removeClass('active');
		$('.rightContent').eq($(this).index()).removeClass('hide').siblings().addClass('hide');
		if($(this).hasClass('left-item1')){//自动测报数据修补
			initDateTimePicker("content1Starttime","content1Endtime");
			$('.rightContent1 .btn-tabs button:first').trigger("click");
			//加载自动测报数据修补列表
		}else if($(this).hasClass('left-item2')){//自动站信息管理
			getAutomaticStationList(6);

		}else if($(this).hasClass('left-item3')){//人工站信息管理
			getartificialStationList(7);
		}else if($(this).hasClass('left-item4')){//区域平均降雨
			// 初始化时间插件
			initDateTimePicker("content3Starttime","content3Endtime");
			// 获取数据
			getAverageRainList();
		}else if($(this).hasClass('left-item5')){//区域信息管理
			getAreaList();
		}
		//setLeftHeight();
}

/*第一页: 切换雨量站and水位站*/
function changeContent1Class(){
	$(this).addClass('active').siblings().removeClass('active');
	var isRainfall;
	if (this.className.indexOf("btn1")===-1) {  // btn2:河道水位 和 btn3:水库水位
		$(".rightContent1 .right-table-title li:eq(2)").text("水位");
		$('#renderWaterLevel').removeClass('hide').siblings('.right-table-body-dataBind').addClass('hide');
		isRainfall = false;
	}else {  // btn1:雨量
		$(".rightContent1 .right-table-title li:eq(2)").text("雨量");
		$('#renderRainfall').removeClass('hide').siblings('.right-table-body-dataBind').addClass('hide');
		isRainfall = true;
	}
	getAutoRepairStationName(isRainfall);  /*加载站名+加载数据*/
}

/*第一页:自动测报数据修补-加载站名*/
function getAutoRepairStationName(isRainfall){
	$.ajax({
		url: getStationNameListUrl,
		type: 'get',
		data: {
			typeFlag: $(".rightContent1 .btn-tabs button.active").data("typeflag")
		},
		dataType: 'json',
		success: function(result){
			if (result.status === successReturn) {
				var data = result.data;
				var $select = $(".rightContent1 .selectpickerBox select");
				$select.html("");  // 清除旧数据
				$.each(data,function(i,val){  // 插入新数据
					$select.append("<option value='" + val.id + "'>" + val.station_name + "</option>");
				});
				$select.selectpicker('refresh');  // 更新选择框的数据
				getAutoRepairData(isRainfall);  // 加载数据
			}else {
				errorBox(result.msg);
			}
		},
		error: function(err){
			console.log(err);
		}
	});
}
/*第一页:自动测报数据修补-加载数据*/
function getAutoRepairData(isRainfall){
	$.ajax({
		url: getStationDataUrl,
		type: 'get',
		data: {
			typeFlag: $(".rightContent1 .btn-tabs button.active").data("typeflag"),
			sta_id: $(".rightContent1 .selectpickerBox select").val(),
			begin_time: $("#content1Starttime").val(),
			end_time: $("#content1Endtime").val()
		},
		dataType: 'json',
		success: function(result){
			if (result.status === successReturn) {
				var data = result.data;
				if(data.length>0){
					$("#renderRainfall").show();
					$("#renderWaterLevel").show();
					$('.rightContent1 .notContent').addClass('hide');
					$.each(data,function(i,val){
						//把时间戳处理成"2017.01.01 8:00:00"格式
						val.collectionTime = getAutoRepairTime(val.time);  //采集时间
						val.receiveTime = getAutoRepairTime(val.createtime);  //接收时间
					});
					var dataProperty = {
						"station_name": {
							"data-stationid": function(){
								return this.sta_id;
							},
							"data-id": function(){
								return this.id;
							}
						}
					};

					if(isRainfall){
						$("#renderRainfall").render(data, dataProperty);
					}else{
						$("#renderWaterLevel").render(data, dataProperty);
					}
				}else{
					$("#renderRainfall").hide();
					$("#renderWaterLevel").hide();
					$('.rightContent1 .notContent').removeClass('hide');
				}
			}else{
				errorBox(result.msg);
			}
		},
		error: function(err){
			console.log(err);
		}
	});
}

/**自动测报数据修补弹窗**/
function showAugmentModal(e){
	var name = $(".rightContent1 .pannel-content .dropdown-toggle").text();
	var value = $(".rightContent1 .selectpicker").val();
	var augmentModal = document.querySelector("#augmentModal");
	var augmentModalTitle = augmentModal.querySelector(".augmentModalTitle");
	$("#userData .stationName").text( $(".rightContent1").find(".pannel-content .dropdown-toggle").text() );  /*设置站名*/

	if(!$(this).hasClass("editBox")){//新建
		augmentModalTitle.innerText = "增补";
		/*true:新建区域; false:修改区域; 设置stationid*/
		augmentModalTitle.setAttribute("data-iscreate",true);
		augmentModalTitle.setAttribute("data-id", "");
		$("#augmentModal input").val("");  //清空form
	}else{//编辑
		augmentModalTitle.innerText = "修改";
		/*true:新建区域; fasle:修改区域; 设置stationid*/
		augmentModalTitle.setAttribute("data-iscreate",false);
		augmentModalTitle.setAttribute("data-id", $(this).parent().parent().find("[data-bind=station_name]:first").data("id"));
		// 填写采集时间
		$("#augmentModal .timePicker").val($(this).parent().parent().find("[data-bind=collectionTime]").text().replace(/[.]/g,"-"));
		// 填写测报数据
		$("#monitorData").val($(this).parent().parent().find("li:eq(2)").text());
	}
	augmentModalTitle.setAttribute("data-stationid", $(".rightContent1 .selectpicker").val());


	$("#augmentModal").modal("show");
	if ($(".rightContent1 .btn-tabs>button:first").hasClass("active")) {  // 雨量值
		$("#augmentModal .collectionValue input").attr("onkeypress","return myNumberic(event,1)");
	}else {  // 水位值
		$("#augmentModal .collectionValue input").attr("onkeypress","return myNumberic(event,2)");
	}
	$("#augmentModal .hintText").css("display","none").text("");  //清空提示语
}

/**自动测站数据修补新建&&编辑保存**/
function saveAugment(){
	var monitorData = $("#monitorData").val();
	if (monitorData==""||monitorData.indexOf(/ /)!=-1) {  // 数据为空
		$("#augmentModal .hintText").css("display","block").text("请填写测报数据");
		return false;
	}
	if ($(".rightContent1 .btn-tabs>button:first").hasClass("active")) {  // 雨量值
		monitorData = round(monitorData,1);
	}else {  // 水位值
		monitorData = round(monitorData,2);
	}
	//判断是 新建(true) or 修改(false)
	if ($(".augmentModalTitle")[0].getAttribute("data-iscreate") == "true") {
		var sendData1 = {
			typeFlag: $(".rightContent1 .btn-tabs button.active").data("typeflag").toString(),
			sta_id: parseInt($("#augmentModal .augmentModalTitle").attr("data-stationid"),10),
			time: $("#collectionTimeBox").val(),
			monitorData: monitorData
		};
		console.log(sendData1);
		$.ajax({
			url: addMonitorDataUrl,
			type: 'post',
			data: sendData1,
			dataType: 'json',
			success: function(result){
				console.log(result);
				if (result.status === successReturn) {  //关闭弹窗并更新数据
					$("#augmentModal").modal("hide");
					$("#rightContent1_search_btn").trigger("click");
				}else {
					errorBox(result.msg);
				}
			},
			error: function(err){
				console.log(err);
			}
		});
	}else {
		var sendData2 = {
			typeFlag: $(".rightContent1 .btn-tabs button.active").data("typeflag").toString(),
			sta_id: parseInt($("#augmentModal .augmentModalTitle").data("stationid"),10),
			data_id: parseInt($("#augmentModal .augmentModalTitle").data("id"),10),
			time: $("#collectionTimeBox").val(),
			monitorData: monitorData
		};
		console.log(sendData2);
		$.ajax({
			url: updateMonitorDataUrl,
			type: 'post',
			data: sendData2,
			dataType: 'json',
			success: function(result){
				console.log(result);
				if (result.status === successReturn) {  //关闭弹窗并更新数据
					$("#augmentModal").modal("hide");
					$("#rightContent1_search_btn").trigger("click");
				}else {
					errorBox(result.msg);
				}
			},
			error: function(err){
				console.log(err);
			}
		});
	}
}

//拍报段次
function sectionItemChange(){
	$('.sectionItem ').off('click').on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
		time_off=parseInt($(this).find('span').html());
	});
}

/**自动站信息管理列表**/
function getAutomaticStationList(station_type){
	var stationListNoContent=$('.rightContent2 .notContent');
	var stationList=$('.rightContent2 .right-table-body-dataBind');
	$.ajax({
		url:getStationListUrl,
		type:"get",
		data:{
			station_type:station_type
		},
		dataType:"json",
		success:function(result){
			if(successReturn == result.status){
				var stationAjaxList=result.data;
				if(null != stationAjaxList && stationAjaxList.length == 0){
					stationListNoContent.removeClass('hide');
					stationList.addClass('hide');
				}else if(null != stationAjaxList){
					stationList.removeClass('hide');
					stationListNoContent.addClass('hide');
					stationAjaxListProporty={
						stcd:{
							class:function(e){
								if(this.stcd==""){
									return e.value+" frozen";
								}else{
									return e.value;
								}
							},
							text:function(){
								if(this.stcd==""){
									return "—";
								}
							}
						},
						station_location:{
							class:function(e){
								if(this.station_location==""||this.station_location=="—"){
									return e.value+" frozen";
								}else{
									return e.value;
								}
							},
							text:function(){
								if(this.station_location==""){
									return "—";
								}
							}
						},
						area_name:{
							"dataId":function(){
								return this.area_id;
							}
						}
					}
					stationList.render(stationAjaxList,stationAjaxListProporty);

					//$('#create').off("click").on("click",createStationModal);

					//setLeftHeight();
				}
			}else{
				errorBox(result.msg);
			}

		},
		error:function(XMLHttpRequest){
			// error_500(XMLHttpRequest.responseText);
		}
	});
}

//自动站新建测站弹窗
function createStationModal(){
	$('#createStationForm').removeClass('hide').next().addClass('hide');
	$('#createStation .modal-header>span').html('新建测站');
	//$('#createStationForm input').val('');//清空横纵坐标

	$('#createStationForm .errorB').html('');
	getTypeList();//获取测站类型
	getListOfArea();//获取区域
	$('#rainShowCoding').addClass('hide');
	$('#showCoding').addClass('hide');
	$('#showCorrectedVal').addClass('hide');
	$("#createStation").modal("show");
	hasCreateLayer=true;
	$('input[type="text"]').val('');//清空横纵坐标以及清除地图上点
	$('#createStation').on('shown.bs.modal',function() {
    	if(hasCreateLayer){
			if(isNewFirst){
	    		$('#map').empty();
				getPropertyAndSetMap(true,'map','create');
	    		hasCreateLayer=false;
			}
    	}
	});

	//切换拍报段次
	sectionItemChange();
	//新建自动站保存
	$('#createStationSave').off('click').on('click',function(){
    	automaticCreateStation(time_off);
    });
}

/**自动站信息管理-新建测站**/
function automaticCreateStation(time_off){
	//获取新建测站用户填写数据发送后后台
	$('.errorB').html('');
	//表单校验
	var station_name=$('input[name="station_name"]').val();//测站名称
	var type_name=$('.station-type-picker option:selected').val();//测站类型名称

	var stcd=$('input[name="stcd"]').val();//国家标准码
	var x=$('input[name="x"]').val();//横坐标
	var y=$('input[name="y"]').val();//纵坐标
	var time_off=time_off;//拍报段次
	var station_location=$('input[name="station_location"]').val();//站址
	var area_name=$('.area-picker option:selected').val();//区域
	var comments=$('textarea[name="comments"]').val();//备注
	var station_type=6;//测站类型
	var dataSubmit=false;
	//var str="&param_id="+param_id+"&corvalue="+corvalue;//参数编码&修正值
	var obj={};//大对象
	var stationEntityObj={};
	stationEntityObj.station_name=station_name;
	stationEntityObj.station_type_id=type_name;
	stationEntityObj.stcd=stcd;
	stationEntityObj.x=x;
	stationEntityObj.y=y;
	stationEntityObj.station_location=station_location;
	stationEntityObj.area_id=area_name;
	stationEntityObj.comments=comments;
	stationEntityObj.time_off=time_off;
	stationEntityObj.station_type=6;
	obj.stationEntity=stationEntityObj;

	var codeEntitiesArr=[];//数组集合
	var codeEntitiesitem1={};//数组中包含的小对象[{},{}]
	var codeEntitiesitem2={};

	var cor=$('#showCorrectedVal:not(".hide") input[name="corvalue"]');//修正值
	var corvalue;

	var param0=$('.coding:not(".hide") input[name="param_id"]')[0];//编码1
	var param1=$('.coding:not(".hide") input[name="param_id"]')[1];//编码2
	//前端校验
	if(station_name==""){
		// errorBox("请输入测站名称");
		$('.stationNameError').html('请输入测站名称').show();
	}
	if(type_name==""){
		// errorBox("请选择测站类型");
		$('.stationTypeError').html('请输入测站类型').show();
	}
	if(stcd.length>8){
		$('#createStation .stcdError').html('请输入小于等于8位的国家标准码').show();
	}

	if(param0){
		codeEntitiesitem1.param_id=param0.value;//参数编码
		if(cor){
			corvalue=cor.val();
			if(corvalue==""){
				// errorBox('请填写修正值');
				$('.correctedValError').html('请填写修正值').show();

			}

		}else{
			corvalue=null;
		}
		if(param0.value==""){
			// errorBox('参数编码不能为空');
			if(type_name==1){
				$('.codingError').html('雨量站编码不能为空').show();
			}else if(type_name==2){
				$('.codingError').html('水库水位站编码不能为空').show();
			}else if(type_name==3){
				$('.codingError').html('河道水位站编码不能为空').show();
			}else if(type_name==4){
				$($('.codingError')[0]).html('雨量站编码不能为空').show();
				// $($('.codingError')[1]).html('水库水文站编码不能为空').show();
			}else if(type_name==5){
				$($('.codingError')[0]).html('雨量站编码不能为空').show();
				// $($('.codingError')[1]).html('河道水文站编码不能为空').show();
			}


		}else if(param0.value.length>=14){

			if (param0.value.substr(-3,1)=='3') {//水位 有修正值
				codeEntitiesitem1.corvalue=Number(corvalue);
			}else if(param0.value.substr(-3,1)=='4'){//雨量 无修正值
				codeEntitiesitem1.corvalue=null;
			}
			codeEntitiesArr.push(codeEntitiesitem1);

		}else{
			// errorBox('参数编码格式不正确');
			$($('.codingError')[0]).html('参数编码格式不正确').show();

		}

	}else{
		// errorBox('请选择测站类型输入参数编码');

	}
	if(param1){
		codeEntitiesitem2.param_id=param1.value;
		if(cor){
			corvalue=cor.val();
			if(corvalue==""){
				// errorBox('请填写修正值');
				$('.correctedValError').html('请填写修正值').show();
			}

		}else{
			corvalue=null;
		}

		if(param1.value==""){
			// errorBox('参数编码不能为空');
			if(type_name==1){
				$('.codingError').html('雨量站编码不能为空').show();
			}else if(type_name==2){
				$('.codingError').html('水库水位站编码不能为空').show();
			}else if(type_name==3){
				$('.codingError').html('河道水位站编码不能为空').show();
			}else if(type_name==4){

				// $($('.codingError')[0]).html('雨量站编码不能为空').show();
				$($('.codingError')[1]).html('水库水文站编码不能为空').show();
			}else if(type_name==5){
				// $($('.codingError')[0]).html('雨量站编码不能为空').show();
				$($('.codingError')[1]).html('河道水文站编码不能为空').show();
			}

		}else if(param1.value.length>=14){

			if (param1.value.substr(-3,1)=='3') {//水位 有修正值
				codeEntitiesitem2.corvalue=corvalue;
			}else if(param0.value.substr(-3,1)=='4'){//雨量 无修正值
				codeEntitiesitem2.corvalue=null;
			}
			codeEntitiesArr.push(codeEntitiesitem2);
		}else{
			// errorBox('参数编码格式不正确');
			$($('.codingError')[1]).html('参数编码格式不正确').show();

		}
	}
	obj.codeEntities=codeEntitiesArr;

	if(!x&&!y){
		// errorBox("请在左侧地图中选择坐标");
		$('.xError').html('请在左侧地图中选择坐标').show();
		$('.yError').html('请在左侧地图中选择坐标').show();

	}
	if(!area_name){
		$('.areaError').html('请选择区域').show();
	}

	if(param0&&param0.value==""){//编码1
		return;
	}
	if(param1&&param1.value==""){//编码2
		return;
	}
	if(cor&&cor.val()==""){//修正值
		return;
	}
	if(station_name==""||type_name==""||x==""||y==""||area_name==""||stcd.length>8){
	 	return;
	}else{
		//通过前端校验之后发送ajax
		$.ajax({
			url:createStationUrl,
			type:"post",
			traditional: true,
         	contentType : 'application/json;charset=utf-8',
			data: JSON.stringify(obj),
			dataType:"json",
			success:function(result){
				if(successReturn == result.status){
					$('#createStation').modal('hide');
					outBoxClose('创建成功');
					getAutomaticStationList('6');
				}else{
					errorBox(result.msg);
				}
			},
			error:function(XMLHttpRequest){
				// error_500(XMLHttpRequest.responseText);
			}
		});
	}

}

//自动站修改测站弹窗
function editStationModal(e){
	$('#editStationForm').removeClass('hide').prev().addClass('hide');
	$('#editRainShowCoding').addClass('hide');
	$('#editShowCoding').addClass('hide');
	$('#editShowCorrectedVal').addClass('hide');

	$('#createStation .modal-header>span').html('修改测站');
	$('#editStation-type-picker').attr('disabled','disabled');



	editStation($(e));

 }

//修改测站
function editStation(e){

	var stationId=e.parents('.right-table-row').first().find('.content2RowId').val();
	//调用getStationInfoDetailUrl
	$.ajax({
		url:getStationInfoDetailUrl,
		type:"get",
		data:{stationId:stationId},
		dataType:"json",
		success:function(result){
			if(successReturn == result.status){
				$('#createStation').modal('show');
				haslayer=true;
				var stationInfo=result.data;
				var paramCol=result.dataSub;
				//console.log(stationInfo);
				if(null != stationInfo && stationInfo.length == 0){

				}else if(null != stationInfo){
					time_off=stationInfo.time_off;
					if(time_off=="1"){
						$('.sectionItem'+time_off).addClass('active').siblings().removeClass('active');
					}else if(time_off=="2"){
						$('.sectionItem'+time_off).addClass('active').siblings().removeClass('active');
					}else if(time_off=="4"){
						$('.sectionItem'+time_off).addClass('active').siblings().removeClass('active');
					}else if(time_off=="6"){
						$('.sectionItem'+time_off).addClass('active').siblings().removeClass('active');
					}

					var station_type_id=stationInfo.station_type_id;

					var area_name=e.parent().prev().html();
					var area_id=e.parent().prev().attr('dataId');
					// $('.type_name').html(e.parent().prev().prev().html());

			     	getListOfArea(area_name);//获取当前站区域
					getTypeList(stationInfo.station_type_id);//获取当前站测站类型
					//自动站编辑绑定参数编码和修正值
					loadEditCoding(stationInfo.station_type_id,paramCol);
					// var editRainShowCoding=$('#editRainShowCoding').not('.hide').find('input[name="param_id"]');
					// var editShowCoding=$('#editShowCoding').not('.hide').find('input[name="param_id"]');
					// console.log(editRainShowCoding,editShowCoding);

					$('#createStation').on('shown.bs.modal',function(){//执行多次

						if(haslayer){
							$('#editStationForm').find('.stationNameError').html('');//清空错误信息
							$('#editStationForm #editRainShowCoding').find('[data-bind="param_id"]').html("");
							$('#editStationForm #editShowCoding').find('[data-bind="param_id"]').html("");
							$('#editStationForm #editShowCorrectedVal').find('[data-bind="corvalue"]').html("");
							var x=$("#editStationForm").find('input[name="x"]').val();//经纬度设置点坐标
							var y=$("#editStationForm").find('input[name="y"]').val();
							if(paramCol&&paramCol.length>0){
								if($('#editShowCoding').hasClass('hide')){
									$('#editStationForm #editRainShowCoding').find('[data-bind="param_id"]').html(paramCol[0].param_id);
								}
								if($('#editRainShowCoding').hasClass('hide')){
									$('#editStationForm #editShowCoding').find('[data-bind="param_id"]').html(paramCol[0].param_id);
								}

								if(paramCol[0].corvalue){//水位站
									$('#editStationForm #editShowCorrectedVal').find('[data-bind="corvalue"]').html(paramCol[0].corvalue);
								}

								if(paramCol.length==2){
									$('#editStationForm #editRainShowCoding').find('[data-bind="param_id"]').html(paramCol[0].param_id);
									$('#editStationForm #editShowCoding').find('[data-bind="param_id"]').html(paramCol[1].param_id);
									$('#editStationForm #editShowCorrectedVal').find('[data-bind="corvalue"]').html(paramCol[1].corvalue);
								}
							}


							//创建和修改 地图只创建一次
							if(isFirst){
								$('#map').empty();
								//console.log('清空地图');
					    		// Map.init(true,'map','edit',[Number(x),Number(y)]);
								getPropertyAndSetMap(true,'map','edit',[Number(x),Number(y)]);

					    	}

				    	}
				    	haslayer=false;
					});

					// console.log(stationInfo);
					// console.log(paramCol);

		     		$('#editStationForm').render(stationInfo);

			    	//切换拍报段次
					sectionItemChange();
			    	$('#editStationSave').off('click').on('click',function(){
			    		updateStationInfo(stationId,time_off);
			    	});
				}
			}else{
				errorBox(result.msg);
			}

		},
		error:function(XMLHttpRequest){
			// error_500(XMLHttpRequest.responseText);
		}
	});
}

/**修改保存更新当前站信息**/
function updateStationInfo(stationId,time_off){
	//表单校验
	var station_name=$('#editStationForm input[name="station_name"]').val();//测站名称
	var type_name=$('#editStationForm .station-type-picker').val()	;//测站类型名称
	var stcd=$('#editStationForm input[name="stcd"]').val();//国家标准码
	var x=$('#editStationForm input[name="x"]').val();//横坐标
	var y=$('#editStationForm input[name="y"]').val();//纵坐标
	var time_off=time_off;//拍报段次
	var station_location=$('#editStationForm input[name="station_location"]').val();//站址
	var area_name=$('#editStationForm .area_name').prev().val();//区域
	var comments=$('#editStationForm textarea[name="comments"]').val();//备注
	var station_type=6;//测站类型

	//var str="&param_id="+param_id+"&corvalue="+corvalue;//参数编码&修正值
	var obj={};//大对象
	var stationEntityObj={};
	stationEntityObj.station_name=station_name;
	stationEntityObj.station_type_id=type_name;
	stationEntityObj.stcd=stcd;
	stationEntityObj.x=x;
	stationEntityObj.y=y;
	stationEntityObj.station_location=station_location;
	stationEntityObj.area_id=area_name;
	stationEntityObj.comments=comments;
	stationEntityObj.time_off=time_off;
	stationEntityObj.id=stationId;
	obj.stationEntity=stationEntityObj;

	var codeEntitiesArr=[];//数组集合
	var codeEntitiesitem1={};//数组中包含的小对象[{},{}]
	var codeEntitiesitem2={};

	var cor=$('#editShowCorrectedVal:not(".hide") [data-bind="corvalue"]');//修正值
	var corvalue;

	var param0=$('#editStationForm [data-bind="param_id"]')[0];//编码1
	var param1=$('#editStationForm [data-bind="param_id"]')[1];//编码2

	//前端校验
	if(station_name==""){
		// errorBox("请输入测站名称");
		$('.stationNameError').html('请输入测站名称').show();
		// return ;
	}
	if(type_name==""){
		$('.stationTypeError').html('请输入测站类型').show();
		// errorBox("请选择测站类型");
		// return ;
	}

	if(!$(param0.parentNode.parentNode).hasClass('hide')){
		codeEntitiesitem1.param_id=param0.innerHTML;//参数编码
		if(param0.innerHTML==""){
			// errorBox('参数编码不能为空');
			// return ;

		}else if(param0.innerHTML.length>=14){
			if(cor){
				corvalue=cor.html();
				if(corvalue==""){
					// errorBox('请填写修正值');
					// return ;
				}

			}else{
				corvalue=null;
			}

			if (param0.innerHTML.substr(-3,1)=='3') {//水位 有修正值
				codeEntitiesitem1.corvalue=corvalue;
			}else if(param0.innerHTML.substr(-3,1)=='4'){//雨量 无修正值
				codeEntitiesitem1.corvalue=null;
			}
			codeEntitiesArr.push(codeEntitiesitem1);

		}else{
			// errorBox('参数编码格式不正确');
			// return ;
		}

	}else{
		// errorBox('请选择测站类型输入参数编码');
		// return ;
	}
	if(!$(param1.parentNode.parentNode).hasClass('hide')){
		codeEntitiesitem2.param_id=param1.innerHTML;
		if(param1.innerHTML==""){
			// errorBox('参数编码不能为空');
			// return ;
		}else if(param1.innerHTML.length>=14){
			if(cor){
				corvalue=cor.html();
				if(corvalue==""){
					// errorBox('请填写修正值');
					// return ;
				}

			}else{
				corvalue=null;
			}

			if (param1.innerHTML.substr(-3,1)=='3') {//水位 有修正值
				codeEntitiesitem2.corvalue=corvalue;
			}else if(param0.innerHTML.substr(-3,1)=='4'){//雨量 无修正值
				codeEntitiesitem2.corvalue=null;
			}
			codeEntitiesArr.push(codeEntitiesitem2);
		}else{
			// errorBox('参数编码格式不正确');
			// return ;
		}
	}
	obj.codeEntities=codeEntitiesArr;




	if(station_name==""){
		return;
	}else{

	console.log($('#editStationForm').serialize()+'&id='+stationId+"&time_off="+time_off);

		$.ajax({
			url:updateStationInfoUrl,
			type:"post",
			data:$('#editStationForm').serialize()+'&id='+stationId+"&time_off="+time_off,
			dataType:"json",
			success:function(result){
				console.log(result);
				if(successReturn == result.status){
					$('#createStation').modal('hide');
					outBoxClose('修改成功');
					getAutomaticStationList('6');

				}else{
					errorBox(result.msg);
				}
			},
			error:function(XMLHttpRequest){
				// error_500(XMLHttpRequest.responseText);
			}
		});
	}
}

//新建测站弹窗查询测站类型列表
function getTypeList(flag){
	$.ajax({
		url:getTypeListUrl,
		type:"get",
		data:{},
		dataType:"json",
		success:function(result){
			if(successReturn == result.status){

				result.data.unshift({
					"sta_type_id": "",
					"type_name": "--请选择--"
				});
				var typeAjaxList=result.data;
				if(null != typeAjaxList && typeAjaxList.length == 0){

				}else if(null != typeAjaxList){

					var typeAjaxListVal={
						type_name:{
							value:function(){
								return this.sta_type_id;
							}
						}
					};
					//自动站
					$('#createStation-type-picker,#editStation-type-picker').render(typeAjaxList,typeAjaxListVal);
					$('#createStation-type-picker option:first,#editStation-type-picker option:first').attr('disabled',true);

					//人工站
					$('#createWmsStation-type-picker,#editWmsStation-type-picker').render(typeAjaxList,typeAjaxListVal);
					$('#createWmsStation-type-picker option:first,#editWmsStation-type-picker option:first').attr('disabled',true);

					if(flag){//编辑
						$('#editStation-type-picker').selectpicker('val',flag);//自动站编辑测站类型
						$('#editStation-type-picker').selectpicker('refresh');
						//loadEditCoding(flag);//自动站编辑测站根据后台返回测站类型改变
						$('#editWmsStation-type-picker').selectpicker('val',flag);//人工站站编辑测站类型
						$('#editWmsStation-type-picker').selectpicker('refresh');

					}else{
						$('#createStation-type-picker').selectpicker('val','');//自动站编新建站类型
						$('#createStation-type-picker').selectpicker('refresh');
						$('#createWmsStation-type-picker').selectpicker('val','');//人工站新建测站类型
						$('#createWmsStation-type-picker').selectpicker('refresh');
					}

				}

			}else{
				errorBox(result.msg);
			}

		},
		error:function(XMLHttpRequest){
			// error_500(XMLHttpRequest.responseText);
		}
	});

}
//新建测站弹窗查询区域列表
//flag 是否编辑
function getListOfArea(flag){
	$.ajax({
		url:getListOfAreaUrl,
		type:"get",
		data:{},
		dataType:"json",
		success:function(result){
			if(successReturn == result.status){
				result.data.unshift({
					"area_id": "",
					"area_name": "--请选择--"
				});
				var getListOfArea=result.data;
				if(null != getListOfArea && getListOfArea.length == 0){

				}else if(null != getListOfArea){
					var getListOfAreaVal={
						area_name:{
							value:function(){
								return this.area_id;
							}
						}
					};
					//自动站
					$('#createArea-picker').render(getListOfArea,getListOfAreaVal);//自动站新建区域
					$('#createArea-picker option:first').attr('disabled',true);

					//人工站

					$('#createWmsArea-picker').render(getListOfArea,getListOfAreaVal);//人工站新建区域
					$('#createWmsArea-picker option:first').attr('disabled',true);

					// $('#createWmsArea-picker,#editWmsArea-picker').render(getListOfArea,getListOfAreaVal);
					// $('#createWmsArea-picker option:first,#editWmsArea-picker option:first').attr('disabled',true);

					// $('#createWmsArea-picker,#editWmsArea-picker').render(getListOfArea,getListOfAreaVal);
					// $('#createWmsArea-picker option:first,#editWmsArea-picker option:first').attr('disabled',true);

					if(flag){//编辑

						$('#AwsArea,#wmsArea').find('.area_name').html(flag);

						//自动站
						// $('#editArea-picker').selectpicker('val',flag);
						// $('#editArea-picker').selectpicker('refresh');

						//人工站

						// $('#editWmsArea-picker').selectpicker('val',flag);
						// $('#editWmsArea-picker').selectpicker('refresh');

					}else{
						//自动站
						$('#createArea-picker').selectpicker('val','');//自动站新建区域
						$('#createArea-picker').selectpicker('refresh');

						//人工站
						$('#createWmsArea-picker').selectpicker('val','');//人工站新建区域
						$('#createWmsArea-picker').selectpicker('refresh');
					}

				}
			}else{
				errorBox(result.msg);
			}

		},
		error:function(XMLHttpRequest){
			// error_500(XMLHttpRequest.responseText);
		}
	});

}

//根据测站类型出现编码和修正值
function showCoding(){
	var selectedVal=$(this).val();
	$('#rainShowCoding').find('input').val('');
	$('#showCoding').find('input').val('');
	$('#showCorrectedVal').find('input').val('');
	loadCoding(selectedVal);
}
function loadCoding(selectedVal){
	if(selectedVal=='1'){//雨量站 雨量站编码
		$('#rainShowCoding').removeClass('hide');
		$("#rainShowCoding .leftName").html('雨量站编码');
		$('#showCorrectedVal').addClass('hide');
		$('#showCoding').addClass('hide');
	}else if(selectedVal=='2'){//水库水位站 水库水位站编码,水库修正值
		$('#rainShowCoding').addClass('hide');
		$('#showCoding').removeClass('hide');
		$("#showCoding .leftName").html('水库水位站编码');
		$('#showCorrectedVal').removeClass('hide');
		$("#showCorrectedVal .leftName").html('水库水位站修正值');
	}else if(selectedVal=='3'){//河道水位站 河道水位站编码,河道修正值
		$('#rainShowCoding').addClass('hide');
		$('#showCoding').removeClass('hide');
		$("#showCoding .leftName").html('河道水位站编码');
		$('#showCorrectedVal').removeClass('hide');
		$("#showCorrectedVal .leftName").html('河道水位站修正值');
	}else if(selectedVal=='4'){//水库水文站 雨量站编码,水库水位站编码,水库修正值
		$('#rainShowCoding').removeClass('hide');
		$('#showCoding').removeClass('hide');
		$("#rainShowCoding .leftName").html('雨量站编码');
		$("#showCoding .leftName").html('水库水文站编码');
		$('#showCorrectedVal').removeClass('hide');
		$("#showCorrectedVal .leftName").html('水库水文站修正值');
	}else if(selectedVal=='5'){//河道水文站 雨量站编码,河道水位站编码,河道修正值
		$('#rainShowCoding').removeClass('hide');
		$('#showCoding').removeClass('hide');
		$("#rainShowCoding .leftName").html('雨量站编码');
		$("#showCoding .leftName").html('河道水文站编码');
		$('#showCorrectedVal').removeClass('hide');
		$("#showCorrectedVal .leftName").html('河道水文站修正值');
	}

}

function editShowCoding(){
	selectedVal=$(this).val();
	$('#editRainShowCoding').find('input').val('');
	$('#editShowCoding').removeClass('hide');
	$('#editShowCoding').find('input').val('');
	$('#editShowCorrectedVal').find('input').val('');
	loadEditCoding(selectedVal);
}

function loadEditCoding(selectedVal,paramCol){
	if(selectedVal=='1'){//雨量站 雨量站编码
		$('#editRainShowCoding').removeClass('hide');
		$("#editRainShowCoding .leftName").html('雨量站编码');
		$('#editShowCorrectedVal').addClass('hide');
		$('#editShowCoding').addClass('hide');
	}else if(selectedVal=='2'){//水库水位站 水库水位站编码,水库修正值
		$('#editRainShowCoding').addClass('hide');
		$('#editShowCoding').removeClass('hide');
		$("#editShowCoding .leftName").html('水库水位站编码');
		$('#editShowCorrectedVal').removeClass('hide');
		$("#editShowCorrectedVal .leftName").html('水库水位站修正值');
	}else if(selectedVal=='3'){//河道水位站 河道水位站编码,河道修正值
		$('#editRainShowCoding').addClass('hide');
		$('#editShowCoding').removeClass('hide');
		$("#editShowCoding .leftName").html('河道水位站编码');
		$('#editShowCorrectedVal').removeClass('hide');
		$("#editShowCorrectedVal .leftName").html('河道水位站修正值');
	}else if(selectedVal=='4'){//水库水文站 雨量站编码,水库水位站编码,水库修正值
		$('#editRainShowCoding').removeClass('hide');
		$('#editShowCoding').removeClass('hide');
		$("#editRainShowCoding .leftName").html('雨量站编码');
		$("#editShowCoding .leftName").html('水库水文站编码');
		$('#editShowCorrectedVal').removeClass('hide');
		$("#editShowCorrectedVal .leftName").html('水库水文站修正值');
	}else if(selectedVal=='5'){//河道水文站 雨量站编码,河道水位站编码,河道修正值
		$('#editRainShowCoding').removeClass('hide');
		$('#editShowCoding').removeClass('hide');
		$("#editRainShowCoding .leftName").html('雨量站编码');
		$("#editShowCoding .leftName").html('河道水文站编码');
		$('#editShowCorrectedVal').removeClass('hide');
		$("#editShowCorrectedVal .leftName").html('河道水文站修正值');
	}

}

/*删除测站*/
function deleteStation(){
	// console.log({sta_id: $("#deleteStation .stationName").attr("data-stationid")});
	$.ajax({
		url: stationDelete,
		type: 'get',
		data: {
			sta_id: $("#deleteStation .stationName").attr("data-stationid")
		},
		dataType: 'json',
		success: function(result){
			// console.log(result);
			if (result.status === successReturn) {
				$("#deleteStation").modal("hide");
				$(".left-item.active").trigger("click");
			}else{
				errorBox(result.msg);
			}
		},
		error: function(XMLHttpRequest){
			// error_500(XMLHttpRequest.responseText);
		}
	});
}

/*人工站信息管理*/
function getartificialStationList(station_type){
	var stationListNoContent=$('.rightContent3 .notContent');
	var stationList=$('.rightContent3 .right-table-body-dataBind');
	$.ajax({
		url:getStationListUrl,
		type:"get",
		data:{
			station_type:station_type
		},
		dataType:"json",
		success:function(result){
			if(successReturn == result.status){
				var stationAjaxList=result.data;
				if(null != stationAjaxList && stationAjaxList.length == 0){
					stationListNoContent.removeClass('hide');
					stationList.addClass('hide');
				}else if(null != stationAjaxList){
					stationList.removeClass('hide');
					stationListNoContent.addClass('hide');
					var stationAjaxListProporty={
						stcd:{
							class:function(e){
								if(!this.stcd||this.stcd==""){
									return e.value+" frozen";
								}else{
									return e.value;
								}
							},
							text:function(){
								if(!this.stcd||this.stcd==""){
									return "—";
								}
							}
						},
						station_location:{
							class:function(e){
								if(this.station_location==""){
									return e.value+" frozen";
								}else{
									return e.value;
								}
							},
							text:function(){
								if(!this.station_location||this.station_location==""){
									return "—";
								}
							}
						},
						contract:{
							class:function(e){
								if(this.contract==""){
									return e.value+" frozen";
								}else{
									return e.value;
								}
							},
							text:function(){
								if(this.contract==""){
									return "—";
								}
							}

						},
						telephone:{
							class:function(e){
								if(this.telephone==""){
									return e.value+" frozen";
								}else{
									return e.value;
								}
							},
							text:function(){
								if(this.telephone==""){
									return "—";
								}
							}

						}
					};
					stationList.render(stationAjaxList,stationAjaxListProporty);
				}
			}else{
				errorBox(result.msg);
			}

		},
		error:function(XMLHttpRequest){
			// error_500(XMLHttpRequest.responseText);
		}
	});
}

//人工站新建测站弹窗
function createWmsStationModal(){
	$('#createWmsStationForm').removeClass('hide').next().addClass('hide');
	$('#createWmsStation .modal-header>span').html('新建测站');
	$('#createWmsStationForm input').html('');
	$('#createWmsStationForm .errorB').html('');
	$('input[type="text"]').val('');//清空横纵坐标
	getTypeList();//获取测站类型
	getListOfArea();//获取区域
	$("#createWmsStation").modal("show");
	hasWmsCreateLayer=true;
	$('#createWmsStation').on('shown.bs.modal',

	    function() {
	    	if(hasWmsCreateLayer){
		    	if(wmsIsFirst){
		    		$('#map1').empty();
					getPropertyAndSetMap(true,'map1','create');
		    		hasWmsCreateLayer=false;
		    	}
	    	}
		});
		//切换拍报段次
		//sectionItemChange();
		//需求：只能选中1次
		time_off=1;
		$('#createWmsStationForm .sectionItem').off('click');
		$('#createWmsStationForm .sectionItem:first').addClass('active');
		$('#createWmsStationForm .sectionItem').not('.active').css({'color':'#ddd','cursor':'auto'});

		$('#createWmsStationSave').off('click').on('click',function(){
	    	createWmsStation(time_off);
	    });

}

/**人工站信息管理-新建测站**/
function createWmsStation(time_off){
	//获取新建测站用户填写数据发送后后台
	$('.errorB').html('');
	//表单校验
	var station_name=$('#createWmsStationForm input[name="station_name"]').val();//测站名称

	var stcd=$('#createWmsStationForm input[name="stcd"]').val();//测站名系统编码
	var x=$('#createWmsStationForm input[name="x"]').val();//横坐标
	var y=$('#createWmsStationForm input[name="y"]').val();//纵坐标
	var station_location=$('#createWmsStationForm input[name="station_location"]').val();//站址
	var time_off=time_off;//拍报段次
	var type_name=$('#createWmsStationForm .station-type-picker option:selected').val();//测站类型
	var area_name=$('#createWmsStationForm .area-picker option:selected').val();//区域
	var contract=$('#createWmsStationForm input[name="contract"]').val()//联系人
	var telephone=$('#createWmsStationForm input[name="telephone"]').val()//联系电话
	var comments=$('#createWmsStationForm textarea[name="comments"]').val();//备注
	//待修改
	var obj={};
	var stationEntityObj={};
	stationEntityObj.station_name=station_name;
	stationEntityObj.stcd=stcd;
	stationEntityObj.x=x;
	stationEntityObj.y=y;
	stationEntityObj.station_location=station_location;
	stationEntityObj.time_off=time_off;
	stationEntityObj.station_type_id=type_name;
	stationEntityObj.area_id=area_name;
	stationEntityObj.contract=contract;
	stationEntityObj.telephone=telephone;
	stationEntityObj.comments=comments;
	stationEntityObj.station_type=7;

	var codeEntitiesArr=[];
	obj.stationEntity=stationEntityObj;
	obj.codeEntities=codeEntitiesArr;

	//前端校验
	if(station_name==""){
		$('.stationNameError').html('请输入测站名称').show();
	}
	if(stcd.length>8){
		$('#createWmsStation .stcdError').html('请输入小于等于8位的国家标准码').show();
	}
	if(type_name==""){
		$('.stationTypeError').html('请选择测站类型').show();
	}
	if(!x&&!y){
		$('.xError').html('请在左侧地图中选择坐标').show();
		$('.yError').html('请在左侧地图中选择坐标').show();
	}
	if(!area_name){
		$('.areaError').html('请选择区域').show();
	}

	if(station_name==""||x==""||y==""||type_name==""||area_name==""||stcd.length>8){
	 	console.log('前端校验');
	 	return;
    }else{
	    var iptPhone=$('#createWmsStationForm input[name="telephone"]');
		if(cation(iptPhone,rxPhone)){
			$.ajax({
				url:createStationUrl,
				type:"post",
				traditional: true,
	         	contentType : 'application/json;charset=utf-8',
				data:JSON.stringify(obj),
				dataType:"json",
				success:function(result){
					if(successReturn == result.status){
						$('#createWmsStation').modal('hide');
						outBoxClose('创建成功');
						getartificialStationList('7');
					}else{
						errorBox(result.msg);
					}
				},
				error:function(XMLHttpRequest){
					// error_500(XMLHttpRequest.responseText);
				}
			});
		}
	}
}


//人工站修改测站弹窗
function editWmsStationModal(e){
	$('#editWmsStationForm').removeClass('hide').prev().addClass('hide');
	$('#editWmsStationForm .errorB').html('');
	$('#createWmsStation').modal('show');
	hasWmsLayer=true;
	$('#createWmsStation .modal-header>span').html('修改测站');
	$('#editWmsStation-type-picker').attr('disabled','disabled');
	$('#createWmsStation').on('shown.bs.modal',function(){
		if(hasWmsLayer){
			var x=$('#editWmsStationForm').find('input[name="x"]').val();
			var y=$('#editWmsStationForm').find('input[name="y"]').val();

			//创建和修改 地图只创建一次
			if(wmsIsFirst){
				$('#map1').empty();
	    		// Map.init(true,'map1','edit',[Number(x),Number(y)]);
				getPropertyAndSetMap(true,'map1','edit',[Number(x),Number(y)]);
	    		hasWmsLayer=false;
	    		 // wmsIsFirst=false;
	    	}
	    }

	});
	editWmsStation($(e));

 }

//人工站修改测站
function editWmsStation(e){

	var stationId=e.parents('.right-table-row').first().find('.content2RowId').val();
	//调用getStationInfoDetailUrl
	$.ajax({
		url:getStationInfoDetailUrl,
		type:"get",
		data:{stationId:stationId},
		dataType:"json",
		success:function(result){
			if(successReturn == result.status){
				var stationInfo=result.data;
				if(null != stationInfo && stationInfo.length == 0){

				}else if(null != stationInfo){
					time_off=stationInfo.time_off;
					if(time_off=="1"){
						$('.sectionItem'+time_off).addClass('active').siblings().removeClass('active');
					}else if(time_off=="2"){
						$('.sectionItem'+time_off).addClass('active').siblings().removeClass('active');
					}else if(time_off=="4"){
						$('.sectionItem'+time_off).addClass('active').siblings().removeClass('active');
					}else if(time_off=="6"){
						$('.sectionItem'+time_off).addClass('active').siblings().removeClass('active');
					}console.log(stationInfo);
					$('#editWmsStationForm').render(stationInfo);
					var area_name=e.parent().prev().prev().prev().html();
					var area_id=e.parent().prev().attr('dataId');
					getTypeList(stationInfo.station_type_id);//获取当前站测站类型
			    	getListOfArea(area_name);//获取当前站区域

			    	//切换拍报段次
					//sectionItemChange();
					time_off=1;
					$('#editWmsStationForm .sectionItem ').off('click');
					$('#editWmsStationForm .sectionItem').not('.active').css({'color':'#ddd','cursor':'auto'});
			    	$('#editWmsStationSave').off('click').on('click',function(){
			    		updateWmsStationInfo(stationId,time_off);
			    	});
				}
			}else{
				errorBox(result.msg);
			}

		},
		error:function(XMLHttpRequest){
			// error_500(XMLHttpRequest.responseText);
		}
	});
}

/**人工站修改保存更新当前站信息**/
function updateWmsStationInfo(stationId,time_off){
	// var station_type_id=$('#editStation-type-picker option:selected').val();
	// var area_id=$('#editArea-picker option:selected').val();
	var iptPhone=$('#editWmsStationForm input[name="telephone"]');
	if($('#editWmsStationForm').find('input[name="station_name"]').val()==""){
		$('.stationNameError').html('请输入测站名称').show();
		return;
	}else{
		if(cation(iptPhone,rxPhone)){

			$.ajax({
				url:updateStationInfoUrl,
				type:"post",
				data:$("#editWmsStationForm").serialize()+"&id="+stationId+"&time_off="+time_off,
				dataType:"json",
				success:function(result){
					if(successReturn == result.status){
						$('#createWmsStation').modal('hide');
						outBoxClose('修改成功');
						getartificialStationList(7);

					}else{
						errorBox(result.msg);
					}
				},
				error:function(XMLHttpRequest){
					// error_500(XMLHttpRequest.responseText);
				}
			});
		}
	}
}


/**页面4 - 区域平均降雨列表**/
function getAverageRainList(){
	var areaListNoContent=$('.rightContent4 .notContent');
	var areaList=$('.rightContent4 .right-table-body-dataBind');

	var beginTime = $("#content3Starttime").val();
	var beginTimeArr = beginTime.split(/[- :]/);
	var endTime = $("#content3Endtime").val();
	var endTimeArr = endTime.split(/[- :]/);

	//计算[降雨历时]
	var durationTime = new Date(endTimeArr[0],endTimeArr[1]-1,endTimeArr[2],endTimeArr[3],endTimeArr[4]) - new Date(beginTimeArr[0],beginTimeArr[1]-1,beginTimeArr[2],beginTimeArr[3],beginTimeArr[4]);
	var h = parseInt(durationTime/(60*60*1000),10);
	var m = parseInt(durationTime%(60*60*1000)/(60*1000),10);
	m = (m<10)?"0"+m:m;
	durationTime = h+"小时"+m+"分钟";

	$.ajax({
		url: areaAverageRainfallUrl,
		type: 'post',
		data: {
			begin_time: beginTime,
			end_time: endTime
		},
		dataType: 'json',
		success: function(result){
			var data = result.data;
			// 添加[降雨历时] + 保留1位小数 + 无数据填"——";
			if (data&&data.length>0) {
				data.forEach(function(val,index){
					if (val.average_rainfall) {
						val.average_rainfall = val.average_rainfall.toFixed(1);
						val.max_Rainfall = val.max_Rainfall.toFixed(1);
					}
					if (!val.station_info_list) {
						val.average_rainfall=val.maxStation=val.max_Rainfall = "—";
					}
					if (val.maxStation === null) {
						val.maxStation = "—";
					}
					val.durationTime = durationTime;
				});

				var averageRainfall = {
					maxStation: {
						"data-stationid": function(){
							return this.maxStation_id;
						},
						class:function(e){
							if(this.maxStation=="—"){
								return e.value+" frozen";
							}else{
								return e.value;
							}
						}
					},
					average_rainfall:{
						class:function(e){
							if(this.average_rainfall=="—"){
								return e.value+" frozen";
							}else{
								return e.value;
							}
						}
					},
					max_Rainfall:{
						class:function(e){
							if(this.max_Rainfall=="—"){
								return e.value+" frozen";
							}else{
								return e.value;
							}
						}
					}
				};
				areaListNoContent.addClass('hide');
				areaList.removeClass('hide');

				$(".rightContent4 .right-table-body-dataBind").render(data,averageRainfall);
			}else {
				areaListNoContent.removeClass('hide');
				areaList.addClass('hide');
			}
		},
		error:function(XMLHttpRequest){
			// error_500(XMLHttpRequest.responseText);
		}
	});
}

/* 页面4 - 算法管理 */
function showAverageRainfall(){
	var beginTime = $("#content3Starttime").val();
	var endTime = $("#content3Endtime").val();

	$.ajax({
		url: areaAverageRainfallUrl,
		type: 'post',
		data: {
			begin_time: beginTime,
			end_time: endTime
		},
		dataType: 'json',
		success: function(result){
			if (result.data) {
				var data = result.data;
				data.forEach(function(val,index){
					// 添加计算方法
					val.area_method = (val.algorithmType===0)?"算术平均法":"系数平均法";
					if (val.station_info_list) {
						val.station_info_list.forEach(function(subVal,index){
							// 系数平均法: 添加系数值 + 隐藏算术平均法项
							if (val.algorithmType === 1) {
								val.param_list.forEach(function(subsubVal){
									if (subsubVal.param_staId===subVal.id) {
										subVal.param_value = subsubVal.param_value;
										subVal.param_hide = "";
									}
								});
							}else {
								subVal.param_value = "";
								subVal.param_hide = "hide";
							}
						});
					}
				});
				// console.log(data);
				var algorithmManage = {
					area_name: {
						"data-areaId": function(){
							return this.area_id;
						}
					},
					station_info_list: {
						param_value: {
							class: function(){
								return this.param_hide;
							}
						},
						station_name: {
							"data-stationid": function(){
								return this.id;
							}
						}
					},
					isHideModify: {  // 若区域没有站,则隐藏"修改"键
						class: function(e){
							return (this.station_info_list&&this.station_info_list.length)?e.value:e.value+" hide";

						}
					}
				};

				$("#averageRainfall .modal-body-content").render(data,algorithmManage);
				$("#averageRainfall").modal("show");
			}else{
				errorBox(result.msg);
			}
		},
		error:function(XMLHttpRequest){
			// error_500(XMLHttpRequest.responseText);
		}
	});


}

/* 页面4 - 算法管理: 修改 */
function showAverageRainfallModify(){
	$.ajax({
		url: getAreaStationParamListUrl,
		type: 'get',
		data:{area_id: $(this).parents("ul").find("[data-bind=area_name]").data("areaid")},
		dataType: 'json',
		success: function(result){
			if (result.status === successReturn) {
				var data = result.data;
				// 只用一个站时不能选择"系数平均法"
				if (data&&(data.length==1)) {
					$("#averageRainfallModify .rainfall-right-second").addClass("hide");
				}else {
					$("#averageRainfallModify .rainfall-right-second").removeClass("hide");
				}
				var renderData = {
					areaId: data[0].area_id,
					areaName: data[0].area_name,
					stationData: data,
					stationParam: (function(){
						/*设置系数填充信息*/
						var str=[];
						if (data[0].param) {
							data.forEach(function(val){
								str.push(val.param);
							});
							str = str.join("-");
						}
						return str;
					})(data)
				};
				var renderDataProperty = {
					areaName: {
						'data-areaid': function(){
							// console.log("areaid: "+this.areaId);
							return this.areaId;
						}
					},
					stationData: {
						station_name: {
							'data-stationid': function(){
								return this.sta_id;
							}
						}
					}
				};

				$("#averageRainfallModify form").render(renderData,renderDataProperty);
				// 选中"算术"or"系数"
				if (data[0].hasOwnProperty("param")) {
					$("#averageRainfallModify .rainfall-right-second").trigger("click");
				}else {
					$("#averageRainfallModify .rainfall-right-first").trigger("click");
				}
				$("#averageRainfallModify .errorInfo").text("");

				$("#averageRainfallModify").modal("show");
				//仅保留一个背景颜色
				$(".modal-backdrop").css("opacity",0);
				$(".modal-backdrop")[0].style.opacity = 0.3;
			}else {
				errorBox(result.msg);
			}
		},
		error:function(XMLHttpRequest){
			// error_500(XMLHttpRequest.responseText);
		}
	});
}

/* 页面4 - 算法管理: 修改: 切换测站 */
function averageRainfallModifyChange(){
	$(this).addClass("active").siblings().removeClass("active");
	if ($("#averageRainfallModify .rainfall-right-first").hasClass("active")) {
		$("#averageRainfallModify .rainfall-item4").addClass("hide");
	}else {
		$("#averageRainfallModify .rainfall-item4").removeClass("hide");
		$("#averageRainfallModify .rainfall-item4 .errorInfo").text("");
	}
}

/* 页面4 - 算法管理: 修改:保存 */
function averageRainfallModifySave(){
	var param = {};  //定义传送的数据;
	param.area_id = $("#averageRainfallModify [data-bind=areaName]")[0].dataset.areaid;  //构建传送数据

	if($("#averageRainfallModify .rainfall-right-first").hasClass("active")){
		param.analysis_type = 0;
		param.paramList = [];
	}else{
		param.analysis_type = 1;

		var stationParam = $("#averageRainfallModify [data-bind=stationParam]").val();
		var $errorBox = $("#averageRainfallModify .rainfall-item4 .errorInfo");
		// 检测是否填写了内容
		if (!stationParam.length) {
			$errorBox.text("请填写系数");
			return false;
		}

		stationParam = stationParam.split("-");
		var stationNumber = $("#averageRainfallModify [data-bind=station_name]").length;
		// 检测填写的系数数量是否正确
		if (stationParam.length !== stationNumber) {
			$errorBox.text("测站个数和系数个数不相等");
			return false;
		}

		var sum = 0;
		stationParam.forEach(function(val,i){
			sum += Number(val);
		});
		// 检测填写的系数之和是否是1
		if (Math.abs(sum-1) >= 1e-6) {
			$errorBox.text("系数之和不等于1");
			return false;
		}

		param.paramList = [];  //定义系数数组
		var station = $("#averageRainfallModify [data-bind=station_name]");
		$.each(station,function(i,val){
			var item = {};
			item.area_id = param.area_id;
			item.sta_id = parseInt(val.dataset.stationid,10);
			if (param.analysis_type === 0) {
				item.param = null;
			}else {
				item.param = stationParam[i];
			}
			param.paramList.push(item);
		});
	}

	$.ajax({
		url: analysisManagerUrl,
		type: 'POST',
		traditional: true,
		contentType : 'application/json;charset=utf-8',
		data: JSON.stringify(param),
		dataType: 'json',
		success: function(result){
			if (result.status === successReturn) {
				$("#averageRainfallModify .closeImg").trigger("click");
				$(".rightContent4 .create").trigger("click");
			}else {
				errorBox(result.msg);
			}
		},
		error: function(XMLHttpRequest){
			// error_500(XMLHttpRequest.responseText);
		}
	});

	// $("[data-bind=stationParam]").focus(function(){$errorBox.text("")});
}

/*页面4 显示更多信息*/
function showAreaCard(e){
	$("#areaCard").addClass("hide");
	var id = $(e.target).parents(".right-table-row-item").find("[data-bind=area_id]").val();
	var sentence1="",sentence2="";
	//处理sentence1
	var beginTime = $("#content3Starttime").val();
	var endTime = $("#content3Endtime").val();
	$.ajax({
		url: areaAverageRainfallUrl,
		type: 'post',
		data: {
			begin_time: beginTime,
			end_time: endTime
		},
		dataType: 'json',
		success: function(result){
			if (result.data) {
				result.data.forEach(function(val,index){
					if (val.area_id == id) {
						var stationList = val.station_info_list;
						if (stationList==null) {
							sentence1 = "1. "+val.area_name+val.message.slice(3)+"；";
						}else {
							sentence1 = "1. "+val.area_name+"共包括"+stationList.length+"个雨量站：";
							stationList.forEach(function(subVal,i){
								sentence1 += subVal.station_name+"、";
							});
							sentence1 = sentence1.slice(0,-1)+"；";
						}
						$(".areaCard p:first").text(sentence1);
					}
				});

				//处理sentence2
				$.ajax({
					url: getAreaDetailInfoUrl,
					type: 'get',
					data: {areaId: id},
					success: function(result){
						if (result.status === successReturn){
							var data = result.data;
							var areaName = (data.algorithmType===0)?"算数平均法":"系数平均法";
							sentence2 = "2. "+data.area_name+"按照"+areaName+"计算平均雨量；";
							$(".areaCard p:last").text(sentence2);

							/*显示并处理弹窗的位置*/
							showAndSetPoP(e);
						}else {
							errorBox(result.msg);
						}
					},
					error: function(XMLHttpRequest){
						// error_500(XMLHttpRequest.responseText);
					}
				});
			}else {
				errorBox(result.msg);
			}
		},
		error: function(XMLHttpRequest){
			// error_500(XMLHttpRequest.responseText);
		}
	});
	e.stopPropagation();
}
/*显示并处理弹窗的位置*/
function showAndSetPoP(e){
	var position = $(e.target).offset();
	var left = position.left-29;
	if (document.body.scrollWidth<1400) {  // 小屏幕
		if ($(window).height()-position.top>128) {
			var top = position.top-99+32;
			$(".areaCard").css({"left":left,"top":top}).removeClass("hide down");
		}else {
			var top = position.top-238+32;
			$(".areaCard").css({
				"left":left,
				"top":top
			}).addClass("down").removeClass("hide");
		}
	}else {  // 1080p
		if ($(window).height()-position.top>128) {
			var top = position.top-99;
			$(".areaCard").css({"left":left,"top":top}).removeClass("hide down");
		}else {
			var top = position.top-238;
			$(".areaCard").css({
				"left":left,
				"top":top
			}).addClass("down").removeClass("hide");
		}
	}
	$(".arrow").on("mouseleave",hideAreaCard);
}


/*页面4 - 隐藏更多信息*/
function hideAreaCard(e){
	$('.areaCard').addClass('hide');
}


/*第5页 - 查询显示区域列表*/
function getAreaList(){
	var areaListNoContent=$('.rightContent5 .notContent');
	var areaList=$('.rightContent5 .right-table-body-dataBind');
	$.ajax({
		url:getListOfAreaUrl,
		type:'get',
		success: function(result){
			if (result.status === successReturn) {
				var data=result.data;
				if(data&&data.length>0){
					areaListNoContent.addClass('hide');
					areaList.removeClass('hide');
					$.each(data,function(i,o){
						if(o.comment==""){
							o.comment="—";
						}
					});
					var dataProperty={
						comment:{
							class:function(){
								if(this.comment=="—"){
									return "frozen";
								}else{
									return "";
								}
							}
						}
					}
					$(".rightContent5 .right-table-body-dataBind").render(data,dataProperty);
				}else{
					areaListNoContent.removeClass('hide');
					areaList.addClass('hide');
				}

				//setLeftHeight();
			}else {
				errorBox(result.msg);
			}
		},
		error: function(XMLHttpRequest){
			// error_500(XMLHttpRequest.responseText);
		}
	});
}

/* 页面5 - 新建区域&修改区域 - 显示*/
function createAndModifyArea(e){
	$("#createField .promptBox").text("").addClass("hide");
	// 点击对象不是modify代表新建
	if ( $(this)[0].className != "modify" ) {
		$('#createField .modal-header>span').html('新建区域');
		$("#createField .modal-content").data("type",0).data("areaId","");  /*0:新建区域; 1:修改区域; 清空areaId*/
		$("#createField input,#createField textarea").val("");  //清空form
		$("#createField").modal("show");
	}else {
		var id = $(e.target).parents(".right-table-row").find("[data-bind=area_id]").val();
		$('#createField .modal-header>span').html('修改区域');
		$("#createField .modal-content").data("type",1).data("areaId",id);  /*0:新建区域; 1:修改区域; 设置areaId*/
		$.ajax({  /*查询站信息*/
			url:getAreaDetailInfoUrl,
			type:'get',
			data:{
				areaId: id
			},
			dataType: 'json',
			success: function(result){
				if (result.status === successReturn) {
					$("#createField form")[0].reset();  //清空form
					$("#createField form").render(result.data);  //form填入数据
					$("#createField").modal("show");  //显示出弹窗
				}else{
					errorBox(result.msg);
				}
			},
			error: function(XMLHttpRequest){
				// error_500(XMLHttpRequest.responseText);
			}
		});
	}
}
/* 页面5 - 新建区域&修改区域 - 保存*/
function saveAreaInfo(e){
	if ($("#createField [name=area_name]").val()=="") {
		$("#createField .promptBox").text("请填写区域名称").removeClass("hide");
		return false;
	}
	//判断是 新建(0) or 修改(1)
	if ($("#createField .modal-content").data("type") === 0) {
		$.ajax({
			url: createAreaUrl,
			type: 'post',
			data: $("#createField form").serialize(),
			dataType: 'json',
			success: function(result){
				if (result.status === successReturn) {
					$("#createField").modal("hide");
					$(".left-item5").trigger("click");
				}else{
					errorBox(result.msg);
				}
			},
			error: function(XMLHttpRequest){
				// error_500(XMLHttpRequest.responseText);
			}
		});
	}else {
		$.ajax({
			url: updateAreaInfoUrl,
			type: 'post',
			data: {
				area_id: $("#createField .modal-content").data("areaId"),
				area_name: $("#createField input[name=area_name]").val(),
				comment: $("#createField textarea[name=comment]").val(),
			},
			dataType: 'json',
			success: function(result){
				if (result.status === successReturn) {
					$("#createField .closeImg").trigger("click");
					$(".left-item5").trigger("click");
				}else {
					errorBox(result.msg);
				}
			},
			error: function(XMLHttpRequest){
				// error_500(XMLHttpRequest.responseText);
			}
		});
	}
}

// 封装验证函数
function cation(element,regExp){

	var txt = element.val();
	if(txt==""){
		return true;
	}

	if( regExp.test( txt )){

		//element.siblings('.errorB').html("正确");

		return true;
	}else{
		// console.log(element.siblings('.errorB'));
		// element.siblings('.errorB').html("手机号错误");
		errorBox('手机号错误');
		return false;
	}

}

// 修正时间选择器的样式;
$(".timePicker").on("show",function(e){
    e.target.style.borderColor = "#4791ea";
    e.target.style.boxShadow = "1px 1px 10px rgba(71,145,234,.6)";

}).on("hide",function(e){
    e.target.style.borderColor = "";
    e.target.style.boxShadow ="";
});


$(function(){

	$('.left-item').on("click",changeLeftNav);
	/**自动测报数据修补tabs切换**/
	$('.rightContent1 .btn-tabs button').on("click",changeContent1Class);
	/*读取自动测报数据*/
	$("#rightContent1_search_btn").on("click",function(){
		if ($('.rightContent1 .btn-tabs button:first').hasClass("active")) {
			getAutoRepairData(true);
		}else {
			getAutoRepairData(false);
		}
	});
	/**删除站**/
	$(".right-table-body-dataBind").on("click",".deleteBox",function(){
		var a = $(this).parent().siblings("li:first");
		$("#deleteStation .stationName").text( a.text() );
		$("#deleteStation .stationName").attr("data-stationid", a.find("[data-bind=id]").val());
		$("#deleteStation").modal("show");
	});
	$("#deleteStation .btn-delete").on("click",deleteStation);
	/**增补**/
	$('#augment').off('click').on("click",showAugmentModal);
	/**修改**/
	$(".rightContent1 .right-table-body").on('click','.editBox',showAugmentModal);

	$("#augmentModal button.save").on("click",saveAugment);
	/**自动站新建测站**/

	$('#create').off('click').on('click',function(){
		createStationModal();
	});
	//自动站新建点击测站类型出现不同的编码
	$('#createStation-type-picker').on('change',showCoding);
	//自动站修改
	$('.rightContent2 .right-body-table').off('click').on('click','.editBox',function(){
		editStationModal(this);
	});
	$('#editStation-type-picker').on('change',editShowCoding);

	/**人工站新建测站**/
	$('#wmsCreate').off('click').on('click',function(){
		createWmsStationModal();
	});
	//人工站修改
	$('.rightContent3 .right-body-table').off('click').on('click','.editBox',function(){
		editWmsStationModal(this);
	});
	/**页面4 - 区域平均降雨**/
	/*获取区域平均降雨信息*/
	$("#rightContent4_search_btn").on("click",getAverageRainList);
	/* 显示更多信息 */
	$(".rightContent4 .right-table-body").on("mouseenter","i.introself",showAreaCard);
	$("#areaCard").on("mouseenter",function(){$(".arrow").off("mouseleave");});
	/* 隐藏更多信息 */
	$("#areaCard").on("mouseleave",hideAreaCard);

	$(document).on("click",hideAreaCard);

	/* 算法管理 */
	$(".rightContent4 .create").on("click",showAverageRainfall);
	/* 算法管理: 修改 */
	$("#averageRainfall .modal-body-content").on("click","div.modifyson",showAverageRainfallModify);
	/* 算法管理 - 修改: 切换测站 */
	$("#averageRainfallModify .rainfall-item3 .rainfall-right>div").on("click",averageRainfallModifyChange);
	$("#averageRainfallModify .saveAverageRainfall").on("click",averageRainfallModifySave);

	/**页面5 - 区域信息管理**/
	/* 新建区域 - 显示*/
	$(".rightContent5 .create").on("click",createAndModifyArea);
	/* 修改区域 - 显示*/
	$(".rightContent5 .right-table-body").on("click",".modify",createAndModifyArea);
	/*新建区域&修改区域 - 保存*/
	$("#createField button.save").on("click",saveAreaInfo);

	/*初始化第一页start*/
	initDateTimePicker("content1Starttime","content1Endtime");  /*时间插件*/
	// $("#content1Starttime").val("2017-07-01 02:00:00");  //临时更改数据,需删掉;
	$('.rightContent1 .btn-tabs button:first').trigger("click");
	/*初始化第一页end*/

});
