const knex = require("../../models/database");


module.exports = (allOrders,knex) =>{
    allOrders.get('/all',(req,res)=>{
        knex
        .from('orders')
        .select('*')
        .then(data => res.send(data))
        .catch(err => console.log(err))
    })
}