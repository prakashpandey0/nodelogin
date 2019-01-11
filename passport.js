const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt  = require('passport-jwt').ExtractJwt;
const conn = require('./config/conn');





const opt={}

opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opt.secretOrKey    = "node";


module.exports = passport => {
  passport.use(
    new JwtStrategy(opt, (jwt_payload, done) => {
      conn.query('select * from `users` where name = ? ', [jwt_payload.name], (error, results, fields) =>{
        if(error) throw error
        else{
          const data = JSON.parse(JSON.stringify(results));
          console.log(data[0].name)
          return done(null, results);
        }
      })
    })
  )
}
