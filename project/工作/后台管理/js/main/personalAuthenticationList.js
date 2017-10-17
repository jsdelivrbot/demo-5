$(function() {
	var id;
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
		"flexibleWidth": true,
		"responsive": true,
		"autoWidth": true,
		"pageLength": 10,
		"lengthMenu": [10, 15, 20, 25]
	});

	var dataTable = $("#example").DataTable({
		"fnDrawCallback": function() {　　
			var api = this.api();　　
			var startIndex = api.context[0]._iDisplayStart; //获取到本页开始的条数
			　　
			api.column(0).nodes().each(function(cell, i) {
				cell.innerHTML = startIndex + i + 1;
			});
		},
		"ajax": {
			"url": "/public_platform/businessUser/list",
			"data": function(d) {
				var pageNum = Math.ceil(d.start / d.length) + 1;
				var realName = $("#name").val();
				if(typeof($("#name").val()) == "undefined") {
					realName = "";
				}
				var authStatus = $("#status").val();
				return "pageNum=" + pageNum + "&pageSize=" + d.length + "&realName=" + realName + "&authStatus=" + status;
			},
			"dataFilter": function(data) {
				overTime(jQuery.parseJSON(data));
				var result = jQuery.parseJSON(data).data;
				var json = new Object();
				console.log(result)
				json.recordsTotal = result.total;
				json.recordsFiltered = result.total;
				json.data = result.list;
				console.log(json)
				return JSON.stringify(json); // return JSON string
			}
		},
		columns: [{
			"data": "id"
		}, {
			"data": "realName"
		}, {
			"data": "authStatus",
			render: function(data, type, row) {
				//1-等待审核 2-审核通过 3-审核未通过
				if(data == 1) {
					return "等待审核";
				} else if(data == 2) {
					return "审核通过";
				} else if(data == 3) {
					return "审核未通过";
				}
				return "";
			}
		}, {
			"data": "id",
			render: function(data, type, row) {
				var html = "";
				html += '<button type="button" name="viewBtn" id="' + data + '"  class="btn marright5"  data-toggle="modal" data-target="#searchBtnModal">查看</button>';
				return html;
			}
		}]
	});

	$("#searchBtn").click(function() {
		dataTable.ajax.reload();
	});

	$('#preSave').on('click', function() {
		$('.page').html('');
		$('.page').load('html/addPersonalAuthen.html', function() {
			$("#idcardimg,#certificateimg").fileinput({
				language: "zh",
				browseLabel: '选取文件',
				uploadUrl: '/public_platform/file/upload',
				allowedFileExtensions: ['jpg', 'png'],
				uploadAsync: 　false,
				showUpload: false,
				showRemove: false,
				validateInitialCount: true,
				maxFileSize: 1024,
				initialPreviewFileType: "file",
				fileActionSettings: {
					showUpload: false,
				},
				initialCaption: '未选择文件'
			});
		});
	})
	
	$('body').on('click','button[name="viewBtn"]',function() {
	
		id = $(this).attr("id");
		$.ajax({
			url: "/public_platform/businessUser/view",
			type: "post",
			dataType: "json",
			data: {
				"id": id,
			},
			success: function(data) {
				console.log(data)
				if(data.result == "1") {
					$('#searchBtnModal').modal('show');
					$('.modal-backdrop:gt(0)').remove();

					$('#reallyName').html(data.data.realName); //真实姓名
					$('#idCard').html(data.data.idCard); //身份证号
					$('#idPic').html('<img src="' + data.data.idCardJustUrl + '" class="modalIdCardJustUrl">'); //手持身份证照片
					var idCardBackUrlArray = data.data.idCardBackUrl.split(",");
					var idCardBackImgs = '';
					for(var i = 0; i < idCardBackUrlArray.length; i++) {
						idCardBackImgs += '<img src="' + idCardBackUrlArray[i] + '" class="modalIdCardBackUrl fl">';
					}
					$('#credentialPic').html(idCardBackImgs); //证件照片
					$('#phone').html(data.data.phone); //手机号

					$('#knowBtn').click(function() {
						$('#searchBtnModal').modal('hide');
						$('.modal-backdrop').hide();
					});
					
					$("#searchBtnModal img").addClass("small");
					$("#searchBtnModal img").click(function(){
						var imgSrc = $(this).attr("src");
						$('#picModal').modal('show');
						$(".modal-backdrop").eq(1).css("z-index","1059")
						$('#picModal .modal-body').html('<img src="'+ imgSrc +'" />');
					});
				} else {
					modalDialog("操作失败!");
				}
			},
			error: function() {
				modalDialog("网络请求错误!");
			}
		})
	});
	$('#goAuthenInformation').on('click',function(){
		$('.page').html('');
		$('.page').load('html/authenInformation.html');
  	})
});