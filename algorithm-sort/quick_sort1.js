// 从数列中挑出一个元素，称为 "基准"（pivot）；在此算法中必须是最右边的元素
// 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。
// 在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
// 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。

function quick_sort1(array,left,right){
	if (left<=right){
		var x = array[right]
		   ,i = left - 1
		   ,temp;
		for ( var j=left; j<=right; j++){
			if (array[j]<=x) {
				i++;
				temp = array[j];
				array[j] = array[i];
				array[i] = temp;
			}
		}

		quick_sort1(array,left,i-1);
		quick_sort1(array,i+1,right);
	}
}

var array = [2,34,5,90,12,87,0,23,76,34,15,23,12,2];

document.write("<p>" + array);
quick_sort1(array,0,(array.length-1));
document.write("<p>" + array);


