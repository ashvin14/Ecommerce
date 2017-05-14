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
//to get files from server like png,jpg
var multer = require('multer');
var fs = require('fs')
var upload = multer({ dest: 'uploads/' })
var ObjectId = mongoose.Types.ObjectId;
var userModel = require('./../model/users');


//db is created with products as collection
mongoose.createConnection('mongodb://localhost/Ecommerce');

mongoose.connection.once('open', function(err) {
        if (err) throw err;
        console.log("successfully connected to database!");
    })
    //gridFs to send image to client



var productsRouter = express.Router();


//make a comment Schema
//make an uri to  update and  delete a product
//make an uri to add comments on prouduct
//make an uri to make changes to udpate users db according to purchase or sold products
// make an uri to recieve and update products rating 
//make an uri such that when someone leaves a comment it updates the respective collection
// and shows in frontEnd

module.exports.controllerFunction = function(app) {
    var functionTogetAdminById = function() {
        return Request.session.user._id;
    }
    var functionToConvertBinImgToBase64 = function(result) {
        var ResponseToSend = {};
        ResponseToSend.product = [];
        ResponseToSend.imgbase64 = [];
        var thumb = [];
        for (var i in result) {
            ResponseToSend.product[i] = result[i];
            thumb = new Buffer(result[i].images[0].data).toString('base64');
            ResponseToSend.imgbase64[i] = thumb;


        }
        return ResponseToSend;
    }
    var functionToStoreProductInDatabase = function(req, res) {





        return new Promise(function(resolve, reject) {

            if (req.files) {
                Request.files = req.files;
                res.json({});


            }

            if (req.body.category) {

                Request.session = req.session;
                Request.body = req.body;
               
                    //functionToStoreProductDetails.then(functionToUpdUpdateAdminsProductUploaded)

                var product = new productModel({
                    category: Request.body.category,
                    description: Request.body.description,
                    admin: functionTogetAdminById(Request),
                    uploadedTime: new Date(),
                    cost: Request.body.cost,
                    images: {
                        orignalname: Request.body.images.orignalname,
                        data: fs.readFileSync('uploads/' + Request.files[0].filename),
                        contentType: 'image/png'

                    },



                })

                resolve(product)


            }





        });


    }

    var storeInDb = function(product) {


        return new Promise(function(resolve, reject) {
            product.save(function(err, result) {
                if (err) throw err;
                else
                    resolve(result)
            })





        })

    }





    var Request = {}


    //write a function to get name by giving id
    var functionToGetNameById = function(id) {
        // input :-id
        //output:-name


        return new Promise(function(resolve, reject) {
            userModel.find({ _id: ObjectId(id) }, function(err, profile) {
                if (err) throw err;
                resolve(profile)


            })








        })


    }

    //function to add ratings to product
    var findAvgRating = function(ratings) {
            var sum = 0;
            ratings.forEach(function(element) {

                sum = sum + element;

            })
            sum = sum / ratings.length;
            return sum;
        }
        //write from here
        //from userModel
    var functionToGetIdOfCurrentUser = function(user) {
        return new Promise(function(resolve, reject) {
            userModel.find({ firstName: user.firstName }, function(err, result) {
                if (err) throw err;
                else
                    resolve(result)
            })
        })

    }




    productsRouter.get('/products', isLoggedIn.check, function(req, res, next) {
        productModel.find({}, function(err, result) {


            if (err) throw err;
            if (result.length == 0) {
                res.status(200).json({ products: 0 })

            } else {
               

                var product = functionToConvertBinImgToBase64(result);
                res.send(product);
            }



        })




    })
    productsRouter.post('/product/upload', upload.any(), isLoggedIn.check, function(req, res) {

        functionToStoreProductInDatabase(req, res).then(storeInDb).then(function(response) {
            res.json(response)
        })



    });
    productsRouter.get('/product/:id', isLoggedIn.check, function(req, res) {
        if (req.params.id)
            productModel.find({ _id: ObjectId(req.params.id) }, function(err, result) {
                if (err) throw err;
                else {

                    
                    var Result = functionToConvertBinImgToBase64(result)
                    functionToGetNameById(Result.product[0].admin).then(function(profile) {

                        res.json({ 'Result': Result, 'currentUser': req.session.user, 'admin': profile });

                    })

                }
            })
    })


    productsRouter.delete('/product/delete/:id', function(req, res) {
        productModel.deleteOne({ _id: ObjectId(req.params.id) }, function(err, product) {
            if (err) throw err;


            else
                res.json({ 'deleted': true });
        })
    })
    productsRouter.put('/product/edit/', function(req, res) {
        productModel.findOneAndUpdate({ _id: req.body.productId }, {
            $set: {
                category: req.body.category,
                description: req.body.description,
                cost: req.body.cost,


            }
        }, function(err, product) {
            res.json(product)
        })




    })
    productsRouter.post('/product/comment/', function(req, res) {

       
        functionToGetIdOfCurrentUser(req.session.user).then(function(profile) {

            return new Promise(function(resolve, reject) {
                
                var comment = {
                    commentUploaderId: ObjectId(profile[0]._id),
                    commentUploader: req.session.user.firstName,
                    comment: req.body.commentText,
                    uploadtime: new Date()
                }
                productModel.findOneAndUpdate({ _id: req.body.productId }, {
                    $push: {
                        comments: comment
                    }
                }, function(err, product) {
                    if (err) throw err;
                    else
                        resolve(product)

                })






            })
        }).then(
            function(product) {
                return new Promise(function(resolve, reject) {
                    productModel.findOneAndUpdate({ _id: ObjectId(product._id) }, {
                        $push: {
                            ratings: (req.body.rating) % 5
                        }
                    }, function(error, product) {
                        if (error) throw error
                        resolve(product)

                    })
                })

            }

        ).then(function(product) {
            return new Promise(function(resolve, reject) {
                productModel.findOneAndUpdate({ _id: ObjectId(product._id) }, {
                    $set: {
                        rating: (findAvgRating(product.ratings) % 5)
                    }
                }, function(err, product) {
                    if (err) throw err;

                    res.json(product);


                })
            })
        })
    })






    productsRouter.post('/product/addtocart', function(req, res) {
        functionToGetIdOfCurrentUser(req.session.user).then(function(profile) {
            console.log(req.body)
            return new Promise(function(resolve, reject) {
                userModel.findOneAndUpdate({ _id: ObjectId(profile[0]._id) }, {
                    $push: {
                        productsPurchased: ObjectId(req.body.id)

                    }
                }, function(error, result) {
                    if (error) throw error;
                    res.json(result)
                })
            })
        })
    })




    app.use('/Ecommerce', productsRouter);


}






