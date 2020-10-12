

module.exports = (placeOrders,knex,isLoggedIn,cors)=>{
    // const afterOrder=require('../nodeMailer').afterOrder
    // ordering from cart
    // placeOrders.use(cors({ 
    //     origin:'http://localhost:3001'
    // }))
    placeOrders.post('/cart/order',(req,res)=>{
        knex
        .from("cart")
        .where({"customer_id": 1})
        .returning("*")
        .then(cart=> {
            knex("orders")
            .insert({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                address:req.body.address,
                pincode:req.body.pincode,
                country:req.body.country,
                payment_method:req.body.payment_method,
                total_amount:req.body.total_amount,
                cart:JSON.stringify(cart),
                customer_id:req.body.customer_id
            }).returning('*')
            .then(data => {
                res.send(data)
            })
            .catch(err => console.log(err))
        })
        .catch(err=> console.log(err))
    })


    // ordering from buy now
    placeOrders.options('main/order', cors())
    placeOrders.post('/main/order',(req,res)=>{
        console.log("heelo apiiiii");
        knex("orders")
        .insert({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            address:req.body.address,
            pincode:req.body.pincode,
            country:req.body.country,
            payment_method:req.body.payment_method,
            total_amount:req.body.total_amount,
            product_id:req.body.product_id,
            customer_id:req.body.customer_id
        }).returning('*')
        .then(data => {
            // res.send(data)
            console.log(data, "demo data");
            res.send({result:true});
        })
        .catch((err) =>{
            console.log(err, "hey error");
            res.send({result:false});
        })
    })

    // getting cart temporary route
    placeOrders.get('/cart',(req,res)=>{
        knex
            .from('orders')
            .select('cart')
            .where({'customer_id':1})
            .then(cartData =>{
                res.send(cartData) 
                
            })
            .catch(err => console.log(err))
    })
}