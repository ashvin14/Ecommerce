app.controller('productController',['apiservice',function(apiservice){
	apiservice.getAllProductsInfo().then(function(response){
		if(!response.data.notLoggedIn)//to check if authorized or not 
			//else send him to login page
			window.location='#/';
	});

}])