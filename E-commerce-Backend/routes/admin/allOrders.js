const knex = require("../../models/database");


module.exports = (allOrders,knex,isAdmin) =>{
    allOrders.get('/all',isAdmin,(req,res)=>{
        knex
        .from('orders')
        .select('*')
        .then(data => res.send(data))
        .catch(err => console.log(err))
    })
}