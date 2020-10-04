const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
require('dotenv').config()

const transporter = nodemailer.createTransport(sendgridTransport({
    auth : {
        api_key: process.env.SGKEY,
    }
}))
const signInMail=(user)=>{
    console.log('nodemailer',user.email);
    (transporter.sendMail({
        to:user.email,
        from:'sushant19@navgurukul.org',
        subject:'signup succeeded!',
        html:`<h1>${user.firstName} succusfully signed in green store store</h1>`
    })
    .then(data=>{
        console.log(data);
    })
    .catch(err => console.log(err))
    )
}

const afterOrder=(data)=>{
    transporter.sendMail({
        to:data[0].email,
        from:'himanshnagar0@gmail.com',
        subject:'order placed!',
        html:`<h1>${data[0].firstName} succusfully placed a order of ${data[0].total_amount} and order is created at ${data[0].created_at} you choose payment method ${data[0].payment_method}</h1>`
    })  
    .then(data=>{
        console.log(data);
    })
    .catch(err => console.log(err))
}

module.exports={signInMail,afterOrder}
