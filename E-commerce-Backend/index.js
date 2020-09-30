const express = require('express');
const app = express();

const knex = require('./models/database')
const passport = require('passport');
const bodyParser=require('body-parser');

const bcrypt = require('bcrypt')

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


const product = express.Router();
app.use('/products',product)
require('./routes/products')(product,knex)

const customers = express.Router();
app.use('/customers',customers)
require('./routes/customers')(customers,knex,bcrypt)

app.listen(port,()=>{
    console.log(`app is running on port at ${port}`);
})