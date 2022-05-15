import { UserModel } from '../models/user.model.js'
import bcrypt from 'bcrypt'

export const getUser = async ({ email, password }) => {
  try {
    const user = await UserModel.findOne({ email })
    if (user) {
      const isValid = bcrypt.compareSync(password, user.password);
      if (isValid) {
        return user
      } else {
        const error = new Error('Password is not valid')
        error.code = 'PASSWORD_NOT_VALID'
        error.status = 401
        throw error
      }
    }
  } catch (err) {
    const error = new Error(err.message || 'User not found')
    error.status = 404
    error.code = err.code
    throw error
  }
}

export const getUserByeMail = async (email) => {
  console.log('ENTRA')
  try {
    const user = await UserModel.findOne({ email })
    if (user) {
     return true
    } else {
      return false
   }
  } catch (err) {
    console.log(err)
  }
}

export const createUser = async ({ firstName, lastName, email, password }) => {
  try {
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password
    })
    const res = await user.save()
    return res
  } catch (err) {
    const error = new Error('Error creating user')
    error.code = err.code
    throw error
  }
}