/**
 * jquery函数
 */
$(function() {
	brainbow();

});

var brainbow = function init () {

  var indicate = function indicate ($e) {
    var o = $e.position(),
        h = $e.innerHeight(),
        w = $e.innerWidth(),
        t = (o.top + h-12 ),
        l = o.left;
    $(".indicator").css({
      "top":t  + "px" ,
      "left": l + "px",
      "width": w + "px",
      "height":"3px",
      'backgroundColor':'#4791EA',

    });
  };
 //点击事件
  $(".header-bottom").on("click", "li", function(e) {
    $(".header-bottom li").each(function(){
      $(this).removeClass("active");
    });
    $(this).addClass("active");
    if($(this).hasClass('header-bottom-item1')){
    	window.location.href = "proIndex.html";
    }else if($(this).hasClass('header-bottom-item2')){
		window.location.href = "rainfallStatistical.html";
    }else if($(this).hasClass('header-bottom-item3')){
		window.location.href = "waterLevelStatistical.html";
    }else if($(this).hasClass('header-bottom-item4')){
		window.location.href = "stationState.html";
    }else if($(this).hasClass('header-bottom-item5')){
		window.location.href = "artificialReport.html";
    }else if($(this).hasClass('header-bottom-item6')){
    window.location.href = "dataManagement.html";
    }
  });
   //鼠标移入事件
  $(".header-bottom ul").on("mouseenter", "li", function(e) {
    indicate( $(this));
  });
  //鼠标移出事件
  $(".header-bottom ul").on("mouseleave", "li", function(e) {
    indicate( $("li.active"));
  });
  //浏览器尺寸变化事件
  $(window).resize(function(){
  	 indicate( $("li.active"));
  })

  /**动态创建滑动层**/
  var indicator = $("<div>").addClass("indicator");
  $('.header-bottom ul').append(indicator);

  indicate($(".header-bottom ul li.active"));
};



/**
 * 弹框的关闭
 * @param msg 弹框关闭后的提示信息
 * @param hideArea 弹框id,需要隐藏的弹框id
 * @param hidePrompt 提示信息2s后显示，该提示信息id
 */
var outBoxCloseHead = function outBox(msg,hideArea,hidePrompt){
	$("#tipMsg").addClass("active").html(msg).show();
	function tipHide(){
		$("#"+hidePrompt).hide();
	}
    setTimeout(tipHide,2000);
	$("#"+hideArea).modal('hide');
}
