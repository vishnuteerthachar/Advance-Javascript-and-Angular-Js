/*
When funnction invovked with new

1) this -> new object
2) Name of function start with Upper case
*/

function Employee(id,name,salary){
//this -> new Object
	this.id = id;
	this.name = name;
	this.salary = salary;
	//this -> returned by default

	}