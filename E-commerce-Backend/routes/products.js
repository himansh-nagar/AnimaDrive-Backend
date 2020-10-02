
module.exports=(product,knex)=>{
      
      product.get("/", (req, res) => {
        knex
          .from("products")
          .select("*")
          .then((data) => res.send(data))
          .catch((err) => console.log(err));
      });
}