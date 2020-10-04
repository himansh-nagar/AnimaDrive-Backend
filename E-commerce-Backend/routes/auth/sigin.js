
module.exports = (signup,passport, isLoggedIn) => {
    signup.get('/failed', (req, res) => {
        res.send('failed to signin')
    })
    signup.get('/pass', (req, res) => {
        console.log(req.user)
        res.send(`welcome ${req.user.displayName}`)
    })
    signup.get('/google/auth',
        passport.authenticate('google', { scope: ['profile','email'] }));

    signup.get('/google/callback',
        passport.authenticate('google', { failureRedirect: '/failed' }),
        (req, res) => {
            // Successful authentication, redirect home.
            res.redirect('/pass');
        });
}