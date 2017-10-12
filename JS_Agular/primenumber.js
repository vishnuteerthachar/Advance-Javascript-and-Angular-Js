
var isPrime = (function (n){
	for(var i = 2; i <= (n/2); i++)
		if (n % i === 0){
			return false;
		}
	return true;
});

//cache is private
var isPrime = (function(){
	var cache = {};

	function isPrime(n){
		if (typeof cache[n] !== 'undefined')
			return cache[n];

		console.log('processing ', n);
		cache[n] = true;
		for(var index = 2, count = (n/2); index < count; index++){
			if (n % index === 0){
				cache[n] = false;
				break;
			}
		}
		return cache[n];
	}
	return isPrime;
})();

//cache can be public
function isPrime(n){
	if (!isPrime.cache){
		isPrime.cache = {};
	}
	if (typeof isPrime.cache[n] !== 'undefined')
		return isPrime.cache[n];

	console.log('processing ', n);
	isPrime.cache[n] = true;
	for(var index = 2, count = (n/2); index < count; index++){
		if (n % index === 0){
			isPrime.cache[n] = false;
			break;
		}
	}
	return isPrime.cache[n];
}

//Even or odd
var isOddOrEven = (function (){
	var cache = {};
	function process(n){
		console.log('processing ', n);
		return n % 2 === 0 ? 'even' : 'odd';
	}
	return function(n){
        if (typeof cache[n] !== 'undefined')
			return cache[n];
		cache[n] = process(n);
		return cache[n];
	}
})();
