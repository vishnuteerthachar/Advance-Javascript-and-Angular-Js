var spinner = (function spinn(){
	var count = 0;
	return {
		up : function inc(){
            return ++count;
        },
		down : function dec(){
            return --count;
        }
	}
})();

// SingleTon Immediate Invocation

var spinner = (function (){
	var count = 0;
	return {
		up : function inc(){
            return ++count;
        },
		down : function dec(){
            return --count;
        }
	}
})();