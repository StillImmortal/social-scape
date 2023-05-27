import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';

import User from "../models/User.js"
import UserDto from '../dto/User.js'
import ApiError from '../exceptions/ApiError.js';
import TokenService from './TokenService.js';
import { sendActivationMail } from './MailService.js';

class UserService {
  async signUp(firstName, lastName, email, password, picturePath, location, occupation) {
    const candidate = await User.findOne({ email })

    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует!`)
    }
  
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuidv4()

    const user = await User.create({ firstName, lastName, email, password: hashPassword, activationLink, picturePath, location, occupation })
    await sendActivationMail(email, `${process.env.SERVER_URL}/auth/activate/${activationLink}`)
  
    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })
    await TokenService.saveToken(userDto.id,  tokens.refreshToken)
    
    return { ...tokens, user: userDto }
  } 

  async activate(activationLink) {
    const user = await User.findOne({ activationLink })
  
    if (!user) {
      throw ApiError.BadRequest('Некоректная ссылка активации!')
    }
  
    user.isActivated = true
    await user.save()
  }

  async login(email, password) {
    const user = await User.findOne({ email })
    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким email не был найден!')
    }
  
    const isPassEquals = bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль!')
    }
  
    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })
    await TokenService.saveToken(userDto.id,  tokens.refreshToken)
  
    return { ...tokens, user: userDto }
  }

  async signOut (refreshToken) {
    const token = TokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
  
    const userData = TokenService.validateRefreshToken(refreshToken)
    const tokenFromDB = await TokenService.findToken(refreshToken)
    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError()
    }
  
    const user = await User.findById(userData.id)
    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })
    await TokenService.saveToken(userDto.id,  tokens.refreshToken)
  
    return { ...tokens, user: userDto }
  }
}

export default new UserService()