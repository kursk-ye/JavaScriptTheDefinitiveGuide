// $('body form table div img').attr('src','clock.jpg');
// class="l-right-col"
// $('div').addClass(function(n){return "div"+n;});
//$('#fontdiv').removeClass("font-red");

function bubble_sort(array){
	var length = array.length
	   ,temp;
	for(var i=0; i<length; i++) {
		for(var j=length-1; j>i; j--){
			if (array[i]>array[j]){
				temp = array[i];
				array[i] = array[j];
				array[j] = temp;
			}
		}
	}

	return array;
}

var array = [2,34,5,90,12,87,0,23,76,34,15,23,12];

document.write("<p>" + array);
document.write("<p>" + bubble_sort(array));


