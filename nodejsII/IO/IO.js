var http=require('http'),
urls=['www.baidu.com','www.hao123.com','www.sina.com.cn'];

function fetchPage(url){
	var start=new Date();
	http.get({host:url},function(res){
		console.log(url);
		console.log(new Date() - start+'ms');
	});
}

for(var i=0;i<urls.length;i++){
	fetchPage(urls);
}