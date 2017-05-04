//this schema is for products
// it will contain all information about product uploaded time,cost,
//if sold or not,description,images,product admin i.e the User who uploaded,
//category

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
	category:{type:String,required:true},
	description:{type:String},
	rating	:{type:Number,default:0},
	images	:{
					path: {
					 type: String,
					 required: true,
					 trim: true
			 		},
			 		originalname: {
					 type: String,
					 required: true
		 }
		 
	},
	admin:{type:mongoose.Schema.Types.ObjectId},
	uploadedTime : {type:Date},
	cost:{type:Number},
	sold:{type:Boolean,default:false}

})
var products = mongoose.model('productsCollection',productSchema);
module.exports= products;