

module.exports = (placeOrders, knex, isLoggedIn, cors) => {
    const afterOrder = require('../nodeMailer').afterOrder
    placeOrders.post('/cart/order', isLoggedIn, (req, res) => {
        knex
            .from("cart")
            .select("*")
            .where({ "customer_id": req.decode.id })
            .then(cart => {
                knex("orders")
                    .insert({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        address: req.body.address,
                        pincode: req.body.pincode,
                        country: req.body.country,
                        payment_method: req.body.payment_method,
                        total_amount: req.body.total_amount,
                        cart: JSON.stringify(cart),
                        customer_id: req.body.customer_id
                    }).returning('*')
                    .then(data => {
                        res.send(data)
                        knex('cart')
                            .where({ "customer_id": req.decode.id })
                            .del()
                            .then(data => {

                            })
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    })


    // ordering from buy now
    placeOrders.post('/main/order', isLoggedIn, (req, res) => {
        console.log("heelo apiiiii");
        knex('products')
            .select('*')
            .where('id',req.body.form.product_id)
            .then(data => {
                console.log(data)
                knex("orders")
                    .insert({
                        firstName: req.body.form.fname,
                        lastName: req.body.form.lname,
                        email: req.body.form.email,
                        mobile: req.body.form.mobile,
                        address: req.body.form.address,
                        city: req.body.form.city,
                        state: req.body.form.state,
                        pincode: req.body.form.pincode,
                        country: 'India',
                        payment_method: 'COD',
                        total_amount: data[0].price,
                        product_id: req.body.form.product_id,
                        customer_id: req.decode.id
                    }).returning('*')
                    .then(result => {
                        // res.send(data)
                        result[0].mEmail=req.decode.email
                        afterOrder(result)
                        console.log(result, "demo data");
                        res.send({ result: true });
                    })
                    .catch((err) => {
                        console.log(err, "hey error");
                        res.send({ result: false });
                    })
            })
            .catch(err => console.log(err))

    })

    // getting cart temporary route
    placeOrders.get('/cart', (req, res) => {
        knex
            .from('orders')
            .select('cart')
            .where({ 'customer_id': 1 })
            .then(cartData => {
                res.send(cartData)

            })
            .catch(err => console.log(err))
    })
}