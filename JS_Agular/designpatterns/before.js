function before(count,fn){
	var result = undefined;
	return function(){
	if(--count > 0)
	 	result = fn.apply(undefined, arguments);
	 return result;
	}
}