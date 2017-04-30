var app = angular.module('ecommApp', ['ngRoute']);
app.controller('loginController', ['apiservice', function(apiservice) {
    this.email;
    this.password;
    var main = this;

    this.postLogin = function() {
        var loginDetails = {
            email: main.email,
            password: main.password

        }

        apiservice.postLoginDetails(loginDetails).then(function(response) {
           	if(response.data.status==200){
           		window.location = '#/products'
           	}
            console.log(response.data.status)
           
            if(response.data.status == 404){
            	alert('please put correct email and password')
            	main.cancel();

            }

        })
        this.cancel = function() {
            main.email = "";
            main.password = "";
        }
    }
}]);
app.controller('signupController', ['apiservice', function(apiservice) {
    this.email;
    this.password;
    this.firstName;
    this.lastName;
    var main = this;

    this.postSignup = function() {
        var loginDetails = {
            email: main.email,
            password: main.password,
            firstName:main.firstName,
            lastName:main.lastName


        }


        apiservice.postSingupDetails(loginDetails).then(function(response) {
            console.log(response)
          
            if (response.status == 200) {
            	window.location = '#/'
            }

        })
        this.cancel = function() {
            main.email = "";
            main.password = "";
            main.firstName = "";
            main.lastName = ""
        }
    }
}]);
