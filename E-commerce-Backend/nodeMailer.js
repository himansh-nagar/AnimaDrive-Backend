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
        to:data[0].mEmail,
        from:'sushant19@navgurukul.org',
        subject:'order placed!',
        html:`<h1>${data[0].firstName} succusfully placed a order of ${data[0].total_amount} and order is created at ${data[0].created_at} you choose payment method ${data[0].payment_method}</h1>`
    })  
    .then(data=>{
        console.log(data);
    })
    .catch(err => console.log(err))
}


const collaborator=(data)=>{
    transporter.sendMail({
        to:'bagrisushant@gmail.com',
        from:'sushant19@navgurukul.org',
        subject:'Want to collaborate!',
        html:`<h1>Hi Rishabh, ${data.name} from ${data.name_of_org} want to collabrate with us.</h1>
        <p>Name : ${data.name}<br/>
        category : ${data.category}<br/>
        relate : ${data.relate}<br/>
        mobile : ${data.mobile}<br/>
        mobile 2 : ${data.alternate_mobile}<br/>
        email : ${data.email}<br/>
        address : ${data.address}<br/>
        pin : ${data.pin}<br/>
        </p>`,
    })  
    .then(data=>{
        console.log(data);
    })
    .catch(err => console.log(err))
}


const joinUs=(data)=>{
    transporter.sendMail({
        to:'bagrisushant@gmail.com',
        from:'sushant19@navgurukul.org',
        subject:'Join us!',
        html:`<h1>Hi Rishabh, ${data.name}  want to join us as ${data.category}.</h1>
        <p>Name : ${data.name}<br/>
        category : ${data.category}<br/>
        relate : ${data.relate}<br/>
        mobile : ${data.mobile}<br/>
        mobile 2 : ${data.alternate_mobile}<br/>
        email : ${data.email}<br/>
        address : ${data.address}<br/>
        pin : ${data.pin}<br/>
        </p>`,
    })  
    .then(data=>{
        console.log(data);
    })
    .catch(err => console.log(err,'asdfghjl'))
}
const contactUs=(data)=>{
    transporter.sendMail({
        to:'bagrisushant@gmail.com',
        from:'sushant19@navgurukul.org',
        subject:'Contact!',
        html:`<h1>Hi Rishabh, ${data.name}  want to contact.</h1>
        <p>Name : ${data.name}<br/>
        email : ${data.email}<br/>
        subject : ${data.subject}<br/>
        message : ${data.message}<br/>
        </p>`
    })  
    .then(data=>{
        console.log(data);
    })
    .catch(err => console.log(err,'asdfghjl'))
}

module.exports={signInMail,afterOrder,collaborator,joinUs,contactUs}
