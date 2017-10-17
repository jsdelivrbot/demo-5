$(function() {
	$.extend($.fn.dataTable.defaults, {
		"language": {
			"sProcessing": "处理中...",
			"sLengthMenu": "显示 _MENU_ 项结果",
			"sZeroRecords": "没有匹配结果",
			"sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
			"sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
			"sInfoFiltered": "(由 _MAX_ 项结果过滤)",
			"sInfoPostFix": "",
			"sSearch": "搜索:",
			"sUrl": "",
			"sEmptyTable": "未查询到相关数据",
			"sLoadingRecords": "载入中...",
			"sInfoThousands": ",",
			"oPaginate": {
				"sFirst": "首页",
				"sPrevious": "上页",
				"sNext": "下页",
				"sLast": "末页"
			},
			"oAria": {
				"sSortAscending": ": 以升序排列此列",
				"sSortDescending": ": 以降序排列此列"
			}
		},
		"processing": true,
		"serverSide": true,
		"searching": false,
		"ordering": false,
		"scrollX": true,
		"flexibleWidth": true,
		"responsive": true,
		"autoWidth": true,
		"pageLength": 10,
		"lengthMenu": [10, 15, 20, 25]
	});

	dataTable = $("#dataTable").DataTable({
		"fnDrawCallback": function() {　　
			var api = this.api();　　
			var startIndex = api.context[0]._iDisplayStart; //获取到本页开始的条数
			　　
			api.column(0).nodes().each(function(cell, i) {　　　　
				cell.innerHTML = startIndex + i + 1;　　
			});
		},
		"ajax": {
			"url": "/public_platform/lecturer/list",
			"type": "get",
			"contentType": "application/json",
			"data": function(d) {
				var pageNo = Math.ceil(d.start / d.length) + 1;
				return "pageNum=" + pageNo + "&pageSize=" + d.length + "&" + $("#searchForm").serialize();
			},
			"dataFilter": function(data) {
				overTime(jQuery.parseJSON(data));
				var result = jQuery.parseJSON(data);
				var json = new Object();
				json.recordsTotal = result.data.total;
				json.recordsFiltered = result.data.total;
				json.data = result.data.list;
				return JSON.stringify(json); // return JSON string
			}
		},
		columns: [{
			data: null
		}, {
			data: 'name'
		}, {
			data: 'weight'
		}, {
			data: 'status',
			render: function(data, type, row) {
				//1-未发布,2-已发布,3-已下线,4-已删除,5-修改未发布)
				if(data == 1) {
					return "未发布";
				} else if(data == 2) {
					return "已发布";
				} else if(data == 3) {
					return "已下线";
				} else if(data == 4) {
					return "已删除";
				} else if(data == 5) {
					return "修改未发布";
				}
				return "";
			}
		}, {
			data: 'authStatus',
			render: function(data, type, row) {
				//1-未发布,2-已发布,3-已下线,4-已删除,5-修改未发布)
				if(data == 0) {
					return "未认证";
				} else if(data == 1) {
					return "等待审核";
				} else if(data == 2) {
					return "审核通过";
				} else if(data == 3) {
					return "审核未通过";
				}
				return "";
			}
		}, {
			data: 'id',
			render: function(data, type, row) {
				var html = "";
				html += '<button type="button" name="editBtn" id="' + data + '"  class="btn marright5">编辑</button>';
				if (row.status == 4) {return html};
				html += '<button type="button" name="updateStatus" id="' + data + '" status="' + row.status + '" class="btn marright5">';
				if(row.status == 1 || row.status == 5) {
					html += "发布";
				} else if(row.status == 2) {
					html += "下线";
				} else if(row.status == 3) {
					html += "删除";
				}
				html += '</button>';

				if(row.status == 3) {
					html += '<button type="button" name="updateStatus" id="' + data + '" status="' + 1 + '" class="btn marright5">'
					html += "发布";
					html += '</button>';
				}

				if(row.authStatus == 0 || row.authStatus == 3){
					html += '<button type="button" name="authenBtn" id="' + data + '"  class="btn marright5">认证</button>';
				}
				return html;
			}
		}, {
			data: 'lastUpdateTime'
		}]
	});

	$('#preSave').click(function() {
		$('.page').html('');
		$('.page').load('html/addLecturer.html');
	});

	$("#searchBtn").click(function() {
		dataTable.ajax.reload();
	});

	$("#dataTable").on("click", "button[name='updateStatus']", function() {
		var id = $(this).attr("id");
		var status = $(this).attr("status");
		debugger;
		//未发布状态，点击发布
		if(status == 1 || status == 5) {
			release(id);
		} else if(status == 2) {
			//已发布，点击下线
			offline(id);
		} else if(status == 3) {
			//已下线，点击删除
			deleteCourse(id);
		}
	})
	
	$("#dataTable").on("click", "button[name='editBtn']", function() {
		var id = $(this).attr("id");
		$('.page').html('');
		$('.page').load('html/editLecturer.html', function() {
			$("#lecturerId").val(id);
		});

	})
	
	$("#dataTable").on("click", "button[name='authenBtn']", function() {
		var id = $(this).attr("id");
		$('.page').html('');
		$('.page').load('html/addPersonalAuthen.html',function() {
			$("#lecturerId").val(id);
			$.get("../businessUser/authInfo",{"lecturerId":id},function(result){
				// $("#idcardimg,#certificateimg").fileinput();
				var initFileinput = {
						language: "zh",
						browseLabel: '选取文件',
						uploadUrl: '/public_platform/file/upload',
						allowedFileExtensions: ['jpg', 'png'],
						uploadAsync: 　false,
						showUpload: false,
						showRemove: false,
						maxFileSize: 1024,
						initialPreviewFileType: "file",
						initialCaption: '未选择文件'
					};
				
				if(result.result==1){
					var authInfo = result.data;
					$("#reallyName").val(authInfo.realName);
					$("#idCardNo").val(authInfo.idCard);
					$("#idCardJustUrl").val(authInfo.idCardJustUrl);
					$("#idCardBackUrl").val(authInfo.idCardBackUrl);
					$("#personalAuthenticationPhone").val(authInfo.phone);
					
					initFileinput.layoutTemplates = {
						    main1: "{preview}\n" +
						    "<div class=\'input-group {class} \'>\n" +
						    "   <div class=\'input-group-btn\'>\n" +
						    "       {browse}\n" +
						    "       {upload}\n" +
						    "       {remove}\n" +
						    "   </div>\n" +
						    "   {caption}\n" +
						    "</div>"
						}
					
					initFileinput.initialPreview = '<img src="' + authInfo.idCardJustUrl + '" class="file-preview-image ">';
					
					$("#idcardimg").fileinput(initFileinput);
					
					initFileinput.initialPreview = '<img src="' + authInfo.idCardBackUrl + '" class="file-preview-image ">';
					
					$("#certificateimg").fileinput(initFileinput);
				}else{
					$("#idcardimg,#certificateimg").fileinput(initFileinput);
				}
			});
		});
	})

	function release(id) {
		$.get("../lecturer/release", {
			"id": id
		}, function(data) {
			if(data.result == 1) {
				modalDialog("发布成功！");
			} else {
				modalDialog("发布失败！");
			}
			dataTable.ajax.reload();
		})
	}

	function offline(id) {
		$.get("../lecturer/offline", {
			"id": id
		}, function(data) {
			debugger;
			if(data.result == 1) {
				modalDialog("下线成功！");
			} else {
				modalDialog("下线失败！");
			}
			dataTable.ajax.reload();
		})
	}

	function deleteCourse(id) {
		$.get("../lecturer/delete", {
			"id": id
		}, function(data) {
			if(data.result == 1) {
				modalDialog("删除成功！");
			} else {
				modalDialog("删除失败！");
			}
			dataTable.ajax.reload();
		})
	}
});