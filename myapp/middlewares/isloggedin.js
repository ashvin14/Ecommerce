exports.check = function(req,res,next){
	
	if(req.session.passport || req.session.user){
		console.log(req.session.passport)
		
		
		next();
	}
		
	
	else
		res.status(200).json({"notLoggedIn":false});
}
exports.checkInStarting = function(req,res,next){
	console.log(req.session)
	if(req.session){
			
		
		res.redirect('./products')
	}
		
	
	else
		res.redirect('/');
}