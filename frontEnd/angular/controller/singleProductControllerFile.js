
//load product data
//check if the user is admin ,if not dont allow him to delete or edit product
//make comment schema ,to add comments about product
//calculate average stars-rating
//show modal warning or of some kind to tell user you are not allowed to change 
// make 'buy' button to purchase product if hes not admin
//make a seperate function to check if the user is admin or not
//after 'buy' is pressed it should update users
//-totalProductsPurchased and total products sold

app.controller('singleProductController', ['apiservice', '$routeParams', function(apiservice, $routeParams) {
	this.product={}
	this.loggout = function() {
       
        apiservice.loggout().then(function(response) {
            
            window.location = "#/"
        })
    }












    var main = this;
    apiservice.getProductInfoById($routeParams.id).then(function(response) {
        if (response.data.notLoggedIn == false) {
            window.location = "#/"
        }
        console.log(response.data)
        
        main.product.imgbase64 = response.data.Result.imgbase64[0];
        main.product.name = response.data.Result.product[0].images[0].orignalname;
         
        main.product.cost = response.data.Result.product[0].cost;
        main.product.description = response.data.Result.product[0].description;
        main.product.id = response.data.Result.product[0]._id;

    })
    this.deteteProduct = function(){
    	console.log("hello dleelte")
    	apiservice.deleteProduct(main.product.id).then(function(response){
    		if(response.data.deleted==true)
    			window.location="#/products";
    	})
    }

    var isUserAdmin = function(admin) {
        if (main.product.currentUser == admin)
            return true;
        else
            return false;
    }



    this.productEdit = function() {

        var product = {
        	productId:main.product.id,
            category: main.category,
            description: main.description,
            images: {

                orignalname: main.images.orignalname
            },
           
            cost: main.cost

        }










        // SEND THE FILES.

        
                
                apiservice.productEdit(product).then(function(response) {
                    console.log(response);
                 $route.reload();
                }, function() {
                    alert('the api couldnt load please try again later');
                })
            





    };


  	







}])
