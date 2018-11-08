loaderlist.getLoaderByClassname("Grandfather").callapi = function(){
	var Grandfather = function(){
		this.level = "Grandfather";
		this.favorite = "banana"
	};

	Grandfather.prototype.showLevel = function(){console.log(this.level);};
	Grandfather.prototype.doHobby = function(){ console.log( this.level + "'s hobby is Poker"); };
	Grandfather.prototype.eat = function(){ console.log(this.level + " like eat " + this.favorite); };

	Grandfather.prototype.constructor = Grandfather;

	//说明该类的函数体已经调用
	loaderlist.getLoaderByClassname("Grandfather").called = true;

	console.log("Grandfather is called");

	return Grandfather;
}

//说明该类的文件已经下载完
loaderlist.getLoaderByClassname("Grandfather").loaded = true;


