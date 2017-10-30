var express=require('express');
var app=module.exports=express.createServer();

var rebels=[
	{name:'shiwei'},{name:'lvbu'},{name:'liubei'}
];

app.get('/',function(req,res,next){
	res.send(rebels);
});

app.use(express.errorHandler({dumpExceptions:true,showStack:true}));
app.listen(3000);
