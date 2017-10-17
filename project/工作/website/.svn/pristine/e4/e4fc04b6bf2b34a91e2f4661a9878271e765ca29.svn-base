// JavaScript Document
//首页焦点轮播
var Focus=function(ele,setWidth,boolean,fn){
	this.onBtn=boolean||false;//是否显示左右按钮(是:true,否:false)
	this.autoPlayTime=4500;//自动播放速度(单位：毫秒)
	this.imgChangeTime=600;//图片切换速度(单位：毫秒)
	this.ele=ele;
	this.lb=this.ele.children('.focusLB');
	this.img=this.lb.children('a');
	this.LBtn=null;
	this.RBtn=null;
	this.dot=null;
	this.dotLi=null;
	this.setWidth=setWidth||$(document).width();
	this.fn=fn;//事件触发的回调
	this.flag=true;
	this.aniTimer=null;
	this.initEle();
	this.initCss();
	this.RClick();
	this.LClick();
	this.dotClick();
	this.autoPlay();
	this.hover();
	this.resize(setWidth);
}
Focus.prototype={
	imgCount:0,
	dotCount:0,
	initEle:function(){
		var _html='';
		var copyA=this.img.first();
		this.lb.append(copyA.clone(true));
		this.img=this.lb.children('a');
		this.ele.append('<ul class="dot"></ul>');
		this.dot=this.ele.children('.dot');
		for(var i=0;i<this.img.length-1;i++){
			_html+='<li></li>';
		}
		this.dot.append(_html);
		this.dotLi=this.dot.children('li');
		this.ele.append('<div class="btn LBtn" onselectstart="return false;">&lt;</div>');
		this.ele.append('<div class="btn RBtn" onselectstart="return false;">&gt;</div>');
		this.LBtn=this.ele.children('.LBtn');
		this.RBtn=this.ele.children('.RBtn');
		if(!this.onBtn){
			this.RBtn.css('display','none');
			this.LBtn.css('display','none');	
		}
	},
	initCss:function(){
		var _this = this;
		var imgNum=this.img.length;
		var dotWidth=(imgNum-1)*(parseFloat(this.dotLi.css('borderLeftWidth'))*2+this.dotLi.width()+parseFloat(this.dotLi.css('marginLeft'))*2);
		this.ele.width(this.setWidth);
		this.img.each(function(){$(this).width(_this.setWidth);});
		this.lb.width(this.setWidth*imgNum);
		this.dot.css({'width':dotWidth,'marginLeft':-dotWidth/2});
	},
	RClick:function(){
		var _this=this;
		this.RBtn.on('click',function(){
			if(_this.flag){
				_this.flag=false;
				if(_this.imgCount>=_this.img.length-1){
					_this.lb.css('marginLeft',0);
					_this.imgCount=0;
				}
				if(_this.dotCount>=_this.dotLi.length-1){
					_this.dotCount=-1;
				}
				_this.lb.animate({'marginLeft':'-='+_this.setWidth},_this.imgChangeTime,function(){
					_this.flag=true;	
				});
				_this.dotLi.eq(_this.dotCount+1).siblings('li').css('background','#fff');
				_this.dotLi.eq(_this.dotCount+1).css('background','#3cf');
				_this.imgCount++;
				_this.dotCount++;
				if(_this.fn){_this.fn();}
			}
		});	
	},
	LClick:function(){
		var _this=this;
		this.LBtn.on('click',function(){
			if(_this.flag){
				_this.flag=false;
				if(_this.imgCount<=0){
					var maxML=-(_this.img.length-1)*_this.setWidth;
					_this.lb.css('marginLeft',maxML);
					_this.imgCount=_this.img.length-1;
				}
				if(_this.dotCount<=0){
					_this.dotCount=_this.dotLi.length;
				}
				_this.lb.animate({'marginLeft':'+='+_this.setWidth},_this.imgChangeTime,function(){
					_this.flag=true;	
				});
				_this.dotLi.eq(_this.dotCount-1).siblings('li').css('background','#fff');
				_this.dotLi.eq(_this.dotCount-1).css('background','#3cf');
				_this.imgCount--;
				_this.dotCount--;
				if(_this.fn){_this.fn();}
			}
		});	
	},
	dotClick:function(){
		var _this=this;
		this.dotLi.on('click',function(){
			if(_this.flag){
				_this.flag=false;
				$(this).siblings('li').css('background','#fff');
				$(this).css('background','#3cf');
				_this.lb.animate({'marginLeft':-$(this).index()*_this.setWidth},_this.imgChangeTime,function(){
					_this.flag=true;
				});
				_this.imgCount=$(this).index();
				_this.dotCount=$(this).index();	
				if(_this.fn){_this.fn();}
			}
		});	
	},
	autoPlay:function(){
		var _this=this;
		this.aniTimer=setInterval(function(){
			_this.RBtn.click();
		},_this.autoPlayTime);	
	},
	hover:function(){
		var _this=this;
		this.ele.hover(function(){
			clearInterval(_this.aniTimer);
		},function(){
			_this.autoPlay();
		});	
	},
	resize:function(setW){
		var _this=this;
		$(window).resize(function(){
			_this.setWidth=setW||$(document).width();
			_this.ele.width(_this.setWidth);
			_this.img.each(function(){$(this).width(_this.setWidth)});
			_this.lb.width(_this.setWidth*_this.img.length);
			_this.lb.css('marginLeft',-_this.imgCount*_this.setWidth);
		});	
	}
}
window['Focus']=Focus;
new Focus($('.focus:eq(0)'));//banner轮播
var jcsk=new Focus($('.focus:eq(1)'),1000,true,changeNum);//精彩赛况轮播

