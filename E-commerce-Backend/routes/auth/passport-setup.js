const passport = require('passport');
require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const Users=[]

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    console.log(user);
    done(null, user);

  });



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback"
},
    (accessToken, refreshToken, profile, done) => {
      const isUserExist=Users.find((user)=> user.email===profile._json.email )
      if(!isUserExist){
        let user={
          firstName:profile._json.given_name,
          lastName:profile._json.family_name,
          displayName:profile.displayName,
          googleID: profile.id,
          email: profile._json.email
        }
        console.log(user)
        Users.push(user)
       done(null,user)
      }
      else{
        console.log('user is alredy exist');
         done(null, isUserExist);
      }
    }
));