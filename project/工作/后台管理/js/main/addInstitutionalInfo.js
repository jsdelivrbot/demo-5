$(document).ready(function() {
	var name, logo, telephone, address, longitude, latitude, details, cityCode, provinceCode, countyCode, viceTitle, geocoder, map, marker;
	//	var editor = CKEDITOR.replace('financial');
	$("#indexImage").fileinput({
		language: "zh",
		browseLabel: '选取文件',
		uploadUrl: '/public_platform/file/upload',
		allowedFileExtensions: ['jpg', 'png'],
		uploadAsync: 　false,
		showUpload: false,
		showRemove: false,
		maxFileSize: 1024,
		initialPreviewFileType: "file",
		fileActionSettings: {
			showUpload: false,
		},
		initialCaption: '未选择文件'
	});

	setTimeout(function() {
		map = new AMap.Map('container', {
			resizeEnable: true
		});
		AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function() {
			map.addControl(new AMap.ToolBar());
			map.addControl(new AMap.Scale());
		});
		//初始化定位
		map.plugin('AMap.Geolocation', function() {
			geolocation = new AMap.Geolocation({
				enableHighAccuracy: true, //是否使用高精度定位，默认:true
				timeout: 10000, //超过10秒后停止定位，默认：无穷大
				buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
				zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
				buttonPosition: 'RB'
			});
			map.addControl(geolocation);
			geolocation.getCurrentPosition();
			AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
			//AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
		});

		//标注定位
		function onComplete(data) {

			marker = new AMap.Marker({
				position: [data.position.getLng(), data.position.getLat()],
				draggable: true,
				cursor: 'move',
				raiseOnDrag: true
			});
			marker.setMap(map);
		}
		//点击增加marker
		map.on('click', function(e) {
			if(marker != null) {
				map.remove(marker);
			}

			marker = new AMap.Marker({
				position: [e.lnglat.getLng(), e.lnglat.getLat()],
				draggable: true,
				cursor: 'move',
				raiseOnDrag: true
			});
			marker.setMap(map);
			//_this.addMarker(e.lnglat.getLng(), e.lnglat.getLat());
		});

		//输入提示
		var autoOptions = {
			input: "input"
		};
		var auto = new AMap.Autocomplete(autoOptions);
		var placeSearch = new AMap.PlaceSearch({
			map: map
		}); //构造地点查询类
		AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
		function select(e) {
			placeSearch.setCity(e.poi.adcode);
			placeSearch.search(e.poi.name); //关键字查询查询
		}

		//定位搜索
		//		AMap.plugin('AMap.Geocoder', function() {
		//			geocoder = new AMap.Geocoder();
		//			var input = document.getElementById('input');
		//			input.onchange = function(e) { //搜索定位
		//				var address = input.value;
		//				geocoder.getLocation(address, function(status, result) {
		//					if(status == 'complete' && result.geocodes.length) {
		//
		//						longitude = result.geocodes[0].location.lng;
		//						latitude = result.geocodes[0].location.lat;
		//						map.setCenter([longitude, latitude]); //定位中心位置
		//
		//						if(marker != null) {
		//							map.remove(marker);
		//						}
		//
		//						marker = new AMap.Marker({
		//							position: map.getCenter(),
		//							draggable: true,
		//							cursor: 'move',
		//							raiseOnDrag: true
		//						});
		//						marker.setMap(map);
		//
		//						//document.getElementById('message').innerHTML = ''
		//					} else {
		//						//document.getElementById('message').innerHTML = '获取位置失败'
		//					}
		//				})
		//			}
		//			input.onchange();
		//		});
	}, 1000);

	var editInstitutionalInfo = {
		init: function() {
			var _this = this;
			_this.clickSubmit();
		},
		clickSubmit: function() {
			var _this = this;
			$("#saveBtn").click(function() {

				if(_this.checkValue()) {

					name = $("#institutionName").val();
					viceTitle = $("#subheading").val();
					telephone = $("#institutionPhone").val();
					provinceCode = $("#province").val();
					cityCode = $("#city").val();
					countyCode = $("#county").val();
					address = $("#institutionDetailAdress").val();
					//					console.log(marker);
					//					longitude = marker.getPosition().I.toString();
					//					latitude = marker.getPosition().L.toString();

					details = editor.getData();

					$("#indexImage").fileinput("upload");

					$("#indexImage").on("filebatchuploadsuccess", function(event, data) {
						if(data.response.result == 1) {
							logo = data.response.data.url;
						} else {
							modalDialog("图片上传失败");
						}
					});
					$("#indexImage").on("filebatchuploadcomplete", function(event, data) {
						_this.add();
					});
				}
			});
		},
		add: function() {
			var _this = this;
			$.ajax({
				url: "/public_platform/mechanism/add",
				type: "post",
				dataType: "json",
				data: {
					"name": name,
					"logo": logo,
					"telephone": telephone,
					"address": address,
					"longitude": longitude,
					"latitude": latitude,
					"details": details,
					"provinceCode": provinceCode,
					"cityCode": cityCode,
					"countyCode": countyCode,
					"viceTitle": viceTitle
				},
				success: function(data) {
					overTime(data);
					console.log(data);
					if(data.result == "1") {
						modalDialog("保存成功");
						setTimeout(function() {
							$('#returnMsg').modal("hide");
							$('.page').html('');
							$('.page').load('html/institute.html');
						}, 3000);
					} else if(data.result == "10000") {
						modalDialog("您还没有通过机构认证,不能添加机构信息");
					} else {
						modalDialog("保存失败!");
					}
				},
				error: function() {
					modalDialog("网络请求错误!");
				}
			});
		},
		checkValue: function() {
			if($("#institutionName").val() == "") {
				modalDialog("机构全称不得为空");
				return false;
			}
			$.each($(".file-preview-thumbnails"), function(index, obj) {
				if($(obj).html().trim() == "") {
					modalDialog("首页图片不得为空");
					return false;
				}
			});
			if($("#subheading").val() == "") {
				modalDialog("副标题不得为空");
				return false;
			}
			if($("#institutionPhone").val() == "") {
				modalDialog("联系电话不得为空");
				return false;
			}
			if(!/^(-|\d)+$|^1[34578]\d{9}$/.test($("#institutionPhone").val())) {
				modalDialog("请输入正确格式的联系电话");
				return false;
			}
			if($("#province").val() == "") {
				modalDialog("所在地区不得为空");
				return false;
			}
			if($("#institutionDetailAdress").val() == "") {
				modalDialog("详细地址不得为空");
				return false;
			}
			if(editor.getData() == "") {
				modalDialog("机构介绍不得为空");
				return false;
			}

			return true;
		}
	};
	editInstitutionalInfo.init();
	$('#goInstitute').click(function() {
		$('.page').html('');
		$('.page').load('html/institute.html')
	});
});