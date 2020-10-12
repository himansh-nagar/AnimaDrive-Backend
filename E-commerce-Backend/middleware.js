require('dotenv').config()

const isLoggedIn=(req,res,next)=>{
    console.log(req.user,"in logged")
    if(req.user){
        console.log(req.user)
        next()
    }
    else{
        res.sendStatus(401);
    }   
}
const isAdmin=(req,res,next) =>{
    console.log(req.user);
    if(req.user.email === process.env.EMAIL){
        next()
    }
    else{
        res.sendStaus(401);
    }
}

module.exports={isLoggedIn,isAdmin}
