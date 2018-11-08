function extend(o, p){
	for(var prop in p){
		o[prop] = p[prop];
	}
	return o;
}

function inherit(p){
	if (p==null) throw TypeError();
		var t = typeof p;
		if ( t !== "function" && t !== "object") throw TypeError();
			if (Object.create) return Object.create(p);
				function fn(){};
				fn.prototype = p;
				return new fn();
}

function defineSubClass(superclass, constructor, methods, statics){
	constructor.prototype = inherit(superclass.prototype);
	constructor.prototype.constructor = superclass;
	if (methods) extend(constructor.prototype, methods);
	if (statics) extend(constructor, statics);
	return constructor;
}

// We can also do this as a method of the superclass constructor
Function.prototype.extend = function(constructor, methods, statics) {
    return defineSubclass(this, constructor, methods, statics);
};