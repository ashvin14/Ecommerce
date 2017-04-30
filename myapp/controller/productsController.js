//before that it checks basic authentication 
//this controller will save the product 
//get all products to display in #/products
//it will also give access to view single products

var isLoggedIn = require('./../middlewares/isloggedin');
var passport = require('passport');
var express = require('express');
var mongoose = require('mongoose');
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




    productsRouter.get('/products', isLoggedIn.check, function(req, res) {
        productModel.find({}, function(err, result) {
            if (err) throw err;
            else
                res.json(result);
        })



    })




    app.use('/Ecommerce', productsRouter);
}
