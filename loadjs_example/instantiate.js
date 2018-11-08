loaderlist.getLoaderByClassname("Instantiate").callapi = function(){
	yeye = new Grandfather;

	kursk = new Father;

	baobao =  new Grandson;

	//说明该类的函数体已经调用
	loaderlist.getLoaderByClassname("Instantiate").called = true;
}

//说明该类的文件已经下载完
loaderlist.getLoaderByClassname("Instantiate").loaded = true;