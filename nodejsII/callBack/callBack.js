function haveBreafast(food,drink,callBack){
	console.log('吃'+food+',喝'+drink);
	if(callBack&&typeof(callBack) === 'function'){
		callBack();
	}
}

haveBreafast('toast','coffee',function(){
	console.log('完成早餐,去工作了');
})