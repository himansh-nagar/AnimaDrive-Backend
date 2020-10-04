const express = require('express');
const app = express();
const knex = require('./models/database')
const passport = require('passport');
const bodyParser=require('body-parser');

const cookieParser=require('cookie-parser');
const session = require('express-session');

const isAdmin = require('./isAdmin');


const port = process.env.PORT || 3000;

const isLoggedIn=require('./middleware');
require('./routes/auth/passport-setup');


app.use(cookieParser());
app.use(session({ secret: "cats" }));
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());


// let signup = express.Router();
// app.use('/',signup)
// require('./routes/auth/sigin')(signup,passport,isLoggedIn)


// let signup = express.Router();
// app.use('/',signup)
// require('./routes/auth/sigin')(signup,passport)

// home page
const product = express.Router();
app.use('/products',product)
require('./routes/products')(product,knex)


// Home route
// app.get('/',(req,res)=>{
//     console.log(req.user)
//     res.send("welcome to Home Page")
// })

// get details of a product
const getProduct_details = express.Router();
app.use('/product-details',getProduct_details)
require('./routes/product_details')(getProduct_details,knex)


// placing a order
const placeOrder = express.Router();
app.use('/placeOrder',placeOrder);
require('./routes/orders')(placeOrder,knex)

// get myoder
const myOrder = express.Router();
app.use('/myOrders',myOrder);
require("./routes/myOrders")(myOrder,knex)


// admin route but not secure yet
const adminPostProducts = express.Router();
app.use('/admin/PostProducts',adminPostProducts);
require('./routes/admin/post_products')(adminPostProducts,knex)

const adminUpdateProduct = express.Router();
app.use('/admin/updateProduct',isAdmin,adminUpdateProduct);
require('./routes/admin/update_products')(adminUpdateProduct,knex)

const adminDeleteProduct = express.Router();
app.use('/admin/deleteProduct',isAdmin,adminDeleteProduct)
require('./routes/admin/delete_product')(adminDeleteProduct,knex)

// admin route for getting all the products not secure
const allOrders = express.Router();
app.use("/admin/orders",allOrders);
require("./routes/admin/allOrders")(allOrders,knex)


// temporary route for creating customers
const customer = express.Router();
app.use('/customer',customer)
require('./routes/customers')(customer,knex)

app.listen(port,()=>{
    console.log(`app is running on port at ${port}`);
})