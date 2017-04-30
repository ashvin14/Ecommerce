var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var logger = require('morgan');
var cookieParser= require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
 app.use(cookieParser());

        app.use(session({
            secret: 'keyboard cat',
            resave: true,
            httpOnly: false,
            saveUninitialized: true
        }));











        app.use(passport.initialize());
        app.use(passport.session());

/*app.use(session({

}))
*/




 


app.use(logger('dev'));
//used body-parser
app.use(bodyParser());
app.use(bodyParser.json({extended:true}));
//initialized current directory
//app.use(express.static(__dirname + '/'));

//intialized in my directory
app.use('/Ecommerce',express.static(__dirname + '/frontEnd/'));
//default route,later replace it for login page or some other purpose
//to check

fs.readdirSync('./myapp/controller').forEach(function(file){
	if(file.indexOf('.js'))
	var route =  require('./myapp/controller/'+file);
	route.controllerFunction(app);

});
fs.readdirSync('./myapp/model').forEach(function(file){
	if(file.indexOf('.js'))
	  require('./myapp/model/'+file);

});




app.listen(3000,function(){
	console.log("app successfully listening to port 3000");
})
