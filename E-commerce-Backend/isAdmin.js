require('dotenv').config()

module.exports = (req,res,next) =>{
    console.log(req.user);
    if(req.user.email === process.env.EMAIL){
        next()
    }
    else{
        res.sendStaus(404);
        res.redirect('/')
    }
}