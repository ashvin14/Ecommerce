var express = require('express');
var mongoose = require('mongoose');
var productModel = require('./../model/products');
var ObjectId = mongoose.Types.ObjectId;
//db is created with products as collection
mongoose.connect('mongodb://localhost/users');

mongoose.connection.once('open',function(err){
	if(err)throw err;
	console.log("successfully connected to database!");
})

var productsRouter = express.router();
module.exports.controllerFunction = function(app){


	app.use('Ecommerce',productsRouter);
}