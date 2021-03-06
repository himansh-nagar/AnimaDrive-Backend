
module.exports = (signup, passport, isLoggedIn) => {
    const jwt = require('jsonwebtoken');
    const signInMail = require('../../nodeMailer').signInMail;
    const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
    signup.get('/failed', (req, res) => {
        res.status(401).json({
            success: false,
            message: "user failed to authenticate."
        });
    })

    signup.get("/logout", (req, res) => {
        req.logout();
        res.redirect(CLIENT_HOME_PAGE_URL);
    });

    signup.get('/authSuccess', (req, res) => {
        if (req.user) {
            console.log(req.user, 'in success')
            const token = jwt.sign(req.user,"sushant")
            res.status(200).json({
                success: true,
                message: "user has successfully authenticated",
                user: req.user,
                token: token
            });
        }
        else {
            res.status(401)
            console.log('user is not signed in')
        }
    })
    signup.get('/google/auth',
        passport.authenticate('google', { scope: ['profile', 'email'] }));

    signup.get('/google/callback',
        passport.authenticate('google', { failureRedirect: '/failed' }),
        (req, res) => {
            // Successful authentication, redirect home.
            signInMail(req.user)
            res.redirect(CLIENT_HOME_PAGE_URL);
        });
}