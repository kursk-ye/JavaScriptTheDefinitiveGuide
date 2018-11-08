function inherit(p){
	if (p == null) throw TypeError();
		var t = typeof p;
		if ( t !== "object" && t !== "function")	throw TypeError();
			if (Object.create) Object.create(p);
				function fn(){};
				fn.prototype = p;
				return new fn();
}

function filterSetSubclass(superclass, filter){
	var constructor = function(){
		superclass.apply(this, arguments);
	}

	var proto = constructor.prototype = inherit(superclass.prototype);
	proto.constructor = constructor;
	constructor.superclass = superclass;

	//override add method of superclass
	proto.add = function(){
		for(var i=0; i<arguments.length; i++){
			if (filter(arguments[i])) throw "arguments refused by filter";
			superclass.prototype.add.apply(this, arguments[i]);
		}
	}
	return constructor;
}