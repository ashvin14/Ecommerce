//var app = angular.module('ecommApp', ['ngRoute']); 

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{
           
        	templateUrl		: 'views/login-form.html',
        	
            controller 		: 'loginController',
          
        	controllerAs 	: 'loginCtrl'
        })
        .when('/signup',{
        	templateUrl     : 'views/signup-form.html',
        	controller 		: 'signupController',
        	controllerAs 	: 'signupCtrl'
        })
        .when('/products',{

        	templateUrl     : 'views/products-view.html',
        	controller 		: 'productController',
        	controllerAs 	: 'productCtrl'
        })
        /*
        .when('/edit/:id',{

            templateUrl     : 'views/edit-view.html',
            controller      :  'editBlogController',
            controllerAs    : 'editBlgCtrl'
        })
*/
        .otherwise(
            {
                //redirectTo:'/'
                template   : '<h1>404 page not found</h1>'
            }
        );
}]);