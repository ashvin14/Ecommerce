


var isLoggedIn = require('./../middlewares/isloggedin');
var passport = require('passport');
var express = require('express');
var mongoose = require('mongoose');
var productModel = require('./../model/products');
var ObjectId = mongoose.Types.ObjectId;
//db is created with products as collection
mongoose.createConnection('mongodb://localhost/users');

mongoose.connection.once('open',function(err){
	if(err)throw err;
	console.log("successfully connected to database!");
})

var productsRouter = express.Router();




module.exports.controllerFunction = function(app){
	



	productsRouter.get('/products',isLoggedIn.check,function(req,res){
		res.send('look at products ');
		
		
	})




	app.use('/Ecommerce',productsRouter);
}