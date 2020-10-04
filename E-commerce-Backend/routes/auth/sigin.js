
module.exports = (signup,passport, isLoggedIn) => {
    const signInMail=require('../../nodeMailer').signInMail;
    signup.get('/failed', (req, res) => {
        res.send({message:'failed to log in'})
    })
    signup.get('/google/auth',
        passport.authenticate('google', { scope: ['profile','email'] }));

    signup.get('/google/callback',
        passport.authenticate('google', { failureRedirect: '/failed' }),
        (req, res) => {
            // Successful authentication, redirect home.
            console.log(req.user)
            signInMail(req.user)
            res.send({message:'user is loged in'});
        });
}