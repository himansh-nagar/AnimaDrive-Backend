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


app.listen(port,()=>{
    console.log(`app is running on port ${port}`);
})