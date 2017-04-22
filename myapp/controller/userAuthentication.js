var express = require('express');
var mongoose = require('mongoose');
var userRouter = express.Router();
var userModel = require('./../model/users.js');
var ObjectId = mongoose.Types.ObjectId;
//db is created with users as collection
mongoose.connect('mongodb://localhost/users');

mongoose.connection.once('open',function(err){
	if(err)throw err;
	console.log("successfully connected to database!");
})


module.exports.controllerFuntion = function(app){
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
})
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




//route defined
app.use('/Ecommerce',userRouter);


}