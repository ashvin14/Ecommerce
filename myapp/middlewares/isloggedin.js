exports.check = function(req,res,next){
	
	if(req.session.passport || req.session.user){
		console.log(req.session.user)
		
		
		next();
	}
		
	
	else
		res.status(200).json({"notLoggedIn":false});
}
