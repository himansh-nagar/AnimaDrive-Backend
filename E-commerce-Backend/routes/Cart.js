const knex = require("../models/database");

module.exports = (Cart, knex,isLoggedIn) => {
  Cart.post("/addToCart", isLoggedIn,(req, res) => {
    knex
      .from("cart")
      .where({"customer_id": req.body.custm_id,'product_id':req.body.product_id})
      .returning("*")
      .then((Item) => {
        // res.send(Item)
        console.log(Item);
        if (Item.length) {
            Item[0].quantity++;
             knex("cart")
                  .where({
                    product_id: Item[0].product_id,
                    customer_id: req.body.custm_id,
                  })
                  .update({ quantity: Item[0].quantity })
                  .returning("*")
                  .then((updatedCart) => {
                    res.send(updatedCart);
                  })
                  .catch((err) => console.log(err));
         
        } else {
          knex("cart")
            .insert({
              product_name: req.body.product_name,
              price: req.body.price,
              thumbnail: req.body.thumbnail,
              quantity: 1,
              product_id: req.body.product_id,
              customer_id: req.body.custm_id,
            })
            .returning("*")
            .then((addedItem) => res.send(addedItem))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  });

//   get my cart
  Cart.get('/mycart',isLoggedIn,(req,res)=>{
    knex
    .from("cart")
    .where({"customer_id": 1})
    .returning("*")
    .then(cart=> res.send(cart))
    .catch(err=> console.log(err))
  })

//   delete fron cart
    
      
};
