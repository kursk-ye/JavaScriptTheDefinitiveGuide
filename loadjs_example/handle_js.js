//handle_js 采用立即调用
loaderlist.getLoaderByClassname("handle_js").called = true;

loaderlist.getLoaderByClassname("handle_js").callapi = (function(){
	//按输入的判断条件(judge),作出处理(handler),如果超过制定次数(limit),就做延迟处理(timeout)
	function load_order(judge, limit, handler, timeout){
			var t = 0,
				c = null,
				stopper = function(){
					clearTimeout(c);
				},
				runner = function(){
					if( judge() ){
						handler();
						stopper();
					} else if( t > limit){
						timeout();
						stopper();
					} else {
						c = setTimeout(runner,5);
						++t;
					}
				}

				runner();
		}


	function handle_js_by_order(){
		var no_decarle_class = loaderlist.getLoadedUncall();//js文件已经下载完毕但还没有调用class
		var total_class = loaderlist.getClassTotal();
		var declared_class = loaderlist.getCalledClassTotal();		

		if ( total_class !== declared_class ) { //还有没有调用的class，有可能Js文件没有下载完，也有可能下载完毕还没有调用

			for(var i in no_decarle_class){
				var order_id = no_decarle_class[i].classorderid, //本次循环的class的加载的顺序号
					last_class =  loaderlist.getLastLoaderByOrderId(order_id); //本次循环的class的前一个需要加载的class

				if (order_id == 0){
					//window[no_decarle_class[i].classname] = no_decarle_class[i].callapi();
					// order_id == 0是handle_js文件，就是自己，所以什么也不执行
				} else {
					load_order(
						function(){					
							if (last_class.called == true && no_decarle_class[i].called == false){
								return true;
							} else {
								return false;
							}
						},

						1000,

						function(){
							window[no_decarle_class[i].classname] = no_decarle_class[i].callapi();
						},

						function(){
							//throw Error( no_decarle_class[i] + ' js file is timeout for loading, please check network');
						}
					);
				}
			}

			setTimeout(handle_js_by_order, 0); 
		}

	}

	handle_js_by_order();


}());



