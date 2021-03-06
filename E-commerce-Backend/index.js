const express = require('express');
const app = express();
const knex = require('./models/database')
const passport = require('passport');
const bodyParser=require('body-parser');
const cors = require('cors');


const cookieParser=require('cookie-parser');
const session = require('express-session');
app.use(cors());


app.use(function(req, res, next) {

    //to allow cross domain requests to send cookie information.
    
    res.header('Access-Control-Allow-Credentials', true);
    
    // origin can not be '*' when crendentials are enabled. so need to set it to the request origin
    res.setHeader('Access-Control-Allow-Origin',  "http://localhost:3000");
    
    // list of methods that are supported by the server
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    
    res.header('Access-Control-Allow-Headers', ' Content-Type');
    
        next();
    }); 
const port = process.env.PORT || 4000;

const isAdmin=require('./middleware').isAdmin;
const isLoggedIn=require('./middleware').isLoggedIn;
require('./routes/auth/passport-setup');


app.use(cookieParser());
app.use(session({ secret: "cats" }));
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());


// app.options('/placeOrder/main/order', cors())


let signup = express.Router();
app.use('/',signup)
require('./routes/auth/sigin')(signup,passport)

// home page
const product = express.Router();
app.use('/products',product)
require('./routes/products')(product,knex)


// get details of a product
const getProduct_details = express.Router();
app.use('/product-details',getProduct_details)
require('./routes/product_details')(getProduct_details,knex)



// admin route but not secure yet
const adminPostProducts = express.Router();
app.use('/admin/PostProducts',adminPostProducts);
require('./routes/admin/post_products')(adminPostProducts,knex,isAdmin)

const adminUpdateProduct = express.Router();
app.use('/admin/updateProduct',isAdmin,adminUpdateProduct);
require('./routes/admin/update_products')(adminUpdateProduct,knex,isAdmin)

const adminDeleteProduct = express.Router();
app.use('/admin/deleteProduct',isAdmin,adminDeleteProduct)
require('./routes/admin/delete_product')(adminDeleteProduct,knex,isAdmin)

// admin route for getting all the products not secure
const allOrders = express.Router();
app.use("/admin/orders",allOrders);
require("./routes/admin/allOrders")(allOrders,knex,isAdmin)

// placing a order 
const placeOrder = express.Router();
app.use('/placeOrder',placeOrder);
require('./routes/orders')(placeOrder,knex,isLoggedIn,cors)

// get myorder
const myOrder = express.Router();
app.use('/myOrders',myOrder);
require("./routes/myOrders")(myOrder,knex,isLoggedIn)



// cart routes
const Cart = express.Router();
app.use('/cart',Cart);
require('./routes/Cart')(Cart,knex,isLoggedIn);


// temporary route for creating customers
const customer = express.Router();
app.use('/customer',customer)
require('./routes/customers')(customer,knex,isLoggedIn)

//Routes for all forms
const forms = express.Router();
app.use('/join',forms)
require('./routes/forms')(forms)

// todo -Mr.Susuant Bagri catch 404 and forward to error handler


app.listen(port,()=>{
    console.log(`app is running on port at ${port}`);
})