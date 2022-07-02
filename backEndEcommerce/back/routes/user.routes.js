import express from 'express'
import * as userController from '../controllers/user.controller.js'

//mail y contraseña de prueba:
//sofiafernandez03@gmail.com
//pass: sofi1234

const userRouter = express.Router();

userRouter.post('/login', userController.login) //  api/user/login
userRouter.get('/logout', userController.logout)
userRouter.post('/signUp', userController.signUp)
userRouter.post('/verify', userController.verifyToken)


export default userRouter
