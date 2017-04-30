app.service('apiservice',function($http){

	this.postLoginDetails=function(data){
		return $http({
			method:'POST',
			url  : './signin'	,
			data : data
		})
	}
	this.postSingupDetails=function(data){
		return $http({
			method:'POST',
			url  : './signup'	,
			data : data
		})
	}
	this.getAllProductsInfo = function(){
		return $http({
			method:'GET',
			url : './products'
		})
	}
})