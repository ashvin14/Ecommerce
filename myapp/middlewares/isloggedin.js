exports.check = function(req,res,next){
	
	if(req.session.passport){
		console.log(req.session.passport)
		
		
		next();
	}
		
	
	else
		res.redirect('/');
}
exports.checkInStarting = function(req,res,next){

	if(req.session){
		console.log(req)
		
		
		redirect('/Ecommerce/products')
	}
		
	
	else
		res.redirect('/');
}