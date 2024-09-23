const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userModel = require('../modals/userModel')
const JWT_SECRET = process.env.JWT_SECRET;

const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : JWT_SECRET
}


passport.use(
    new JwtStrategy(opts, async(jwt_payload, done) => {
        try{
            console.log("jwt payload",jwt_payload);
            const user = await userModel.findById(jwt_payload._id)
            if(user){
                return done(null, user);
            }
            return done(null, false);            
        }catch(err){
            return done(err,false);
        }
    })
);

module.exports = passport;