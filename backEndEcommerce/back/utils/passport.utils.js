import { Strategy } from "passport-local";
import passport from "passport";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model.js";

passport.use(
    "signup",
    new Strategy(
        {
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            try {
                console.log('entra en statregy')
                const userExists = await UserModel.findOne({ username: username }); //buscar por username en la DB
                if (userExists) { //si existe
                    console.log("Usuario existe");
                    return done(null, false);
                } else { //si no, crearlo
                    const usuario = req.body
                    const newUser = {
                        username: usuario.username,
                        password: bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10), null),
                    };
                    newUser.created_at = new Date()
                    const user = await UserModel.create(newUser);
                    return done(null, user);
                }

            } catch (error) {
                console.log('Error ', error);
            }
        }
    )
);

passport.use(
    "login", 
    new Strategy(async (username, password, done) => {
        try {
            console.log('entra a login')
            const user = await UserModel.findOne({ username: username }); 
            if (!user) {
                console.log("Usuario no encontrado!");
                return done(null, false);
            }
            const isValid = bcrypt.compareSync(password, user.password); //comparar la contraseña
            if (isValid) {
                return done(null, user); //si es válida, devolver el usuario
            } else {
                return done(null, false); 
            }
        } catch (error) {
            console.log(error);
            return done(null, error);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id, done);
});

// passport.deserializeUser((id, done) => {
//     UserModel.findOne({ _id: id }, (err, user) => {
//         cb(err, user)
//     })
// })

export default passport;