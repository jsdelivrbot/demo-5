////定义构造函数
function his(name,url){
	this.name=name;
	this.url=url;
}
////添加用户历史记录
function addUserHistory(name,url){
	var read=JSON.parse(localStorage.getItem('key'));

	if(read==undefined||read==null){
		read=[];

	}
	if(name==''||url==''){
		return ;
	}
	var item=new his(name,url);
	$.each(read,function(i){
		if(read[i].name==name){
		read.splice(i,1);
		}
	});
	read.push(item);
	console.log(read);
	localStorage.setItem('key',JSON.stringify(read));
}