//import npm package
const
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

//import function
import config from './index';

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.SECRETORKEY;

//import model
import { user, admin } from '../model';

export const v1 = (passport) => {
    passport.use("v1",
        new JwtStrategy(opts, async function (jwt_payload, done) {
            user.findById(jwt_payload._id, function (err, users) {
                if (err) { return done(err, false) }
                else if (users) {
                    let data = {
                        id: users._id,
                        parentId: users.parentId,
                        email: users.email
                    }
                    return done(null, data);
                }
                return done(null, false)
            })
        })
    )
}

export const v2 = (passport) => {
    passport.use("v2",
        new JwtStrategy(opts, async function (jwt_payload, done) {
            admin.findById(jwt_payload._id, function (err, user) {
                if (err) { return done(err, false) }
                else if (user) {
                    let data = {
                        id: user._id,
                    }
                    return done(null, data);
                }
                return done(null, false)
            })
        })
    )
}
