
module.exports=(product,knex)=>{
    product.post("/", (req, res) => {
        knex("products")
          .insert({
              'product_name':req.body.product_name,
              'price':req.body.price,
              'shot_desc':req.body.shot_desc,
              'thumnail':req.body.thumnail
          })
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
      
      product.get("/", (req, res) => {
        knex
          .from("products")
          .select("*")
          .then((data) => res.send(data))
          .catch((err) => console.log(err));
      });
}