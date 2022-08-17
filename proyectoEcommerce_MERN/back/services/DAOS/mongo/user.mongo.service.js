import "../../../db/db.js";
import { UserModel } from '../../../models/user.model.js'
import bcrypt from 'bcrypt'
import logger from '../../../utils/logger.js';


class User {
    constructor() { }

    async getUser({ email, password }) {
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
                    console.log(error)
                    return false
                }
            }
        } catch (err) {
            const error = new Error(err.message || 'User not found')
            error.status = 404
            error.code = err.code
            console.log(error)
            return false
        }
    }

    async getUserByeMail(email) {
        try {
            const user = await UserModel.findOne({ email })
            if (user) {
                return user
            } else {
                return false
            }
        } catch (err) {
            logger.error(`${err}-Error in geting usermail`)
        }
    }

    async createUser({ firstName, lastName, direction, age, prefix, phone, email, password }) {
        try {
            const user = await UserModel.create({
                firstName,
                lastName,
                direction,
                age,
                prefix,
                phone,
                email,
                password
            })
            const res = await user.save()
            return res
        } catch (err) {
            const error = new Error('Error creating user')
            error.code = err.code
            logger.error(error)
        }
    }
}

export default User;



