import jwt from 'jsonwebtoken'
import User from '../services/user.services.js';
const u = User.initInstancia();

import bcrypt from 'bcrypt'
import logger from '../utils/logger.js';
import { mailNuevoUsuario } from './notification.controllers.js';
import minimist from "minimist";
const argv = minimist(process.argv.slice(2));
const { exp } = argv;


/* -------------------------------------------------------------------------- */
/*                                   SIGNUP                                   */
/* -------------------------------------------------------------------------- */

export const signUp = async (req, res, next) => {
  const { firstName, lastName, direction, age, prefix, phone, email, password } = req.body.signUpInfo
  const alreadyExist = await u.getUserByeMail(email)
  try {
    if (firstName && lastName && email && password && direction &&age && prefix && phone && !alreadyExist) {
      const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
      const user = await u.createUser({ firstName, lastName, direction, age, prefix, phone, email, password: hashPassword })
      mailNuevoUsuario(user)
      const userToken = jwt.sign({
        id: user._id,
        name: user.firstName + ' ' + user.lastName,
        email: user.email,
        timestamp: new Date().toISOString(),
        role: user.role
      }, process.env.API_SECRET, { expiresIn: exp })
      req.session.token = userToken
      res.send({
        token: userToken,
        user: {
          id: user._id,
          name: user.firstName + ' ' + user.lastName,
          email: user.email,
          role: user.role
        }
      })
    } else {
      res.send(false)
    }
  } catch (err) {
    logger.error(`${err}-Error signing up client`)
    next(err)
  }
}
  
  /* -------------------------------------------------------------------------- */
  /*                                    LOGIN                                   */
  /* -------------------------------------------------------------------------- */
  
export const login = async (req, res, next) => {
  const { email, password } = req.body.logInInfo
  try {
    const user = await u.getUser({ email, password })
    if (user) {
      const userToken = jwt.sign({
        id: user._id,
        name: user.firstName + ' ' + user.lastName,
        email: user.email,
        timestamp: new Date().toISOString(),
        role: user.role
      }, process.env.API_SECRET, { expiresIn: exp })

      req.session.token = userToken
      res.send({
        token: userToken,
        user: {
          id: user._id,
          name: user.firstName + ' ' + user.lastName,
          email: user.email,
          role: user.role
        }
      })
    } else {
      res.send(false)
    }
  } catch (err) {
    err.status = 500
    logger.error(`${err}-Error in sign in`)
    next(err)
  }
}

  /* -------------------------------------------------------------------------- */
  /*                                    LOGOUT                                   */
/* -------------------------------------------------------------------------- */
export const logout = (req, res) => {
  //jwt.destroy(); --> esto no funciona, dice que no existe la función
  res.cookie("connect.sid", '', { maxAge: 1 }) //-> elimino el contenido de la cookie y además le doy una expiración de 1ms
  res.send('destroy') //--> tengo que enviar algo, cualquier cosa, porque sino no funciona
}



  /* -------------------------------------------------------------------------- */
  /*                      AUTORIZATION                                          */
  /* -------------------------------------------------------------------------- */

export const verifyToken = (req, res, next) => {
  try {
    if(req.session.token){
      const token = req.headers.authorization?.split(' ')[1] || req.session.token
      jwt.verify(token, process.env.API_SECRET, function (err, decode) {
        if (err) {
          const error = new Error('Not authorized')
          error.status = 401
          throw error
        }
        req.user = decode
        res.send({ user: req.user })
      })
    } else {
      const err = new Error('Token is required')
      err.status = 401
      err.code = 'UNAUTHORIZED'
      res.send(err)
    }
  } catch (err) {
    logger.error(`${err}-Error authentication failed`)
    next(err)
  }
}




  

  










