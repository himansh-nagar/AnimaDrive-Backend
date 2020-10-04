

module.exports = (myOrder,knex)=>{
    myOrder.get("/",(req,res)=>{
        knex
            .from('orders')
            .select('*')
            .where('customer_id',req.body.ctmrID)
            .then(data => res.send(data))
            .catch(err => console.log(err))
    })
}