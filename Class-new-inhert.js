/*
*ͨ��new operate���ɵ�object�Ժ�prototype������һ��������Ϊʲô����Ѿ�����object�����������?
*Answer:prototype chain
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
    	
    var Station = new 	Building(10,"new york","500000$"); //����object TrainStation
    
    Building.prototype.doEraser = function(){this.b_height = 0, this.b_address = '', this.b_cost = '';}
    
    Station.doEraser();  //Ϊʲô�Ѿ����ɵ�object TrainStation����Building.prototype��object TrainStation ���ɺ�����ӵķ�����
    
    TrainStation.b_address;   //"" ������ȷ������
    
