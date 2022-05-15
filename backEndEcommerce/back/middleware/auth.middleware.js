import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  try {
    if(req.session.token){
      const token = req.headers.authorization?.split(' ')[1] || req.session.token
      jwt.verify(token, process.env.API_SECRET, function (err, decode) {
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
export default verifyToken;