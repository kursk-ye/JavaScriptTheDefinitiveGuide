/*
*execute 1
*������һ��building class,����b_height,b_address,b_cost��������
*b_height,b_address,b_cost���������ǲ�����ģ�����ÿ��instance�����Զ����Բ���ͬ
*building.build��һ��prototype object,����instance�̳й��������
*����һ��factory funtcion ������
*/
function inherit(p) {
    if (p == null) throw TypeError(); // p must be a non-null object
    if (Object.create)                // If Object.create() is defined...
        return Object.create(p);      //    then just use it.
    var t = typeof p;                 // Otherwise do some more type checking
    if (t !== "object" && t !== "function") throw TypeError();
    function f() {};                  // Define a dummy constructor function.
    f.prototype = p;                  // Set its prototype property to p.
    return new f();                   // Use f() to create an "heir" of p.
}

function building(b_height,b_address,b_cost){
	var b = inherit(building.build);
	b.b_height = b_height;
	b.b_address = b_address;
	b.b_cost = b_cost;
	
	return b;
}

building.build = {
	doBudget:function(){return this.b_cost},
	doLayFoundations:function(){return this.b_height},
	doBuild:function(){return this.b_address}	
}

var airfield = Building(100,"beijing langfangqu","2000000$")

//������constructor function д�������ͬ������

function Building(b_height,b_address,b_cost){	
	this.b_height = b_height;
	this.b_address = b_address;
	this.b_cost = b_cost;
}

Building.prototype = {
	doBudget:function(){return this.b_cost},
	doLayFoundations:function(){return this.b_height},
	doBuild:function(){return this.b_address}	
	}
	
var TrainStation = new 	Building(10,"tianjing","500000$");

/*
*execute 2
��New ���������
MDN��New�����Ľ��� https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
New������Ϊ3�����裺
(1)A new object is created, inheriting from foo.prototype.
(2)The constructor function foo is called with the specified arguments and this bound to the newly created object. new foo is equivalent to new foo(), i.e. if no argument list is specified, foo is called without arguments.
(3)The object returned by the constructor function becomes the result of the whole new expression. If the constructor function doesn't explicitly return an object, the object created in step 1 is used instead. (Normally constructors don't return a value, but they can choose to do so if they want to override the normal object creation process.
�����ܽ�Ϊ���Ȳ�����һ���µ�object,���object�̳���foo.prototype,Ȼ��this���󶨵������object(��Ϊ��prototype��object��),����constructor function Ϊ�����prototype��object����ʼ��(��ʹ��this�ؼ���)����Ȥ�ĵط��ں��桪�����constructor function ��return ��䣬��ʹ��return ��䷵�ص�object(�����Ϊ"return��object"), ����"return��object"�����prototype��object��.����һ��constructor function������return��䡣
��һ�����飬���Ƿ��ȷ���
*/
function Building(b_height,b_address,b_cost){
  var f = function(){}		
	f.b_height = b_height; //����ʹ��f,������this,��Ϊthisָ���ˡ�prototype��object��
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


station.doBudget;  //undefined,˵��û��������ԣ�˵��"return��object"��ȷ�����prototype��object��.

/*
*execute 3
*����execute 1�ĵڶ����ִ����������û������contructor,prototype֮��Ĺ�ϵ����ΪBuilding.prototype�в�û��constructor property,
*���Լ̳���Building.prototype��instance objectҲ������constructor property,������������Ӹ�Ϊ����
*/
function Building(b_height,b_address,b_cost){	
	this.b_height = b_height;
	this.b_address = b_address;
	this.b_cost = b_cost;
}

Building.prototype = {
	constructor:Building,   //����constructor property
	doBudget:function(){return this.b_cost},
	doLayFoundations:function(){return this.b_height},
	doBuild:function(){return this.b_address}	
	}
	
var TrainStation = new 	Building(10,"tianjing","500000$");

TrainStation.constructor === Building
