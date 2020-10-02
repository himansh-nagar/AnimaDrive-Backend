

module.exports = (getProduct_details,knex) =>{
    // get product detail
    getProduct_details.get('/:prodID',(req,res)=>{
        knex
            .from('product_details')
            .select('*')
            .where('product_id',req.params.prodID)
            .then(data => res.send(data))
            .catch(err => console.log(err))
    })
}