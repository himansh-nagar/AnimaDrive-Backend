const knex = require("../../models/database");
// admin delete product

module.exports = (adminDeleteProduct,knex,isAdmin) =>{
    adminDeleteProduct.delete('/:prodID',isAdmin,(req,res) => {
        knex('product_details')
        .where({ 'product_id': req.params.prodID })
        .del()
        .returning('*')
        .then(data=>{
            // console.log(data);
            knex('product_details')
            .where({ 'id': data[0].product_id })
            .del()
            .returning('*')
            .then(data1 => {
                console.log(data1);
                res.send("product Deleted")
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
    
}