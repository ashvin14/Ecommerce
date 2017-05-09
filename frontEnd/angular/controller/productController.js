app.controller('productController', ['apiservice','$route' ,function(apiservice,$route) {
    var main = this;
    this.imgsrc="data:image/png;base64,";
    this.productName;
    this.rating;
    this.loggout = function() {
        console.log("pressed me")
        apiservice.loggout().then(function(response) {
            console.log(response)
            window.location = "#/"
        })
    }

    var formdata = new FormData();
    this.getTheFiles = function($files) {
        angular.forEach($files, function(value, key) {

            formdata.set(key, value);
            //console.log(formdata.getAll(key))
            console.log(formdata);
            console.log(formdata.getAll(0));


        });


    };



    apiservice.getAllProductsInfo().then(function(response) {
        

        if (response.data.notLoggedIn == false) //to check if authorized or not 
        //else send him to login page
            window.location = "#/";

        if (response.data.products == 0) {
            alert('add some products');

        } else {
           // main.products= response.data;
            console.log(response)
            main.products=[];
            for(var i in response.data.product){
            	main.products[i]=response.data.product[i];
            	main.products[i].img64=response.data.imgbase64[i]  ; 
            	main.products[i].orignalname= main.products[i].images[0].orignalname;   
            }
            
        }


    });







    this.productUploader = function() {

        var product = {
            category: main.category,
            description: main.description,
            images: {

                orignalname: main.images.orignalname
            },
            uploadedTime: new Date(),
            cost: main.cost

        }










        // SEND THE FILES.

        apiservice.fileUpload(formdata).then(
            function(response) {
                console.log(response)
                apiservice.productUploadDetails(product).then(function(response) {
                    console.log(response);
                 $route.reload();
                }, function() {
                    alert('the api couldnt load please try again later');
                })
            })





    };
























}])
