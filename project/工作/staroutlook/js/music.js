;$(function(){
	document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
	var myScroll=new IScroll("#index-scroll",{vScroll:true,click:true});
	myScroll.on("scrollStart",function(){
	 	myScroll.refresh();
	});
});

