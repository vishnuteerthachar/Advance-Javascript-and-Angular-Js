function add(x,y){
    function praseArg(n){
        if(Array.isArray(n)) return add.apply(this,n)
         if(typeof n ==='function') return praseArg(n());
         return isNaN(n) ? 0 : parseInt(n,10);
    }
/*  var result = 0;
    for(var index=0, count=arguments.length; index < count; index ++){
        result += praseArg(arguments[index]);
    }
    return result;
  */  
    return arguments.length<=1 ? praseArg(arguments[0]) : praseArg(arguments[0]) + add([].slice.call(arguments,1))

}