require('dotenv').config()

const isLoggedIn=(req,res,next)=>{
    const jwt= require('jsonwebtoken');
    console.log(req.headers.authorization,"in logged")
    if(req.headers.authorization){
        jwt.verify(req.headers.authorization,"sushant",(err,decode)=>{
            if(!err){
                req.decode=decode
                next()
            }
            else{
                res.sendStatus(401);
            }
        })
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
