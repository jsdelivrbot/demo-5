/**
 * 生成分页工具条
 * @param currentPage	当前页码
 * @param totalPage		总页码
 * @param container		分布工具条容器id
 * @param callback		回调方法
 */
function genPageBar(currentPage,totalPage,container,callback){
	currentPage = parseInt(currentPage);
	totalPage = parseInt(totalPage);
	var containerObj = $("#" + container);
	containerObj.empty();
	if (totalPage <= 1) {
		return;
	}
	if(currentPage > 1){
		containerObj.append('<a href="javascript:;" class="laypage_prev" data-page="' + (currentPage-1) + '">上一页</a>');
	}
	for(var i=1;i<=totalPage;i++){
		if(i == currentPage){
			containerObj.append('<span class="laypage_curr">' + i + '</span>');
		}else{
			containerObj.append('<a href="javascript:;" data-page="' + i + '">' + i + '</a>');
		}
	}
	if(currentPage < totalPage){
		containerObj.append('<a href="javascript:;" class="laypage_next" data-page="' + (currentPage + 1) + '">下一页</a>');
	}
	
	$("#" + container + " a").each(function(e){
		$(this).click(function(){
			var page = $(this).attr('data-page');
			callback(page);
		});
	});
}