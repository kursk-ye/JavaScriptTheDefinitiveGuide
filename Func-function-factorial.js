// Compute factorials and cache results as properties of the function itself.
//ͨ��property��ÿ�ε�ֵ��������factorial����һ��function������һ������
function factorial(n) {
    if (isFinite(n) && n>0 && n==Math.round(n)) { // Finite, positive ints only
        if (!(n in factorial))                    // If no cached result
            factorial[n] = n * factorial(n-1);    // Compute and cache it
        return factorial[n];                      // Return the cached result
    }
    else return NaN;                              // If input was bad
}
factorial[1] = 1;  // Initialize the cache to hold this base case.
factorial(5);

//�����������Ȥ֮�����ڣ����м���̱���factorial[n] �洢������
//Ҳ���Ի�һ��д������������high-order function
function memoize(f){
	var cache={};
	
	return function(){
		var key=arguments.length + Array.prototype.join.call(arguments,",");
		if (key in cache) return cache[key];
		else return cache[key] = f.apply(this,arguments);
	}
}

var factorial = memoize(function(n) {
                            return (n <= 1) ? 1 : n * factorial(n-1);
                        });
                        
factorial(5)      // => 120                        