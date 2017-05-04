app.controller('productController',['apiservice',function(apiservice){
	var main = this;
	







	apiservice.getAllProductsInfo().then(function(response){

		if(response.data.notLoggedIn == false)//to check if authorized or not 
			//else send him to login page
		window.location= "#/";

		if(response.data.products==0){
			alert('add some products');

		}


	}); 
	this.productUploader = function(){
		var product ={
			category : main.category,
			description : main.description,
			images : {
				path:main.images.path,
				orignalname: main.images.orignalname
			},
			uploadedTime : new Date(),
			cost: main.cost
		}
		console.log(product)
		apiservice.productUploadDetails(product).then(function(response){
			console.log(response);
		},function(){
			alert('the api couldnt load please try again later');
		})

	}

		

}])