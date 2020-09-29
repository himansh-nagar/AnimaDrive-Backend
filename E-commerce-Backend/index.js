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



app.listen(port,()=>{
    console.log(`app is running on port ${port}`);
})