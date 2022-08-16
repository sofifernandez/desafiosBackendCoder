import jwt from 'jsonwebtoken'
import User from '../services/user.services.js';
const u = User.initInstancia();


export const verifyToken =  async (req, res, next) => {
  try {
    if (req.session.token) {
      const token = req.headers.authorization?.split(' ')[1] || req.session.token
      jwt.verify(token, process.env.API_SECRET, function async(err, decode) {
        if (err) {
          const error = new Error('Not authorized')
          error.status = 401
          error.code = 'UNAUTHORIZED'
          throw error
        }
        req.user = decode      
        next()
      })
    } else {
      const error = new Error('Not authorized')
      error.status = 401
      error.code = 'UNAUTHORIZED'
      res.send(error)
      throw error
    }
  } catch (error) {
    next(error)
  }
}

export const isAdmin = async (req, res, next) => {
  try {
    const user = await u.getUserByeMail(req.user.email);
    if (user.role === 'admin') {
      next();
    } else {
      const error = new Error('Not authorized')
      error.status = 401
      error.code = 'UNAUTHORIZED'
      res.send(error)
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};

