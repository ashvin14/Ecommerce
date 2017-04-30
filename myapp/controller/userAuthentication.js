var express = require('express');
var mongoose = require('mongoose');
var userRouter = express.Router();
var userModel = require('./../model/users.js');
var isLoggedIn = require('./../middlewares/isloggedin');
var cookieParser = require('cookie-parser');
var session = require('express-session');
//ObjectId used to tell node that we are going to use mongos object id property
//with the help of mongoose


var ObjectId = mongoose.Types.ObjectId;
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
//include blue-bird for promises
var Promise = require('bluebird');
//to create facebook-cookie with information like accesstoken ,secret encoded key and 
//callback url to redirect after successfull login
passport.use(new Strategy({
    clientID: '258125494593796',
    clientSecret: '60bf2db325b6352f5af4c28ae2e8fd68',
    callbackURL: 'http://localhost:3000/Ecommerce/loggedIn/facebook'
}, function(accessToken, refreshToken, profile, callback) {
    var user ={
        accesstoken:accessToken,
        profile : profile
    }

   console.log(accessToken)

    return callback(null, profile);
}))



//session to create login
//say you are telling node that session has started
passport.serializeUser(function(user, callback) {



    callback(null, user);

})

//here you are telling node that session has ended
passport.deserializeUser(function(user, callback) {

    callback(null, user);


})





//db is created with users as collection
mongoose.connect('mongodb://localhost/Ecommerce');

mongoose.connection.once('open', function(err) {
    if (err) console.log(err);
    console.log("successfully connected to database!");
})

//export function intialized here,it will be used in app.js
module.exports.controllerFunction = function(app) {


app.use(cookieParser());

    app.use(session({ 
        secret: 'keyboard cat',
        resave: true,
        httpOnly: false,
        saveUninitialized: true}));











app.use(passport.initialize());
  app.use(passport.session());
        var functionToStoreSingupDetailsInDatabase = function(req, res) {

            if (req.body.firstName != undefined && req.body.password != undefined && req.body.email != undefined && req.body.lastName != undefined) {
                var newUser = new userModel({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: req.body.password,
                    email: req.body.email
                })
                newUser.save(function(err, result) {
                    if (err)
                        throw err;

                    console.log(result)
                    if(result)
                        res.redirect('#/')
                        
                })
            }
        }


            var functionToCheckIfUserExitsWhenLoggedInManually = function(req, res) {
                console.log(req.body)

                userModel.findOne({ $and: [{ "email": req.body.email }, { "password": req.body.password }] }, function(err, result) {
                    console.log(result)
                    if (err) throw err;
                    else if (result == null || result.email == undefined || result.password == undefined) {
                        console.log(result)
                       res.status(200).json({'status':404})
                    } else {
                        req.session.user = result;

                        res.status(200).json({'status':200})

                       //res.redirect('./products')
                    }


                })

            }












            //route for login using facebook
            userRouter.get('/login/facebook', passport.authenticate('facebook',{session:false}), function(req, res) {




            })

            userRouter.get('/loggout', function(req, res) {
                req.logout();
                delete req.session.passport;
                res.redirect('#/');
            })

            userRouter.get('/loggedIn/facebook', passport.authenticate('facebook', { failedRedirect: '/',successRedirect:'#/products',session:false})

                   
                )
                //end for login by facebook route









            //signup route
            userRouter.post('/signup',functionToStoreSingupDetailsInDatabase)
                //end for signup route







            //manual signin route
        userRouter.post('/signin', functionToCheckIfUserExitsWhenLoggedInManually)
            //end for manual signin  route



        //route defined
        app.use('/Ecommerce', userRouter);


    } //end of controllerFUnction
