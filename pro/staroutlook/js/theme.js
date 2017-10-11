//require('../lib/swiper-3.3.1.min.js');
//var tpltheme = require('../tpl/theme.string');
//var fnUtil = require('../util/fn.util.js');
//var waterfallUtil = require('../util/waterfall.util.js');
//SPA.defineView('theme', {
//html: tpltheme,

;$(function(){
	document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
	var myScroll=new IScroll("#index-scroll",{vScroll:true,click:true});
  	myScroll.on("scrollStart",function(){
	 	myScroll.refresh();
	 });
});