import jwt from 'jsonwebtoken'
import { createUser, getUser, getUserByeMail } from '../db/user.queries.js'
import bcrypt from 'bcrypt'


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
  } catch (error) {
    next(error)
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
  } catch (error) {
    error.status = 500
    next(error)
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
      const error = new Error('Token is required')
      error.status = 401
      error.code = 'UNAUTHORIZED'
      res.send(error)
    }
  } catch (error) {
    next(error)
  }
}




  

  










