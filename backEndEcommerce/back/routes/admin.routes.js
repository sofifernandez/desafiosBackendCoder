import express from 'express';
import Product from '../controllers/product.controller.js';
import * as AuthController from "../controllers/auth.controller.js";
import passport from "../utils/passport.utils.js";
import { UserModel } from "../models/user.model.js";
//import bcrypt from "bcrypt";
import passportPrueba from "../utils/passport.prueba.js";


const p = new Product();
const routerAdmin = express.Router();


//*********************************************************************************************************
//-------- ADMIN ------------------------------------------------------------------------------------------

// LOG IN-----------------------------------------------
routerAdmin.post("/login", () => {
  console.log('ENTRA')
  passport.authenticate("login", { failureRedirect: "/api/admin/failLogin" }),
    AuthController.postLogin
    
});
routerAdmin.get("/failLogin", AuthController.failLogin);

///SIGNUP----------------------------------------------
// routerAdmin.post("/signup",
//   passport.authenticate("signup", { failureRedirect: "/api/admin/failSignup" }),
//   AuthController.postSignup
// );
// routerAdmin.get("/failSignup", AuthController.failSignup);



routerAdmin.post("/signup", (req, res) => {
  console.log('---------------------------------------------------------------------', req.body)
  UserModel.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      //const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new UserModel({
        username: req.body.username,
        password: req.body.password,
      });
      console.log(newUser)
      await newUser.save();
      res.send("User Created");
    }
  });
});


//GET USER
routerAdmin.get('/user', (req, res) => {
  res.send(req.user)
})

/// LOGOUT -----------------------------------------------------
routerAdmin.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/')
})

routerAdmin.get("/logout", AuthController.logout);




export default routerAdmin;