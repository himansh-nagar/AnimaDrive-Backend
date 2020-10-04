const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth : {
        api_key: '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',
    }
}))

module.exports = (customers,knex) =>{

    customers.post('/',async (req,res)=>{
         
        knex('customers')
            .insert({
                'firstName':req.body.firstName ,
                'lastName': req.body.lastName , 
                'displayName' : req.body.displayName,
                'email': req.body.email
            })
            .returning('*')
            .then(data =>{
                // console.log(data[0].email);
                res.send(data)
                return transporter.sendMail({
                    to:data[0].email,
                    from:'himanshnagar0@gmail.com',
                    subject:'signup succeeded!',
                    html:`<h1>${data[0].firstName} succusfully signed in green store store</h1>`
                })                
            })
            .catch(err => console.log(err))
    })

    customers.get('/',(req,res) =>{
        knex
            .from('customers')
            .select('*')
            .then(data => res.send(data))
            .catch(err => console.log(err))
    })
}