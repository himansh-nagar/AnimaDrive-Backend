

module.exports = (myOrder,knex,isLoggedIn)=>{
    myOrder.post('/',isLoggedIn,(req,res)=>{
        knex
            .from('orders')
            .select('*')
            .where('customer_id',req.body.id)
            // .groupBy('created_at')
            .then(data => {
                res.send(data)
            })
            .catch(err => console.log(err))
    })
}