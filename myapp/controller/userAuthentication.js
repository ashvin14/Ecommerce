var express = require('express');
var mongoose = require('mongoose');
var userRouter = express.Router();
var userModel = require('./../model/users.js');
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
	clientID:'288585491581053',
	clientSecret:'ddb843904e4cd518997834b56bf3e7fe',
	callbackURL:'http://localhost:3000/Ecommerce/loggedIn'
},function(accessToken,refreshToken,profile,callback){



	
	return callback(null,profile);
}))



//session to create login
//say you are telling node that session has started
passport.serializeUser(function(user,callback){

	
	
	callback(null,user);
	
})

//here you are telling node that session has ended
passport.deserializeUser(function(user,callback){
	
		callback(null,user);


})





//db is created with users as collection
mongoose.createConnection('mongodb://localhost/users');

mongoose.connection.once('open',function(err){
	if(err)console.log(err);
	console.log("successfully connected to database!");
})

//export function intialized here,it will be used in app.js
module.exports.controllerFunction = function(app){

		var functionToStoreFirstNameInDatabase =function(user)
		{

			

		}









userRouter.post('/login',function(req,res){
	console.log(req.body.params);
})



//route for login using facebook
userRouter.get('/login',passport.authenticate('facebook')
,function(req,res){
	console.log(req.body.params)


	
})

userRouter.get('/loggout',function(req,res){
	req.logout();
	delete req.session.passport;
	res.redirect('/');
})

userRouter.get('/loggedIn',passport.authenticate('facebook',{failedRedirect:'/'}),function(req,res){
res.send('you singned in successfully');
req.session.user= req.user;

})
//end for login by facebook route










//signup route
userRouter.post('/signup',function(req,res){
	if(req.body.firstName!=undefined && req.body.password!=undefined&&req.body.email!=undefined&&req.body.lastName!=undefined)
	{
		var newUser = new userModel({
			firstName : req.body.firstName,
			lastName  : req.body.lastName,
			password  : req.body.password,
			email	  : req.body.email
		})
		newUser.save(function(err,result){
			if(err)
				throw err;
			else 
				console.log(result);
		})
	}


//end for signup route







})//manual signin route
	userRouter.post('/signin',function(req,res){
		if(req.body.firstName!=undefined && req.body.lastName!=undefined && req.body.password!=undefined)
		{
			userModel.findOne({$and:[{'firstName':req.body.firstName},{'lastName':req.body.lastName},{'password':req.body.password}]},function(err,result){
				if(err) throw err;
				else if(result==null || result.firstName== undefined || result.password == undefined){
					console.log(result)
					res.send("user did not find please signup");
				}
				else
				{
					res.send('user found');
					res.redirect('signup');
				}


			})
		}
	})

//end for manual signin  route



//route defined
app.use('/Ecommerce',userRouter);


}//end of controllerFUnction