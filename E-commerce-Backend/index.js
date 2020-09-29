const express = require('express');
const app = express();

const knex = require('./models/database')
const passport = require('passport');
const bodyParser=require('body-parser');


const port = process.env.PORT || 3000;

const isLoggedIn=require('./middleware');

const cookieSession = require('cookie-session');


app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  }))


let signup = express.Router();
app.use('/',signup)
require('./routes/auth/sigin')(signup,passport,isLoggedIn)


// ------------------------------------ GET routes ------------------------------------

// Home route
app.get('/',(req,res)=>{
    res.send("welcome to Home Page")
})

// getting all products
app.get('/allProducts',(req,res)=>{
    res.send(data.products)
})

// products details
app.get('/productDetail/:id',(req,res)=>{
    res.send(data.productDetails[req.params.id - 1])
})

// getting all catagory
app.get('/catagory',(req,res)=>{
    res.send(data.CATAGORY)
})



// -----------------------------------POST routes-----------------------

// getting products by catogary
app.post('/catagory',(req,res)=>{
    const getProducts = [];
    for (const product of data.products) {
        if(product.CATAGORY === req.body.CATAGORY){
            getProducts.push(product)
        }
    }
    res.send(getProducts)
})


// posting products
app.post('/postProducts',(req,res)=>{
    // products
    console.log(req.body);
    let product = req.body.product;
    product.id = data.products.length + 1

    // product details
    let productDetail = req.body.productDetail;
    productDetail.id = data.productDetails.length + 1
    productDetail.productID = product.id;

    // insert data
    data.products.push(product)
    data.productDetails.push(productDetail)
    res.send(data.products)
})


app.listen(port,()=>{
    console.log(`app is running on port ${port}`);
})