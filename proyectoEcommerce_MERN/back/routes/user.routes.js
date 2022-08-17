import express from 'express'
import * as userController from '../controllers/user.controller.js'


//usuario y contraseña de administador:
//admin
//pass: administrator!123

const userRouter = express.Router();

userRouter.post('/login', userController.login) 
userRouter.get('/logout', userController.logout)
userRouter.post('/signUp', userController.signUp)
userRouter.post('/verify', userController.verifyToken)


export default userRouter
