//Generic Memoize Function

function memoize(algoFn){
	var cache = {};

	return function(){
		var key = JSON.stringify(arguments);
		if (typeof cache[key] === 'undefined')
			cache[key] = algoFn.apply(undefined, arguments);
		return cache[key];
	}
	
}

var add = memoize(function(x,y){
	console.log('processing ', x , ' and ', y);
	return x + y;
});