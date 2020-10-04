
module.exports = (placeOrders,knex,isLoggedIn)=>{
    const afterOrder=require('../nodeMailer').afterOrder
    placeOrders.post('/:prodID',isLoggedIn,(req,res)=>{
        knex("orders")
        .insert({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            address:req.body.address,
            pincode:req.body.pincode,
            country:req.body.country,
            payment_method:req.body.payment_method,
            total_amount:req.body.total_amount,
            product_id:req.params.prodID,
            customer_id:req.body.customer_id
        }).returning('*')
        .then(data1 => {
            res.send(data1)
            afterOrder(data1)
            
        })
        .catch(err => console.log(err))
    })
}