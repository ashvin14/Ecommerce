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
    this.product = {}
    this.loggout = function() {

        apiservice.loggout().then(function(response) {

            window.location = "#/"
        })
    }








    this.loggout = function() {

        apiservice.loggout().then(function(response) {
          
            window.location = "#/"
        })
    }

    this.getarray=function(num){
    	return new Array(Math.round(num));
    }


    var main = this;
    apiservice.getProductInfoById($routeParams.id).then(function(response) {
        if (response.data.notLoggedIn == false) {
            window.location = "#/"
        }
        console.log(response.data)
        main.ProductIfPurchased=response.data.Result.product[0];
        main.product.ratings= response.data.Result.product[0].ratings;
        main.product.imgbase64 = response.data.Result.imgbase64[0];
        main.product.name = response.data.Result.product[0].images[0].orignalname;
        main.product.rating = response.data.Result.product[0].rating;
        main.product.cost = response.data.Result.product[0].cost;
        main.product.description = response.data.Result.product[0].description;
        main.product.id = response.data.Result.product[0]._id;
        main.currentUser = response.data.currentUser;
        main.admin = response.data.admin[0];
        console.log(main.ProductIfPurchased)
        main.comments = response.data.Result.product[0].comments
        for(var i in main.comments){
        	main.comments[i].rating=main.product.ratings[i];

        }
       
        
        main.isUserAdmin = function() {
            if (main.admin.firstName == main.currentUser.firstName)
                return true;
            else
                return false;
        }


    })
    this.deteteProduct = function() {

        apiservice.deleteProduct(main.product.id).then(function(response) {
            if (response.data.deleted == true)
                window.location = "#/products";
        })
    }






    this.productEdit = function() {

        var product = {
            productId: main.product.id,
            category: main.category,
            description: main.description,


            cost: main.cost

        }










        // SEND THE FILES.



        apiservice.productEdit(product).then(function(response) {
            
            window.location = "#/products"
        }, function() {
            alert('the api couldnt load please try again later');
        })






    };

    /*
        

        }

    */


    this.addcomments = function() {

        var comment = {
            commentText: main.product.comment.body,
            rating: main.product.comment.rating,
            productId: main.product.id
        }

        apiservice.postComment(comment).then(function(response) {
            window.location = "#/products"

        })

    }
    this.addToCart = function(){
    	console.log(main.ProductIfPurchased)
    	var data ={
    		id:main.ProductIfPurchased._id
    	}
    	apiservice.addToCart(data).then(function(response){
    		alert('product added to cart');
    	})
    }



}])
