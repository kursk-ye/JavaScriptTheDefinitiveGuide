loaderlist.getLoaderByClassname("Father").callapi = function(){
	function Father(){
		this.level = "Father";
		this.favorite = "orange"
	};

	methods = {
		doHobby: function(){ console.log( this.level + "'s hobby is Glof"); },
		run: function(){ console.log( this.level + " running is fast!" ); },
		sayHello: function(){ console.log( this.level + " say hello");}
	};

	statics = {
		_secret: function(){ console.log("this Father's Class statics methods");}
	};


	//说明该类的函数体已经调用
	loaderlist.getLoaderByClassname("Father").called = true;

	console.log("Father is called");
	
	return Grandfather.extend(Father, methods, statics);
}

//说明该类的文件已经下载完
loaderlist.getLoaderByClassname("Father").loaded = true;


