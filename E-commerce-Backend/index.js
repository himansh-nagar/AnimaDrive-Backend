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


// ------------------------------------ GET routes ------------------------------------

// Home route
app.get('/',isLoggedIn,(req,res)=>{
    console.log(req.user)
    res.send("welcome to Home Page")
})

// getting all products
app.get('/allProducts',(req,res)=>{
    res.send(data.products)
})



app.listen(port,()=>{
    console.log(`app is running on port ${port}`);
})