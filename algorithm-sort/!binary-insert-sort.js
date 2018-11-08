// 从第一个元素开始，该元素可以认为已经被排序；
// 取出下一个元素，在已经排序的元素序列中二分查找到第一个比它大的数的位置；
// 将新元素插入到该位置后；
// 重复上述两步。

function binaryInsertionSort(array) {
	if (Object.prototype.toString.call(array).slice(8,-1) == "Array") {
		for (var i = 1; i < array.length; i++) {
			var key = array[i]
			   ,left = 0
			   ,right = i-1;

			while( left <= right ) {
				var middle = parseInt((left+right)/2);
				if ( array[middle] < key ) {
					left = middle+1;
				} else{
					right = middle-1;
				}
			}

			for (var j=i-1; j>=left; j--){
				array[j+1] = array[j];
			}

			array[left] = key;
 		};

 		return array;
	} else{
		return array + " isn't a array";
	};
}


var array = [9,2,4,5,6,5,3,1,0];
// var array = [1,4,1];
console.log(binaryInsertionSort(array));