var bodyParser= require('body-parser');
var mongoose=require('mongoose');


// connect to the database
mongoose.connect('mongodb://test:divyang2401@ds213513.mlab.com:13513/mytodo');

// create a schema
var todoschema= new mongoose.Schema({
	item:String
});
var Todo=mongoose.model('Todo',todoschema);
/*var itemOne=Todo({item:'buy flowers'}).save(function(err){
	if(err) throw err;
	console.log('item saved');
});*/


//var data=[{item:'get milk'},{item: 'walk dog'},{item:'kick some coding ass'}];
var urlencodedParser=bodyParser.urlencoded({extended:false});

module.exports= function(app){

app.get('/todo',function(req,res){
	// get data from mongodb and pass it to view
	Todo.find({}, function(err,data){
		if(err) throw err;
	res.render('todo',{todos:data});	
	});
});	

app.post('/todo',urlencodedParser,function(req,res){
	//get data fro the view and add it mongodb
	var newTodo=Todo(req.body).save(function(err,data){
		if(err) throw err;
		res.json(data);
	});
});	

app.delete('/todo/:item',function(req,res){
	// delete the requested item from mongodb
	Todo.find({item:req.params.item.replace(/\-/g,' ')}).remove(function(err,data){
		if(err) throw err;
		res.json(data);
	});
});
	/*
	data=data.filter(function(todo){
	return todo.item.replace(/ /g,'-') !== req.params.item;
	});
	res.json(data);	
});	*/

}

