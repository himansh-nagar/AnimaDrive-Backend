
// update products

module.exports = (adminUpdateProduct,knex,isAdmin) =>{
    adminUpdateProduct.put('/:prodID',isAdmin,(req,res)=>{
        console.log(req.params.prodID)
        knex('product_details')
            .where({ 'product_id': req.params.prodID })
            .update({
                'product_name':req.body.product_name,
                'price':req.body.price,
                'shot_desc':req.body.shot_desc,
                'brief_desc':req.body.brief_desc,
                'thumbnail':req.body.thumbnail,
                'img1':req.body.img1,
                'img2':req.body.img2,
                'img3':req.body.img3,
                'stock':req.body.stock,
            })
            .returning('*')
            .then(data=>{
                console.log(data)
                knex('products')
                .where({
                    'id':data[0].product_id
                })
                .update({
                    product_name: data[0].product_name,
                    price: data[0].price,
                    shot_desc: data[0].shot_desc,
                    thumbnail: data[0].thumbnail,
                  })
                  .returning('*')
                  .then(data1 => {
                      res.send(data1)
                  })
                  .catch(err=>console.log(err))
            })
            .catch(err => console.log(err))
    })}