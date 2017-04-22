var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

//used body-parser
app.use(bodyParser());
app.use(bodyParser.json({extended:true}));
//initialized current directory
app.use(express.static(__dirname + '/'));
//default route,later replace it for login page or some other purpose
fs.readdirSync('./myapp/controller').forEach(function(file){
	if(file.indexOf('.js'))
	var route =  require('./myapp/controller/'+file);
	route.controllerFuntion(app);

});
fs.readdirSync('./myapp/model').forEach(function(file){
	if(file.indexOf('.js'))
	  require('./myapp/model/'+file);

});




app.listen(3000,function(){
	console.log("app successfully listening to port 3000");
})
