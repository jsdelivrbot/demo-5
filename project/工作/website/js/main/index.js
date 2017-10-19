// JavaScript Document
//首页焦点轮播
var Focus=function(ele){
	this.ele=ele;
	this.lb=this.ele.children('.focusLB');
	this.img=this.lb.children('a');
	/*this.LBtn=this.ele.children('.LBtn');
	this.RBtn=this.ele.children('.RBtn');*/
	this.dot=null;
	this.dotLi=null;
	this.flag=true;
	this.html='';
	this.imgNum=0;
	this.aniTimer;
	this.init();
	this.dotClick();
	this.autoPlay();
	this.hover();
}
Focus.prototype={
	dotClick:function(){
		var _this=this;
		this.dotLi.click(function(){
			if(_this.flag){
				_this.flag=false;
				$(this).css('border','solid 4px #f00');
				$(this).siblings('li').css('border','solid 4px #fff');
				_this.lb.animate({marginLeft:-$(this).index()*_this.ele.width()},300,function(){_this.flag=true;});
				_this.imgNum=$(this).index();
			}
		});
	},
	hover:function(){
		var _this=this;
		_this.ele.hover(function(){
			clearInterval(_this.aniTimer);
		},function(){
			_this.autoPlay();
		});
	},
	init:function(){
		this.ele.width($(document).width());
		this.lb.append(this.img.first().clone(true));
		this.img=this.lb.children('a');
		//this.img.each(function(){$(this).width($(document).width());});
		this.lb.width($(document).width()*this.img.length);
		
		this.ele.append('<ul class="dot"></ul>');
		this.dot=this.ele.children('.dot');
		for(var i=0;i<this.img.length-1;i++){
			this.html+='<li></li>';
		}
		this.dot.append(this.html);
		this.dotLi=this.dot.children('li');
		this.dot.width(this.dotLi.length*(this.dotLi.width()+22));
		this.dot.css('marginLeft',-(this.dotLi.width()+12)*this.dotLi.length/2);
		console.log(this.dot.css('marginLeft'),this.dotLi.length,this.dotLi.width());
	},
	autoPlay:function(){
		var _this=this;
		this.aniTimer=setInterval(function(){
			var ml=parseInt(_this.lb.css('marginLeft'));
			console.log(ml,_this.lb.width()-_this.img.width());
			if(_this.imgNum>=_this.dotLi.length-1){
				_this.lb.css('marginLeft',0);
				_this.imgNum=-1;
			}
			_this.lb.animate({marginLeft:'-='+$(document).width()},500);
			_this.dotLi.eq(_this.imgNum+1).css({'border':'solid 4px #f00'},500);
			_this.dotLi.eq(_this.imgNum+1).siblings('li').css({'border':'solid 4px #fff'},500);
			_this.imgNum++;	
			console.log(_this.imgNum);
		},4500);
	}
}
window['Focus']=Focus;

$(function() {
	var f=new Focus($('.focus'));
/*	var bannerSwiper = new Swiper('.index-banner .swiper-container', {
		autoplay: 5000,
		loop: true,
		preventClicks:false,
		noSwiping : true,
		paginationClickable :true,
		pagination: '.swiper-pagination',
	});*/
	var gameSwiper = new Swiper('.game .swiper-container', {
		onlyExternal: true,
		onTransitionStart: function(swiper) {
			changeBth(swiper, ".game");
			$(".videotitle").html($('.game').find(".swiper-slide-active").attr("videoname"));
			$("#gameVideo").attr("src",$('.game').find(".swiper-slide-active").attr("videourl"));
		}
	});
	var tourSwiper = new Swiper('.tour .swiper-container', {
		slidesPerView: 3,
		spaceBetween: 8,
		onlyExternal: true,
		preventClicks:false,
		onTransitionStart: function(swiper) {
			changeBth(swiper, ".tour");
		}
	});
	toSlide(gameSwiper, ".game");
	toSlide(tourSwiper, ".tour");

//	$(".game .swiper-slide,.tour-wrapper img").click(function() {
	$(".game .swiper-slide").click(function() {
		$(".view").fadeIn();
		var gameVideo = document.getElementById("gameVideo");
		gameVideo.play();
		$(".view-bg").click(function() {
			$(".view").fadeOut();
			gameVideo.pause();
		});
	});

	function changeBth(swiper, name) {
		var index = swiper.activeIndex;
		var lastIndex = swiper.snapGrid.length - 1;
		if(index == lastIndex) {
			$(name).find(".btn-right").addClass("disabled");
		} else if(index == 0) {
			$(name).find(".btn-left").addClass("disabled");
			$(name).find(".btn-right").removeClass("disabled");
		} else {
			$(name).find(".btn-left").removeClass("disabled");
		}
	}

	function toSlide(swiper, name) {
		$(name).find(".btn-left").click(function() {
			swiper.slidePrev();
		});
		$(name).find(".btn-right").click(function() {
			swiper.slideNext();
		});
	}
})