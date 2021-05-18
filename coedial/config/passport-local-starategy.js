const  passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//authentication using passport
passport.use(newLocalStrategy(
    {
        usernameField:email
    },
    function(email,password,done){
        //find a user and establish the identity
        User.findOne({email: email}, function (err,user)
        {
            if(err) {console.log('error in finding in user --> passport');return done(err);}
            if(!user || user.password!=password){
                console.log('Invalid UsernamePassword');
                return done(null,false);
            }
            else return done(null, user);
        });
    }
));

//seriallizing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})
//deserializing the user from the key in cookies
passport.deserializeUser(function(id,done){
     User.findById(id, function(err,user){
        if(err) {console.log('error in finding in user --> passport');return done(err);}
        return done(null,user);
     })
})

module.exports = passport;






