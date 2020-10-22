
const passport = require('passport');
require('dotenv').config();
const knex = require('../../models/database');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const Users = []

passport.serializeUser((user, done) => {
  console.log(user)
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log(user)
  done(null, user);
})


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:4000/google/callback"
},
  (accessToken, refreshToken, profile, done) => {
    // console.log(accessToken)

    console.log('this is user access',accessToken)
    knex('customers')
      .select('*')
      .where('email', profile._json.email)
      .then(data => {
        if (data.length < 1) {
          // console.log(data)
          knex('customers')
            .insert({
              'firstName': profile._json.given_name,
              'lastName': profile._json.family_name,
              'displayName': profile.displayName,
              'email': profile._json.email
            })
            .returning('*')
            .then(result => {
              // console.log(result);
              done(null, result[0])
            })
            .catch(err => console.log(err))

        }
        else {
          console.log('user is alredy exist');
          done(null, data[0]);
        }
      })
      .catch(err => console.log(err))

  }
));