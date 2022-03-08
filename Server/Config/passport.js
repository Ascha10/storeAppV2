const jwtStrategy = require("passport-jwt").Strategy; 
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require('../Models/User');

const options = {
  secretOrKey: process.env.SECRET_KEY,
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
};


module.exports = (passport) => {
  passport.use(new jwtStrategy(options, (jwt_payload, done) => {  
    console.log(jwt_payload);
    User.findById(jwt_payload.id) 
        .then((user) => {
          if (user) return done(null, user); 
          done(null, false);
        })
        .catch((err) => done(err, false));
    })
  )
};




