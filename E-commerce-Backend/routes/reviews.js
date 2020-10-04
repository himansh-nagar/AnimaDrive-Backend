const { insert } = require("../models/database");
const knex = require("../models/database");


module.exports = (reviews,knex) =>{
    reviews.post("/:prodID",(req,res)=>{
        knex("reviews")
        ,insert({
            comment:req.body.comment,
            ratings:req.body.ratings,
            product_id:req.params.prodID,
            customer_id:req.body.customer_id
        })
        .returning('*')
        .then(data1 => {
            console.log(data1)
            res.send(data1)
        })
        .catch(err => console.log(err))
      })   
}