import express from 'express'
import {
  login,
  verifyToken,
  signUp,
  logout
} from '../controllers/user.controller.js'


const userRouter = express.Router();

userRouter.post('/login', login) //  api/user/login
userRouter.get('/logout', logout)
userRouter.post('/signUp', signUp)
userRouter.post('/verify', verifyToken)


export default userRouter
