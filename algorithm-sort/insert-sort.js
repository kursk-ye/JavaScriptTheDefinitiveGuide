/**
 * 从第一个元素开始，该元素可以认为已经被排序；
 * 取出下一个元素，在已经排序的元素序列中从后向前扫描；
 * 如果该元素（已排序）大于新元素，将该元素移到下一位置；
 * 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
 * 将新元素插入到该位置后；
 * 重复步骤2~5。
 **/

function insert_sort(array){
	if (Object.prototype.toString.call(array).slice(8,-1) == "Array") {
		for (var i = 0; i < array.length; i++) {
			var key = array[i];
			var j = i - 1;
			while ( j>=0 && array[j]>key ) {
				array[j+1] = array[j];
				j--;
			}
			array[j+1] = key;
		};
		return array;
	} else{
		return array + "is not a array";
	};
}

///////////////////////////////
//var array = [0,1,2,3,4,5]; //
//var array = [5,4,3,2,1,0]; //
//var array = [0,2,1,3,5,4]; //
///////////////////////////////
var array = [1,1,3,2,1,5];
console.log(insert_sort(array));