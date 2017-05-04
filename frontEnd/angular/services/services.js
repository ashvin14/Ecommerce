app.service('apiservice',function($http){

	this.postLoginDetails=function(data){
		return $http({
			method:'POST',
			url  : './signin'	,
			data : data
		})
	}
	this.postSignupDetails=function(data){
		return $http({
			method:'POST',
			url  : './signup'	,
			data : data
		})
	}
	this.getAllProductsInfo = function(){
		return $http.get('./products');


	}
	this.productUploadDetails = function(data){
		return $http({
			method:'POST',
			data : data,
			url : './product/upload'
		})
	}









})