var products = [
	{id : 6, name : 'Pen', cost : 40, units : 50, category : 'utils'},
	{id : 3, name : 'Len', cost : 60, units : 30, category : 'grocery'},
	{id : 8, name : 'Den', cost : 30, units : 70, category : 'stationary'},
	{id : 7, name : 'Ten', cost : 80, units : 60, category : 'grocery'},
	{id : 4, name : 'Zen', cost : 50, units : 40, category : 'stationary'},
];

function describe(title, fn){
	console.group(title);
	fn();
	console.groupEnd();
}

function describeGroup(groupedObj){
	for(var key in groupedObj){
		describe('Key - [' + key + ']', function(){
			console.table(groupedObj[key]);
		});
	}
}
//Sort
//Filter
//GroupBy

describe('Default List', function(){
	console.table(products);
});

describe('Sort', function(){
	describe('Default Sorting - [Products by id]', function(){
		function sortProductsById(){
			for(var i=0; i < products.length-1; i++)
				for(var j=i+1; j < products.length; j++)
					if (products[i].id > products[j].id){
						var temp = products[i];
						products[i] = products[j];
						products[j] = temp;
					}
		}
		sortProductsById();
		console.table(products);
	});

	function getDescending(comparerFn){
		return function(){
			return comparerFn.apply(undefined, arguments) * -1;
		}
	}
	function sort(list, comparer, descending){
		var comparerFn = undefined;
		if (typeof comparer === 'function')
			comparerFn = comparer;
		if (typeof comparer === 'string'){
			comparerFn = function(item1, item2){
				if (item1[comparer] < item2[comparer]) return -1;
				if (item1[comparer] > item2[comparer]) return 1;
				return 0;
			}
		}
		if (!comparerFn) return;
		if (descending)
			comparerFn = getDescending(comparerFn);
		for(var i=0; i < list.length-1; i++)
			for(var j=i+1; j < list.length; j++)
				if (comparerFn(list[i], list[j]) > 0){
					var temp = list[i];
					list[i] = list[j];
					list[j] = temp;
				}
	}
	describe('Any list by any attribute', function(){
		/*function sort(list, attrName){
			for(var i=0; i < list.length-1; i++)
				for(var j=i+1; j < list.length; j++)
					if (list[i][attrName] > list[j][attrName]){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		}*/
		describe('Products by cost', function(){
			sort(products, 'cost');
			console.table(products);
		});

		describe('Products by cost descending', function(){
			sort(products, 'cost', true);
			console.table(products);
		});

		describe('Products by units', function(){
			sort(products, 'units');
			console.table(products);
		});
	});

	describe('Any list by any comparer', function(){
		/*function sort(list, comparer){
			for(var i=0; i < list.length-1; i++)
				for(var j=i+1; j < list.length; j++)
					if (comparer(list[i], list[j]) > 0){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		}*/
		var productComparerByValue = function(p1, p2){
			var p1Value = p1.cost * p1.units,
				p2Value = p2.cost * p2.units;
			if (p1Value < p2Value) return -1;
			if (p1Value > p2Value) return 1;
			return 0;
		}
		describe('Products by value [value=cost * units]', function(){
			
			sort(products, productComparerByValue);
			console.table(products);
		});
		describe('Products by value [value=cost * units] descending', function(){
			
			sort(products, productComparerByValue, true);
			console.table(products);
		});

	});
});

describe('Filter', function(){
	describe('All stationary products', function(){
		function filterStationaryProducts(){
			var result = [];
			for(var index=0, count = products.length; index < count; index++){
				if (products[index].category === 'stationary')
					result.push(products[index]);
			}
			return result;
		}
		var stationaryProducts = filterStationaryProducts();
		console.table(stationaryProducts);
	});
	describe('Any list by any criteria', function(){
		function filter(list, criteriaFn){
			var result = [];
			for(var index=0, count = list.length; index < count; index++){
				if (criteriaFn(list[index]))
					result.push(list[index]);
			}
			return result;
		}
		function negate(criteriaFn){
			return function(){
				return !criteriaFn.apply(undefined, arguments);
			}
		};
		describe('grocery products', function(){
			var isGroceryProduct = function(product){
				return product.category === 'grocery';
			};
			var groceryProducts = filter(products, isGroceryProduct);
			console.table(groceryProducts);
		});

		describe('Products by cost', function(){
			var isCostlyProduct = function(product){
				return product.cost >= 50;
			};
			/*var isaffordableProduct = function(product){
				return product.cost <= 50;
			};*/
			/*var isaffordableProduct = function(product){
				return !isCostlyProduct(product);
			};*/
			var isaffordableProduct = negate(isCostlyProduct);

			describe('costly products [cost > 50]', function(){
				
				var costlyProducts = filter(products, isCostlyProduct);
				console.table(costlyProducts);
			});
			describe('affordable products [cost <= 50]', function(){
				
				var affordableProducts = filter(products, isaffordableProduct);
				console.table(affordableProducts);
			});
		});

		describe('Products by units', function(){
			var isUnderStockedProduct = function(product){
				return product.units < 50;
			};
			/*var isWellStockedProduct = function(product){
				return product.units >= 50;
			}*/
			/*var isWellStockedProduct = function(product){
				return !isUnderStockedProduct(product);
			}*/
			var isWellStockedProduct = negate(isUnderStockedProduct);

			describe('Understocked products [ units < 50 ]', function(){
				
				var understockedProducts = filter(products, isUnderStockedProduct);
				console.table(understockedProducts);
			});
			describe('Wellstocked products [ !understockedProduct]', function(){
				var wellStockedProducts = filter(products, isWellStockedProduct);
				console.table(wellStockedProducts);
			});
		});
		
	});
});

describe('GroupBy', function(){

	describe('Products by category', function(){
		function groupProductsByCategory(){
			var result = {};
			for(var index=0, count = products.length; index < count; index++){
				var category = products[index].category;
				if (typeof result[category] === 'undefined')
					result[category] = [];
				result[category].push(products[index]);
			}
			return result;
		}

		var productsByCategory = groupProductsByCategory();
		describeGroup(productsByCategory);
	});
	describe('Any list by any key', function(){
		function groupBy(list, keySelectorFn){
			var result = {};
			for(var index=0, count = list.length; index < count; index++){
				var key = keySelectorFn(list[index]);
				/*if (typeof result[key] === 'undefined')
					result[key] = [];*/
				result[key] = result[key] || [];
				result[key].push(list[index]);
			}
			return result;
		}
		describe('Products by category', function(){
			var categoryKeySelector = function(product){
				return product.category;
			};
			var productsByCategory = groupBy(products, categoryKeySelector);
			describeGroup(productsByCategory);
		});

		describe('Products by cost', function(){
			var costKeySelector = function(product){
				return product.cost < 50 ? 'affordable' : 'costly';
			};
			var productsByCost = groupBy(products, costKeySelector);
			describeGroup(productsByCost);
		});
	});
});
