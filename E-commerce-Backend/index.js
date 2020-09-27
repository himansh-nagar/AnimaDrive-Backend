const express = require('express');
const app = express();

const data = require('./data')

const port = 3000;

app.use(express.json())
app.use(express.urlencoded({
    extende:true
}))

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