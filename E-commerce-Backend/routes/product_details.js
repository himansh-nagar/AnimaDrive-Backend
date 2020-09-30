const knex = require("../models/database");


module.exports = (product_details,knex) =>{
    // get product detail
    product_details.get('/',(req,res)=>{
        knex
            .from('product_details')
            .select('*')
            .then(data => res.send(data))
            .catch(err = console.log(err))
    })
}