/*[1]what's result?*/
var marty = {
    firstName: "Marty",
    lastName: "McFly",
    timeTravel: function(year) {
        console.log(this.firstName + " " + this.lastName + " is time traveling to " + year);
    }
};

var getBackInTime = marty.timeTravel;

getBackInTime(2014);

/*[2]what console print when button be clicked?*/
<html>
	<head>
	</head>
	<body>
		<button id="btn">click me</button>
	</body>
	<script>
		var marty = {
    firstName: "Marty",
    lastName: "McFly",
    timeTravel: function() {
        console.log(this.firstName + " " + this.lastName + " is time traveling to ");
    		}
		};
		
		var flux = document.getElementById("btn");
		//flux.addEventListener("click", marty.timeTravel);
		flux.onclick = marty.timeTravel;
	</script>
</html>


/*[3]*/
var s = "test";         // Start with a string value.
s.len = 4;              // Set a property on it.
var t = s.len;          // what's value of 't'?

/*[4]*/
function f(y,z) { return this.x + y + z };  // Another function that adds
var g = f.bind({x:1}, 2);                   // Bind this and y
g(3)         // what's result?


/*[5] scope chain */
var msg;

function fn(msg){			
	fn_g = function(){
		console.log(msg);
	};
}

fn('local');

msg = 'global';

(function (){
	window['fn_g']();
})();                   // what's printed?


/*[13] callback function */
function fn1(cb){
	var fn1_var = "callback";
	cb();	
}

function fn2(){
	function cb(){
		console.log(fn1_var);
	}

	fn1(cb);
}

fn2(); //what's print in console?

/*[6]new Operate*/
function Building(b_height,b_address,b_cost){
  var f = function(){}		
	f.b_height = b_height; //
	f.b_address = b_address;
	f.b_cost = b_cost;
	
	return f;
}

Building.prototype = {
	doBudget:function(){return this.b_cost},
	doLayFoundations:function(){return this.b_height},
	doBuild:function(){return this.b_address}	
	}
	
var station = new 	Building(10,"tianjing","500000$");

station.b_height;  //what's result?
station.doBudget;  //what's result?

/*
*[7]click button then button element'interhtml display element's NO
*how to modify below code?
*/
<html>
	<head>
	</head>
	<body>
		<button class="myClass">button1</button><br>
		<button class="myClass">button2</button><br>
		<button class="myClass">button3</button><br>
	</body>	
<script type="text/javascript" >
var elems = document.getElementsByClassName("myClass"), 
            i; 
for (i = 0; i < elems.length; i++) {
    elems[i].addEventListener("click", function () {
        "use strict";
        this.innerHTML = i; 
    });
}
</script>
</html>

//[8]how to write code to return different value?
function constfuncs() {
    var funcs = [];
    for(var i = 0; i < 10; i++)
       funcs[i] = function() { return i; };
    return funcs;
}
var funcs = constfuncs();
funcs[5]()    // What does this return? 

/*
 * [9]
 * how to add a new methoed to object_o and keep origin method ? 
 * e.g follow code:
 * object_o.p()   // return 1
 * how to code method to return 2 1
 */
var object_o = {p:function(){return 1;}};

//answer:
function trace(o,m){
	var origin = o[m];
	o[m] = function(){
		var result = origin.apply(this,arguments);
		console.log('2');
		return result;
	};
}

trace(object_o,'p');

/* 
 * [10]
 * regular expression
 * can you implement follow code with RegExp constructor ?
 */
var url = /(\w+):\/\/([\w.]+)\/(\S*)/;
var text = "Visit my blog at http://www.example.com/~david";
var result = text.match(url);
if (result != null) {
    var fullurl = result[0];   // what's value
    var protocol = result[1];  // what's value
    var host = result[2];      // what's value
    var path = result[3];      // what's value
}

/*[11]*/
describe order of events of browser and verification:
[1]  document.DOMContentLoaded
[2]  document.readystatechange.loading
[3]  document.readystatechange.interactive
[4]  document.readystatechange.complete
[5]  window.load

/* code */
function display_loadOrder(msg){
	console.log(msg);
}

if (document.addEventListener) {
	document.addEventListener("DOMContentLoaded", function(){ var msg = 'DOMContentLoaded' ; display_loadOrder(msg); } , false);
	document.addEventListener("readystatechange", function(){ var msg = document.readyState ; display_loadOrder(msg); } , false);
	window.addEventListener("load", function(){ var msg = 'window.load' ; display_loadOrder(msg); } , false);
}

/* 
 * [12] 
 * server exchange a decimal number to Hexadecimal number
 * how to coding client code to return number from server in order?
 * not modify my API
 * try to faster on performance
 */
 
 //server code
 <?php
$dec = $_GET["n"];
$cb = $_GET["callback"];
$hex = dechex($dec);
header("HTTP/1.1 200 Ok");
header("Content-type:text/javascript");
echo $cb . '("' . $hex . '")';
?>

//client API
function xss_ajax(url, callback)
{
	var script_id = null;
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', url);
	script.setAttribute('id', 'coolshell_script_id');

	script.onload = script.onreadystatechange = function(){
		if((!this.readyState || this.readyState === "loaded" || this.readyState === "complete")){
			callback && callback();
		}
	};

	script_id = document.getElementById('coolshell_script_id');
	if(script_id){
		document.getElementsByTagName('head')[0].removeChild(script_id);
	}

	// Insert <script> into DOM
	document.getElementsByTagName('head')[0].appendChild(script);
}


function xss_rpc_call(n, callback)
{
	var callbackName="xss_rpc_callback"  + Math.round(Math.random() * 10000);
	var url = "http://127.0.0.1/exchange.php?n=" + n + "&callback=" + callbackName;
	xss_ajax(url);

	window[callbackName] = function(result){
		var timeout = Math.round(Math.random() * 1000)
		callback && setTimeout( function(){callback(result);}, timeout );
		//callback && callback(result) ;
	}
}


/* your code .....*/



/*
 * [13] debug mergeSort code
 * what's wrong with follow code?
 */

function mergeSort(arr, p, r){
  if (p<r){
    var q = Math.floor((p+r)/2);
    mergeSort(arr, p, q);
    mergeSort(arr, q+1, r);
    merge(arr, p, q, r);
  }
}

function merge(arr, p, q, r){
  var m = n = 0,
      left = right = [],
      n1 = q-p+1,
      n2 = r-q;

  for(var i=0; i<n1; i++){
    left[i] = arr[p+i];
  }

  for(var j=0; j<n2; j++){
    right[j] = arr[q+1+j];
  }

  left[n1] = right[n2] = Number.MAX_VALUE;

  for(var k=p; k<=r; k++){
    if (left[m]<right[n]){
      arr[k] = left[m];
      m++;
    } else {
      arr[k] = right[n];
      n++;
    }
  }
}


var array = [6,1,23,6,3,5,7,11,3,10,98,8,3],
    array_sorted=[array.length];
console.log(array);
mergeSort(array, 0, (array.length-1));












