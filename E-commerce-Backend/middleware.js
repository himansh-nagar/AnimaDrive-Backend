const isLoggedIn=(req,res,next)=>{
    if(req.user){
        console.log(req.user)
        next()
    }
    else{
        res.sendStatus(401);
    }       
}

module.exports=(isLoggedIn)