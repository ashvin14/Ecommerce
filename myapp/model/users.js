var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usersSchema = new Schema({
	firstName : {type:String,required:true},
	lastName : {type:String,required:true},
	password : {type:String,required:true},
	email 	 : {type:String,required:true},
	productsSold :{type:Number,default:0},
	productsPurchased:{type:Number,default:0},
	productsUploaded:{type:Number,default:0}

})
var users = mongoose.model('usersCollection',usersSchema);
module.exports = users;