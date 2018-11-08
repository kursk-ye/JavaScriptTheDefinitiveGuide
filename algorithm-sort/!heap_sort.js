/*方法说明：堆排序

1）算法简介

堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值
或索引总是小于（或者大于）它的父节点。

2）算法描述和实现

具体算法描述如下：

将初始待排序关键字序列(R1,R2....Rn)构建成大顶堆，此堆为初始的无序区；
将堆顶元素R[1]与最后一个元素R[n]交换，此时得到新的无序区(R1,R2,......Rn-1)和新的有序区(Rn),且满足R[1,2...n-1]<=R[n]；
由于交换后新的堆顶R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,......Rn-1)调整为新堆，然后再次将R[1]与无序区最后一个元素交换，
得到新的无序区(R1,R2....Rn-2)和新的有序区(Rn-1,Rn)。不断重复此过程直到有序区的元素个数为n-1，则整个排序过程完成。

@param  array 待排序数组*/           
function heapSort(array){
	var temp,
		heapSize=array.length;

	for(var i=Math.floor(heapSize/2); i>=0; i--){
		heapify(array, i, heapSize);
	}

	for(var j=heapSize-1; j>=0; j--){
		temp=array[0];
		array[0]=array[j];
		array[j]=temp;
		heapify(array, 0, --heapSize);
	}
}

/*方法说明：维护堆的性质
@param  arr 数组
@param  x   数组下标
@param  len 堆大小*/
function heapify(arr, x, len){
	var l = x * 2,
		r = x * 2 + 1,
		largest = x,
		temp;

	if ( l<len && arr[l]>arr[largest] ) largest=l;
	if ( r<len && arr[r]>arr[largest] ) largest=r;

	if ( x!==largest ){
		temp=arr[x];
		arr[x]=arr[largest];
		arr[largest]=temp;
		heapify(arr, largest, len);
	}
}

var array = [5,4,6,0,2,3,1,7];

console.log(array);
heapSort(array);
console.log(array);


