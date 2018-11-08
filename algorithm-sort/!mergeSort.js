function mergeSort(arr, p, r){
  if(p<r){
    var q = Math.floor((p+r)/2);
    mergeSort(arr, p, q);
    mergeSort(arr, q+1, r);
    merge(arr, p, q, r);
  }
}

function merge(arr, p, q, r){
  var n1 = q - p + 1,
      n2 = r - q,
      left = [],
      right = [],
      m = n = 0;

  for(var i=0; i<n1; i++){
    left[i]=arr[p+i];
  }

  for(var j=0; j<n2; j++){
    right[j]=arr[q+1+j];
  }

  left[n1]=right[n2]=Number.MAX_VALUE;

  for(var k=p; k<=r; k++){
    if (left[m]<right[n]){
      arr[k]=left[m];
      m++;
    } else {
      arr[k]=right[n];
      n++;
    }
  }
}