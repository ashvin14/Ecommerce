//this schema is for products
// it will contain all information about product uploaded time,cost,
//if sold or not,description,images,product admin i.e the User who uploaded,
//category

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var img = new Schema({
    orignalname: String,
    data: Buffer,
    contentType: String






})
 var comments = new Schema({

    commentUploaderId:{type: mongoose.Schema.Types.ObjectId },
    commentUploader:{type:String},
    comment:{type:'String'},
    uploadedTime:{type:Date}

})






var productSchema = new Schema({
    category: { type: String },
    description: { type: String },
    ratings: [{ type: Number}],
    rating:{type:Number,default:0},
    images: [img],
    comments:[comments],
    admin: { type: mongoose.Schema.Types.ObjectId },
    uploadedTime: { type: Date },
    cost: { type: Number },
    sold: { type: Boolean, default: false }

})
var products = mongoose.model('productsCollection', productSchema);
module.exports = products;