//限制输出字数个数
maxTxtNum($('.type .typeInfo'),43);
maxTxtNum($('.lrFocus .infoTitle'),15);
function maxTxtNum(element,maxNum){
	element.each(function(){
		var attr=$(this)[0].nodeName;
		if(attr=="INPUT"){
			if($(this).val().length>maxNum){
				$(this).val($(this).val().substring(0,maxNum));
			}
		}else{
			if($(this).html().length>maxNum){
				$(this).html($(this).html().substring(0,maxNum)+"...");
			}	
		}	
	});
}
//----------游学路线轮播----------
var rlFocus=function(ele){
	this.ele=ele;
	this.lb=this.ele.find('.lrLB');	
	this.img=this.lb.children('a');
	this.LBtn=this.ele.find('.LBtn');
	this.RBtn=this.ele.find('.RBtn');
	this.imgNum=0;
	this.flag=true;
	this.init();
	this.LBtnClick();
	this.RBtnClick();
	
	
}
rlFocus.prototype={
	RBtnClick:function(){
		var _this=this;
		this.RBtn.click(function(){
			if(_this.flag){
				_this.flag=false;
				if(_this.imgNum>=_this.img.length-3){
					_this.flag=true;
					_this.RBtn.css('cursor','not-allowed');
					return;
				}
				_this.lb.animate({marginLeft:"-="+(_this.img.width()+10)},300,function(){_this.flag=true;});
				_this.RBtn.css('cursor','pointer');
				_this.LBtn.css('cursor','pointer');
				_this.imgNum++;
			}
		});	
	},
	LBtnClick:function(){
		var _this=this;
		this.LBtn.click(function(){
			if(_this.flag){
				_this.flag=false;
				if(_this.imgNum<=0){
					_this.flag=true;
					_this.LBtn.css('cursor','not-allowed');
					return;
				}
				_this.lb.animate({marginLeft:"+="+(_this.img.width()+10)},300,function(){_this.flag=true;});
				_this.LBtn.css('cursor','pointer');
				_this.RBtn.css('cursor','pointer');
				_this.imgNum--;
			}
		});	
	},
	init:function(){
		this.lb.width(this.img.length*(this.img.width()+10));	
	}	
}
var f2=new rlFocus($('.lrFocus'));
changeNum();
function changeNum(){
	var videoName=jcsk.lb.children('a:eq('+(jcsk.dotCount)+')').attr('title');
	$('.videotitle').html(videoName+'&nbsp;'+(jcsk.dotCount+1));	
}

//----------选择视频----------
$('.videoLB a').click(function(){
	$('.videoView,.videoViewBg').show();
	var newSrcName=$(this).attr('name');
	var oldSrcName=$('.video').attr('src');
	if(newSrcName!=oldSrcName){
		$('.video').attr('src',newSrcName);
	}
	document.querySelector('.video').play();
});
//----------暂停或关闭视频----------
$('.videoViewBg').click(function(){
	$('.videoViewBg,.videoView').hide();
	document.querySelector('.video').pause();
});
//----------导航浮动----------
$(document).scroll(function(){
	var curT=$(this).scrollTop();
	if($(this).scrollTop()>=850){
		$('.navCont').css({'position':'fixed','top':0,'zIndex':99});
	}else{
		$('.navCont').css({'position':'static'});
	}
});