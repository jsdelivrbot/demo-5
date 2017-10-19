$(function() {
	var institutionId = localStorage.getItem('institutionId');
	var corseConfiguration = {
		init: function() {
			this.selectPic();

			this.getConfiglist(); //获取配置机构内容列表
			this.fadeToggle();
		},
		selectPic: function() {
			var lIds = []; //讲师id
			var cIds = []; //课程id
			var tIds = []; //模板id
			$('#saveBtn').click(function() {
				//lIds
				$("input[type='checkbox'][name='lIds']:checked").each(function() {
					lIds.push($(this).attr('value'));
				});
				//cIds
				$("input[type='checkbox'][name='cIds']:checked").each(function() {

					cIds.push($(this).attr('value'));
				});
				//tIds
				$("input[type='checkbox'][name='tIds']:checked").each(function() {

					tIds.push($(this).attr('value'));
				});

				$.ajax({
					url: "/public_platform/mechanism/config",
					type: "post",
					data: {
						id: institutionId,
						lIds: lIds.join(','),
						cIds: cIds.join(','),
						tIds: tIds.join(',')
					},
					success: function(data) {
						overTime(data);
						console.log(data);
						if(data.result == '1') {
							modalDialog('保存成功', 2);
							setTimeout(function() {
								$('.page').html('');
								$('.page').load('html/institute.html');
							}, 2000)
						} else {
							modalDialog("保存失败");
						}
					}
				});
			});
			$('#returnBtn').click(function() {
				$('.page').html('');
				$('.page').load('html/institute.html');
			});

		},
		fadeToggle: function() {

			$('.CourseConfiguration').click(function() {
				$('#CourseConfiguration').fadeToggle(1000);
				$(this).children('.arrowDown').toggleClass('arrowRotate')

			});
			$('.lecturerConfiguration').click(function() {
				$('#lecturerConfiguration').fadeToggle(1000);
				$(this).children('.arrowDown').toggleClass('arrowRotate')

			});
			$('.guidanceConfiguration').click(function() {
				$('#guidanceConfiguration').fadeToggle(1000);
				$(this).children('.arrowDown').toggleClass('arrowRotate')
			});

		},
		getConfiglist: function() {
			$.ajax({
				dataType: "json",
				type: "post",
				url: "/public_platform/mechanism/configlist",
				data: {
					id: institutionId
				},
				success: function(data) {
					//$('#CourseConfiguration').html('');
					if(data.result == 1) {
						console.log(data);

						//模板=指导
						var tlistStr = '';
						$.each(data.data.tlist, function(index, obj) {
							tlistStr += '<label class="checkbox-inline">' +
								'<input type="checkbox" value = "' + obj.id + '" name="tIds" data-selected="' + obj.isSelected + '">' +
								'<i></i>' +
								'<img src= "' + obj.logo + '" class = "img-rounded guidanceConfigurationImgPic" >' +
								'<h3 class = "picName">' + obj.name + '</h3>' +
								'</label>';

						});
						$('#guidanceConfiguration').html(tlistStr);
						//讲师
						var listStr = '';
						$.each(data.data.llist, function(index, obj) {
							listStr += '<label class="checkbox-inline">' +
								'<input type="checkbox" value = "' + obj.id + '" name="lIds" data-selected="' + obj.isSelected + '">' +
								'<i></i>' +
								'<img src= "' + obj.logo + '" class = "img-rounded lecturerConfigurationImgPic" >' +
								'<h3 class = "picName">' + obj.name + '</h3>' +
								'</label>';

						});
						$('#lecturerConfiguration').html(listStr);
						//课程
						var clistStr = '';
						$.each(data.data.clist, function(index, obj) {
							clistStr += '<label class="checkbox-inline">' +
								'<input type="checkbox"  value = "' + obj.id + '" name="cIds" data-selected="' + obj.isSelected + '">' +
								'<i></i>' +
								'<img src= "' + obj.logo + '" class = "img-rounded CourseConfigurationImgPic" >' +
								'<h3 class = "picName">' + obj.name + '</h3>' +
								'</label>';

						});
						$('#CourseConfiguration').html(clistStr);
						
						$('input[type="checkbox"]').each(function(i, d) {

							if($(d).attr('data-selected') == 'true') {
								$(d).attr("checked", true);
							} else {
								$(d).attr("checked", false);
							}
						});

					} else {
						modalDialog(data.msg);
					}
				},
				error: function() {
					modalDialog('网络请求错误');
				}
			});

		},
	};
	corseConfiguration.init();
	$('#goInstitute').on('click',function(){
		$('.page').html('');
		$('.page').load('html/institute.html');
  	})
})