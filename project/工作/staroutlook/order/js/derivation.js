$(".outregiment span").click(function() {
	$(this).addClass("active").siblings().removeClass("active");
})
var autoLb = false; //autoLb=true为开启自动轮播
var autoLbtime = 2; //autoLbtime为轮播间隔时间（单位秒）
var touch = true; //touch=true为开启触摸滑动
var slideNub; //轮播图片数量

$(function() {
	slideNub = $(".slide .img").size(); //获取轮播图片数量
	for(i = 0; i < slideNub; i++) {
		$(".slide .img:eq(" + i + ")").attr("data-slide-imgId", i);
	}

	//根据轮播图片数量设定图片位置对应的class
	if(slideNub == 1) {
		for(i = 0; i < slideNub; i++) {
			$(".slide .img:eq(" + i + ")").addClass("img3");
		}
	}
	if(slideNub == 2) {
		for(i = 0; i < slideNub; i++) {
			$(".slide .img:eq(" + i + ")").addClass("img" + (i + 3));
		}
	}
	if(slideNub == 3) {
		for(i = 0; i < slideNub; i++) {
			$(".slide .img:eq(" + i + ")").addClass("img" + (i + 2));
		}
	}
	if(slideNub > 3 && slideNub < 6) {
		for(i = 0; i < slideNub; i++) {
			$(".slide .img:eq(" + i + ")").addClass("img" + (i + 1));
		}
	}
	if(slideNub >= 6) {
		for(i = 0; i < slideNub; i++) {
			if(i < 5) {
				$(".slide .img:eq(" + i + ")").addClass("img" + (i + 1));
			} else {
				$(".slide .img:eq(" + i + ")").addClass("img5");
			}
		}
	}
	mask();
	//自动轮播
	if(autoLb) {
		setInterval(function() {
			right();
		}, autoLbtime * 1000);
	}

	if(touch) {
		k_touch();
	}
	slideLi();
	imgClickFy();
});
// 蒙层的显示
function mask() {
	$(".img").find(".mask").remove();
	$(".img2,.img4").append('<div class="mask"></div>');
}
//右滑动
function right() {
	var fy = new Array();
	for(i = 0; i < slideNub; i++) {
		fy[i] = $(".slide .img[data-slide-imgId=" + i + "]").attr("class");
	}
	for(i = 0; i < slideNub; i++) {
		if(i == 0) {
			$(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[slideNub - 1]);
		} else {
			$(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[i - 1]);
		}
	}
	imgClickFy();
	slideLi();
	mask();
}

//左滑动
function left() {
	var fy = new Array();
	for(i = 0; i < slideNub; i++) {
		fy[i] = $(".slide .img[data-slide-imgId=" + i + "]").attr("class");
	}
	for(i = 0; i < slideNub; i++) {
		if(i == (slideNub - 1)) {
			$(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[0]);
		} else {
			$(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[i + 1]);
		}
	}
	imgClickFy();
	slideLi();
	mask();
}

//轮播图片左右图片点击翻页
function imgClickFy() {
	$(".slide .img").removeAttr("onclick");
	$(".slide .img2").attr("onclick", "left()");
	$(".slide .img4").attr("onclick", "right()");
}

//修改当前最中间图片对应按钮选中状态
function slideLi() {
	var slideList = parseInt($(".slide .img3").attr("data-slide-imgId")) + 1;
	$(".slide-bt span").removeClass("on");
	$(".slide-bt span[data-slide-bt=" + slideList + "]").addClass("on");
}

//触摸滑动模块
function k_touch() {
	var _start = 0,
		_end = 0,
		_content = document.getElementById("slide");
	_content.addEventListener("touchstart", touchStart, false);
	_content.addEventListener("touchmove", touchMove, false);
	_content.addEventListener("touchend", touchEnd, false);

	function touchStart(event) {
		var touch = event.targetTouches[0];
		_start = touch.pageX;
	}

	function touchMove(event) {
		var touch = event.targetTouches[0];
		_end = (_start - touch.pageX);
	}

	function touchEnd(event) {
		if(_end < -10) {
			left();
			_end = 0;
		} else if(_end > 10) {
			right();
			_end = 0;
		}
	}
}