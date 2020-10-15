module.exports=(forms)=>{
    const collaborator = require('../nodeMailer').collaborator;
    const joinUs = require('../nodeMailer').joinUs;
    const contactUs=require('../nodeMailer').contactUs;

    forms.post('/collaborator',(req,res)=>{
        collaborator(req.body.form)
        console.log({message:'form sended successfully'})
        res.send({message:'form sended successfully'})
    })


    forms.post('/joinUs',(req,res)=>{
            joinUs(req.body.form)
            console.log({message:'form sended successfully'})
            res.send({message:'form sended successfully'})
        })

    forms.post('/contactUs',(req,res)=>{
            contactUs(req.body)
            console.log({message:'form sended successfully'})
            res.send({message:'form sended successfully'})
        })

}