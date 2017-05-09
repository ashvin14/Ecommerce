app.service('apiservice', function($http) {

    this.postLoginDetails = function(data) {
        return $http({
            method: 'POST',
            url: './signin',
            data: data
        })
    }
    this.postSignupDetails = function(data) {
        return $http({
            method: 'POST',
            url: './signup',
            data: data
        })
    }
    this.getAllProductsInfo = function() {
        return $http.get('./products');


    }
    this.productUploadDetails = function(data) {
        return $http({
            method: 'POST',
            data: data,
            url: './product/upload'
        })

    }
    this.fileUpload = function(formdata) {
        return $http({
            method: 'POST',
            url: './product/upload',
            data: formdata,
            headers: {
                'Content-Type': undefined
            }
        })


    }
    this.productEdit = function(formData){
    	return $http({
    		method:'PUT',
    		url:'./product/edit/',
    		data:formData

    	})
    }
    this.loggout = function(){
    	return $http({
    		method:'GET',
    		url:'./loggout'
    	})
    }
    this.getProductInfoById=function(id){
    	return $http({
    		method:'GET',
    		url:'./product/'+id
    	})
    }
    this.deleteProduct = function(id){
    	return $http({
    		method:'DELETE',
    		url:'./product/delete/'+id

    	})
    }







})
