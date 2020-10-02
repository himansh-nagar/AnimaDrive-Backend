const express = require('express');
const app = express();
const knex = require('./models/database')
const passport = require('passport');
const bodyParser=require('body-parser');

const cookieParser=require('cookie-parser');
const session = require('express-session');



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


let signup = express.Router();
app.use('/',signup)
require('./routes/auth/sigin')(signup,passport)


const product = express.Router();
app.use('/products',product)
require('./routes/products')(product,knex)


// Home route
app.get('/',isLoggedIn,(req,res)=>{
    console.log(req.user)
    res.send("welcome to Home Page")
})

const getProduct_details = express.Router();
app.use('/product-details',getProduct_details)
require('./routes/product_details')(getProduct_details,knex)


// admin route but not secure yet
const adminPostProducts = express.Router();
app.use('/admin/PostProducts',adminPostProducts);
require('./routes/admin/post_products')(adminPostProducts,knex)

// admin route but not secure yet
const adminUpdateProduct = express.Router();
app.use('/admin/updateProduct',adminUpdateProduct);
require('./routes/admin/update_products')(adminUpdateProduct,knex)

// admin route but not secure yet
const adminDeleteProduct = express.Router();
app.use('/admin/deleteProduct',adminDeleteProduct)
require('./routes/admin/delete_product')(adminDeleteProduct,knex)



app.listen(port,()=>{
    console.log(`app is running on port at ${port}`);
})