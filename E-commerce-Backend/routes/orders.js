const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

require('dotenv')

const transporter = nodemailer.createTransport(sendgridTransport({
    auth : {
        api_key: process.env.api_key,
    }
}))

module.exports = (placeOrders,knex)=>{

    placeOrders.post('/:prodID',(req,res)=>{
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
            product_id:req.params.prodID,
            customer_id:req.body.customer_id
        }).returning('*')
        .then(data1 => {
            res.send(data1)
            return transporter.sendMail({
                to:data1[0].email,
                from:'himanshnagar0@gmail.com',
                subject:'order placed!',
                html:`<h1>${data1[0].firstName} succusfully placed a order of ${data1[0].total_amount} and order is created at ${data1[0].created_at} you choose payment method ${data1[0].payment_method}</h1>`
            })  
        })
        .catch(err => console.log(err))
    })
}