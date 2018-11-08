/*
*通过new operate生成的object以后，prototype再增加一个方法，为什么这个已经生成object会有这个方法?
*Answer:prototype chain
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
    	
    var Station = new 	Building(10,"new york","500000$"); //生成object TrainStation
    
    Building.prototype.doEraser = function(){this.b_height = 0, this.b_address = '', this.b_cost = '';}
    
    Station.doEraser();  //为什么已经生成的object TrainStation会有Building.prototype在object TrainStation 生成后再添加的方法？
    
    TrainStation.b_address;   //"" 方法的确有作用
    
