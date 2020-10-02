module.exports = (adminPostProducts, knex) => {
  // post products

  // make this route secure (only for admins)

  adminPostProducts.post("/", (req, res) => {
    knex("products")
      .insert({
        product_name: req.body.product_name,
        price: req.body.price,
        shot_desc: req.body.shot_desc,
        thumnail: req.body.thumnail,
      })
      .returning('*')
      .then((data) => {
       knex('product_details')
        .insert({
            'product_name':req.body.product_name,
            'price':req.body.price,
            'shot_desc':req.body.shot_desc,
            'brief_desc':req.body.brief_desc,
            'thumnail':req.body.thumnail,
            'img1':req.body.img1,
            'img2':req.body.img2,
            'img3':req.body.img3,
            'stock':req.body.stock,
            'product_id': data[0].id
        })
        .returning('*')
        .then(data1 => {
            console.log(data1)
            res.send(data1)
        })
        .catch(err => console.log(err))
      })
      .catch((err) => console.log(err));
  });
};
