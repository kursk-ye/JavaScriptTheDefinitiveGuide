(function(){
	/*
	 * 提供继承父类的方法，并设置为Function.prototype.extend方法
	 */

	//将第二个参数的所有property复制到第一个参数对象上
	function extend(o ,p){
		for (var prop in p) o[prop] = p[prop];
		return o;
	}

	//返回继承 p 所有property的一个对象
	function inherit(p){
		if (p == null)	throw Error(p + " is null!");
		var t = typeof p;
		if ( t !== "object" && t !== "function") throw Error( p + " isn't object or function");
		if ( Object.create ) return Object.create(p);
			function fn(){};
			fn.prototype = p;
			return new fn();
	}

	//定义一个子类
	//如果methods存在，就增加到这个子类上，作为实例的方法或属性;
	//如果statics存在，就作为子类静态的方法或属性
	function defineSubclass(superclass, subclass, methods, statics){
		subclass.prototype = inherit(superclass.prototype);
		subclass.prototype.constructor = subclass;
		subclass.prototype.superclass = superclass;

		if(methods) extend(subclass.prototype, methods);
		if(statics) extend(subclass, statics);

		return subclass;
	}

	//使所有的function对象都具有extend子类的方法
	Function.prototype.extend = function(subclass, methods, statics){
		return defineSubclass(this, subclass, methods, statics);
	}

	/*加载指定的Js文件*/

	//产生一个script元素并增加到head下
	function ajax_url(url){
		var script_elm = document.createElement('script');
		script_elm.setAttribute('src', url);
		script_elm.setAttribute('type', 'text/javascript');

		document.head.appendChild(script_elm);
	}

	//加载所有的js文件
	//jsfiles 对象格式{Classname: file path}，存储所有需要加载的js文件路径	
	function load_all_js(jsfiles){
		for ( var js in jsfiles)	ajax_url(jsfiles[js]);	
	}

	/*utilities function*/

	// Make the named (or all) properties of o nonenumerable, if configurable.
	function hideProps(o) {
	    var props = (arguments.length == 1)              // If 1 arg
	        ? Object.getOwnPropertyNames(o)              //  use all props
	        : Array.prototype.splice.call(arguments, 1); //  else named props
	    props.forEach(function(n) { // Hide each one from the for/in loop
	        // Ignore nonconfigurable properties
	        if (!Object.getOwnPropertyDescriptor(o,n).configurable) return;
	        Object.defineProperty(o, n, { enumerable: false });
	    });
	    return o;
	}

	/*Loader*/
	/*	
	 * Loader是用来判断js文件加载情况，class执行情况的类
	 * loaded js文件已经加载为true,否则为false
	 * classname js文件对应的类名,string类型
	 * classorderid js文件对应的加载顺序号,不能重复
	 * called js文件加载后，对应的class是否已经执行函数体，是为true，否则为false
	 * src 对应js文件的路径
	 * callapi 对应的class对象
	*/
	Loader = function(classname, classorderid, src){
		if ( classname == undefined|| classorderid== undefined || src== undefined) 
			throw Error("classname, classorderid, src not be null");

	    this.loaded = false ;
	    this.classname = classname ? classname : "classname";
	    this.classorderid = classorderid;
	    this.called = false ;
	    this.src = src ? src : "";
	    this.callapi = null;
	};

	Loader.prototype.constructor = Loader;

	/*Loaderlist*/

	Loaderlist =  function(){};

	Loaderlist._v2s = function(val){
	    switch(val){
	        case undefined: return 'u';
	        case null: return 'n';
	        case true: return 't';
	        case false: return 'f';
	        default: switch(typeof val){
	            case 'number': return '#' + val;
	            case 'string': return '"' + val;
	            default: return '@' + objectId(val);
	        } 
	    }

	    function objectId(o){
	        var prop = "|**objectid**|";
	        if(!o.hasOwnProperty(prop))
	            o[prop]=Loaderlist._v2s.next++;
	        return o[prop];
	    }
	}

	Loaderlist._v2s.next = 100;

	
	Loaderlist.prototype = hideProps({
	    //根据顺序号返回对应的loader对象
	    getLoaderByOrderId: function(orderid){ 
	    for (var i in this){
	        if (this[i].classorderid == orderid) return this[i];
	        }
	    },
	    //根据顺序号返回上一个应该先加载的loader对象
	    getLastLoaderByOrderId: function(orderid){
	    for (var i in this){
	        if (this[i].classorderid == (orderid - 1) ) return this[i];
	        }
	    },
	    //根据类名返回对应的loader对象
	    getLoaderByClassname: function(classname){
	    for (var i in this){
	        if (this[i].classname == classname ) return this[i];
	        }
	    },
	    //返回一个数组，由已经加载完(loaded==true),但还没有调用完毕(called==false)的loader对象组成
	    getLoadedUncall: function(){
	    	var arr = [];
	    	for (var i in this){
	    		if (this[i].loaded == true && this[i].called == false) arr.push(this[i]);
	    	}
	    	return arr;
	    },
	    //增加一个loader到list
	    add: function(){
	    for(var i=0; i<arguments.length; i++){
	        var val = arguments[i];
	        var str = Loaderlist._v2s(val);
	        if(!this.hasOwnProperty[str]){
	            this[str]=val;
	        }
	    }

	    return this;
	    },
	    //返回已经加载了js文件的class的总数
	    getLoadedClassTotal: function(){
	    var t = 0;
	    for (var i in this){
	        if (this[i].loaded) ++t;
	        }

	    return t;
	    },
	    //返回已经调用了class声明函数体的class的总数
	    getCalledClassTotal: function(){
	    var t = 0;
	    for (var i in this){
	        if (this[i].called) ++t;
	    }

	    return t;
	    },
	    //返回所有应该加载class的总数
	    getClassTotal: function(){
	    var t = 0;
	    for (var i in this) ++t;

	    return t;
	    },
	    //返回一个数组，包括了所有应该加载的class的src
	    getSrc: function(){
	    var arr = [];
	    for (var i in this) arr.push(this[i].src);

	    return arr;
	    }
	});

	//handle_js.js用户按顺序号调用class,所以单独加载
	ajax_url("handle_js.js");

	loaderlist = new Loaderlist;
	/*	
	 * 按顺序加载JS文件，注意顺序号不能重复,必须连续
	*/
	loaderlist.add(new Loader("handle_js", 0, "handle_js.js"));
	loaderlist.add(new Loader("Grandfather", 1, "ghsj_js/Grandfather.js"));
	loaderlist.add(new Loader("Father", 2, "ghsj_js/Father.js"));
	loaderlist.add(new Loader("Grandson", 3, "ghsj_js/Grandson.js"));
	//如果有必要可以增加实例化的文件
	loaderlist.add(new Loader("Instantiate", 4, "instantiate.js"));

	//存储js文件的路径
	var jsfiles = loaderlist.getSrc();
	
	load_all_js(jsfiles);



}());

