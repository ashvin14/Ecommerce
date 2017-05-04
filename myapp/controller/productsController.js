//before that it checks basic authentication 
//this controller will save the product 
//get all products to display in #/products
//it will also give access to view single products

var isLoggedIn = require('./../middlewares/isloggedin');
var passport = require('passport');
var express = require('express');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var productModel = require('./../model/products');
var ObjectId = mongoose.Types.ObjectId;
//db is created with products as collection
mongoose.createConnection('mongodb://localhost/Ecommerce');

mongoose.connection.once('open', function(err) {
    if (err) throw err;
    console.log("successfully connected to database!");
})

var productsRouter = express.Router();




module.exports.controllerFunction = function(app) {

var functionToStoreProductDetails = function(){
    	return new Promise(function(resolve,reject){


    		var product = new productModel({
    		category:req.body.category,
    		description:req.body.description,
    		admin : functionTogetAdminById(id),
    		uploadedTime:new Date(),
    		cost:req.body.cost
    		
    	})

    		product.save(function(err,result){
    			if(err)throw err;
    			else
    				resolve(result);
    		})




    	})

    }




var functionToUpdUpdateAdminsProductUploaded=function(result){
	return new Promise(function(resolve,reject){
		console.log(result);

	})
}
















    productsRouter.get('/products', isLoggedIn.check, function(req, res) {
        productModel.find({}, function(err, result) {
        	console.log("products");
        	console.log(result);
            if (err) throw err;
            if(result.length == 0)
            	res.status(200).json({products:0})
            else
                res.status(200).json({products:result});
        })
        



    })
    productsRouter.post('/product/upload',isLoggedIn.check,function(){







    });



    app.use('/Ecommerce', productsRouter);
}
