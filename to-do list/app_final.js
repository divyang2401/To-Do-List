var express= require('express');
var todocontrollers=require('./controllers/todocontrollers');
var app= express();

//setup view engine
app.set('view engine','ejs');

//static files
app.use(express.static('./public'));

//fire controllers
todocontrollers(app);

//listen to port
app.listen(3000);
console.log('You are listening to port 3000');
