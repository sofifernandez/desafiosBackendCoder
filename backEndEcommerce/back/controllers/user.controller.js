import jwt from 'jsonwebtoken'
import { createUser, getUser, getUserByeMail } from '../db/user.queries.js'
import bcrypt from 'bcrypt'
import logger from '../utils/logger.js';


/* -------------------------------------------------------------------------- */
/*                                   SIGNUP                                   */
/* -------------------------------------------------------------------------- */

export const signUp = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body.signUpInfo
  const alreadyExist = await getUserByeMail(email)
  try {
    if (firstName && lastName && email && password && !alreadyExist) {
      const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
      const user = await createUser({ firstName, lastName, email, password: hashPassword })
      const userToken = jwt.sign({
        id: user._id,
        name: user.firstName + ' ' + user.lastName,
        email: user.email,
        timestamp: new Date().toISOString()
      }, process.env.API_SECRET, { expiresIn: '1h' })
      req.session.token = userToken
      res.send({
        token: userToken,
        user: {
          id: user._id,
          name: user.firstName + ' ' + user.lastName,
          email: user.email
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
    const user = await getUser({ email, password })
    if (user) {
      const userToken = jwt.sign({
        id: user._id,
        name: user.firstName + ' ' + user.lastName,
        email: user.email,
        timestamp: new Date().toISOString()
      }, process.env.API_SECRET, { expiresIn: '10m' })

      req.session.token = userToken
      res.send({
        token: userToken,
        user: {
          id: user._id,
          name: user.firstName + ' ' + user.lastName,
          email: user.email
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
  // console.log(res.cookie('connect.sid'))
  // console.log(req.headers.cookie)
  res.cookie("connect.sid", ' ', { maxAge: 100 })
  jwt.destroy()

  }



  /* -------------------------------------------------------------------------- */
  /*                      MIDDLEWARE AUTORIZE                                   */
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
      logger.error(`${err}-Error authentication failed`)
      res.send(err)
    }
  } catch (err) {
    logger.error(`${err}-Error authentication failed`)
    next(err)
  }
}




  

  










