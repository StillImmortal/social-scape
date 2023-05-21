import ApiError from '../exceptions/ApiError.js'
import { validateAccessToken } from '../service/TokenService.js'

export const verifyToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError())
    }

    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) {
      return next(ApiError.UnauthorizedError())
    }

    const userData = validateAccessToken(accessToken)
    if (!userData) {  
      return next(ApiError.UnauthorizedError())
    }

    console.log(userData)
    req.user = userData
    next()
  } catch (error) {
    return next(ApiError.UnauthorizedError())
  }
}