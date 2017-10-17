$(document).ready(function() {
	var name, logo, telephone, address, longitude, latitude, details, cityCode, provinceCode, countyCode, viceTitle, marker, map;
	var $institutionName = $("#institutionName"),
		$subheading = $("#subheading"),
		$institutionPhone = $("#institutionPhone"),
		$institutionDetailAdress = $("#institutionDetailAdress"),
		$province = $("#province"),
		$city = $("#city"),
		$county = $("#county"),
		$indexImage = $("#indexImage");
	var id = localStorage.getItem("institutionId");

	var editInstitutionalInfo = {
		init: function() {
			var _this = this;

			_this.getInfo();
			_this.clickSubmit();
		},

		getInfo: function() {
			var _this = this;

			$.ajax({
				url: "/public_platform/mechanism/view",
				type: "post",
				dataType: "json",
				data: {
					"id": id
				},
				success: function(data) {
					console.log(data);
					overTime(data);
					if(data.result == "1") {
						var institution = data.data;
						$institutionName.val(institution.name);
						$subheading.val(institution.viceTitle);

						$institutionPhone.val(institution.telephone);
						$institutionDetailAdress.val(institution.address);
						editor.setData(institution.details);

						$province.val(institution.provinceCode);
						changeCity();
						$city.val(institution.cityCode);
						$county.val(institution.countyCode);

						var longitude = parseFloat(institution.longitude);
						var latitude = parseFloat(institution.latitude);
						_this.initMap(longitude, latitude);
						_this.initFileInput(institution.logo);

					} else {
						modalDialog("操作失败！");
					}
				},
				error: function() {
					modalDialog("网络请求错误!");
				}
			});
		},
		initMap: function(lng, lat) {
			var _this = this;
			map = new AMap.Map('container', {
				resizeEnable: true,
				zoom: 15
			});
			AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function() {
				map.addControl(new AMap.ToolBar());
				map.addControl(new AMap.Scale());
			});
			//根据经纬度定位
			if(lng != null && lng != '') {
				map.setCenter([lng, lat]);
				marker = new AMap.Marker({
					position: [lng, lat],
					draggable: true,
					cursor: 'move',
					raiseOnDrag: true
				});
				marker.setMap(map);
			} else {
				console.log('获取位置失败')
			}

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
			//			AMap.plugin('AMap.Geocoder', function() {
			//				var geocoder = new AMap.Geocoder();
			//				var input = document.getElementById('input');
			//				input.onchange = function(e) {
			//					var address = input.value;
			//					geocoder.getLocation(address, function(status, result) {
			//						if(status == 'complete' && result.geocodes.length) {
			//							longitude = result.geocodes[0].location.lng;
			//							latitude = result.geocodes[0].location.lat;
			//							map.setCenter([longitude, latitude]); //定位中心位置
			//
			//							if(marker != null) {
			//								map.remove(marker);
			//							}
			//
			//							marker = new AMap.Marker({
			//								position: map.getCenter(),
			//								draggable: true,
			//								cursor: 'move',
			//								raiseOnDrag: true
			//							});
			//							marker.setMap(map);
			//							//document.getElementById('message').innerHTML = ''
			//						} else {
			//							//document.getElementById('message').innerHTML = '获取位置失败'
			//						}
			//					})
			//				}
			//				input.onchange();
			//			});
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
			});

		},
		initFileInput: function(url) {
			$indexImage.fileinput({
				language: "zh",
				browseLabel: '选取文件',
				allowedFileExtensions: ['jpg', 'png'],
				uploadUrl: '/public_platform/file/upload',
				uploadAsync: 　false,
				showUpload: false,
				showRemove: false,
				maxFileSize: 1024,
				initialPreviewFileType: "file",
				fileActionSettings: {
					showUpload: false,
				},
				initialPreview: '<img src="' + url + '" class="file-preview-image ">',
			});
		},
		clickSubmit: function() {
			var _this = this;
			$("#saveBtn").click(function() {

				if(_this.checkValue()) {

					name = $institutionName.val();
					viceTitle = $subheading.val();
					telephone = $institutionPhone.val();
					provinceCode = $province.val();
					cityCode = $city.val();
					countyCode = $county.val();
					address = $institutionDetailAdress.val();
					longitude = marker.getPosition().I.toString();
					latitude = marker.getPosition().L.toString();

					details = editor.getData();

					if($indexImage.val() != "") {
						$indexImage.fileinput("upload");
						$indexImage.on("filebatchuploadsuccess", function(event, data) {
							if(data.response.result == 1) {
								logo = data.response.data.url;
							} else {
								modalDialog("图片上传失败");
							}
						});
						$indexImage.on("filebatchuploadcomplete", function(event, files, extra) {
							_this.update();
						});
					} else {
						_this.update();
					}
				}
			});
		},
		update: function() {
			var _this = this;
			$.ajax({
				url: "/public_platform/mechanism/update",
				type: "post",
				dataType: "json",
				data: {
					"id": id,
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
					console.log(data);
					overTime(data);
					if(data.result == "1") {
						modalDialog("保存成功");
						setTimeout(function() {
							$('#returnMsg').modal("hide");
							$('.page').html('');
							$('.page').load('html/institute.html');
						}, 3000);
					} else {
						modalDialog(data.msg);
					}
				},
				error: function() {
					modalDialog("网络请求错误!");
				}
			});
		},
		checkValue: function() {
			if($institutionName.val() == "") {
				modalDialog("机构全称不得为空");
				return false;
			}

			if($subheading.val() == "") {
				modalDialog("副标题不得为空");
				return false;
			}
			if($institutionPhone.val() == "") {
				modalDialog("联系电话不得为空");
				return false;
			}
			if(!/^(-|\d)+$|^1[34578]\d{9}$/.test($institutionPhone.val())) {
				modalDialog("请输入正确格式的联系电话");
				return false;
			}
			if($province.val() == "") {
				modalDialog("所在地区不得为空");
				return false;
			}
			if($institutionDetailAdress.val() == "") {
				modalDialog("详细地址不得为空");
				return false;
			}
			if(editor.getData() == "") {
				modalDialog("机构介绍不得为空");
				return false;
			}
			$.each($(".file-preview-thumbnails"), function(index, obj) {
				if($(obj).html().trim() == "") {
					modalDialog("首页图片不得为空");
					return false;
				}
			});
			return true;
		}
	};
	editInstitutionalInfo.init();
});