
module.exports = (signup,passport, isLoggedIn) => {
    require('./passport-setup')
    signup.get('/failed', (req, res) => {
        res.send('failed to signin')
    })
    signup.get('/pass', (req, res) => {
        res.send(`welcome ${req.user.displayName}`)
    })
    signup.get('/google',
        passport.authenticate('google', { scope: ['profile'] }));

    signup.get('/google/callback',
        passport.authenticate('google', { failureRedirect: '/failed' }),
        (req, res) => {
            // Successful authentication, redirect home.
            res.redirect('/pass');
        });
}