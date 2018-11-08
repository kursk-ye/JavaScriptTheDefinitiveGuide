/*
*execute 1
*创建了一个building class,它有b_height,b_address,b_cost三个属性
*b_height,b_address,b_cost三个属性是不共享的，这样每个instance的属性都可以不相同
*building.build是一个prototype object,用于instance继承共享的属性
*这是一个factory funtcion 的例子
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

//下面用constructor function 写法完成相同的内容

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
对New 操作的理解
MDN对New操作的解释 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
New操作分为3个步骤：
(1)A new object is created, inheriting from foo.prototype.
(2)The constructor function foo is called with the specified arguments and this bound to the newly created object. new foo is equivalent to new foo(), i.e. if no argument list is specified, foo is called without arguments.
(3)The object returned by the constructor function becomes the result of the whole new expression. If the constructor function doesn't explicitly return an object, the object created in step 1 is used instead. (Normally constructors don't return a value, but they can choose to do so if they want to override the normal object creation process.
可以总结为，先产生了一个新的object,这个object继承了foo.prototype,然后this被绑定到这个新object(称为“prototype新object”),调用constructor function 为这个“prototype新object”初始化(须使用this关键字)。有趣的地方在后面——如果constructor function 有return 语句，则使用return 语句返回的object(这里称为"return新object"), 并用"return新object"替代“prototype新object”.但是一般constructor function不会有return语句。
做一个试验，看是否的确如此
*/
function Building(b_height,b_address,b_cost){
  var f = function(){}		
	f.b_height = b_height; //这里使用f,而不是this,因为this指向了“prototype新object”
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


station.doBudget;  //undefined,说明没有这个属性，说明"return新object"的确替代“prototype新object”.

/*
*execute 3
*但是execute 1的第二部分代码这个例子没有体现contructor,prototype之间的关系，因为Building.prototype中并没有constructor property,
*所以继承至Building.prototype的instance object也不会有constructor property,所以下面的例子更为完整
*/
function Building(b_height,b_address,b_cost){	
	this.b_height = b_height;
	this.b_address = b_address;
	this.b_cost = b_cost;
}

Building.prototype = {
	constructor:Building,   //增加constructor property
	doBudget:function(){return this.b_cost},
	doLayFoundations:function(){return this.b_height},
	doBuild:function(){return this.b_address}	
	}
	
var TrainStation = new 	Building(10,"tianjing","500000$");

TrainStation.constructor === Building
