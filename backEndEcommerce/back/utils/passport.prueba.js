import { Strategy } from "passport-local";
//import passport from "passport";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model.js";



passport.use('signup',
    new Strategy((username, password, done) => {
        UserModel.findOne({ username: username }, (err, user) => {
            if (err) throw err;
            if (!user) return done(null, false);
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) throw err;
                if (result === true) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        });
    })
);

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
    UserModel.findOne({ _id: id }, (err, user) => {
        const userInformation = {
            username: user.username,
        };
        cb(err, userInformation);
    });
});
