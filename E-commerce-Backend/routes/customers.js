
module.exports = (customers,knex,bcrypt) =>{

    customers.post('/',async (req,res)=>{
        const bcryptPassword =   await bcrypt.hash(req.body.password,10)
           
        knex('customers')
            .insert({
                'name':req.body.name ,
                'email': req.body.email , 
                'password' : bcryptPassword,
                'phone_no': req.body.phone_no
            })
            .then(data =>{
                res.send(data)
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