loaderlist.getLoaderByClassname("Grandson").callapi = function(){
	function Grandson(){
		this.level = "Grandson";
		this.favorite = "apple"
	};

	methods = {
		doHobby: function(){ console.log(this.level + "'s hobby is swimming"); }
	};

	statics = {
	};

	//说明该类的函数体已经调用
	loaderlist.getLoaderByClassname("Grandson").called = true;

	console.log("Grandson is called");

	return Father.extend(Grandson, methods, statics);
}

//说明该类的文件已经下载完
loaderlist.getLoaderByClassname("Grandson").loaded = true;