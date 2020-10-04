

module.exports = (myOrder,knex,isLoggedIn)=>{
    myOrder.get("/",isLoggedIn,(req,res)=>{
        knex
            .from('orders')
            .select('*')
            .where('email',req.user.email)
            .then(data => res.send(data))
            .catch(err => console.log(err))
    })
}