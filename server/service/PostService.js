import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';

import User from "../models/User.js"
import UserDto from '../dto/User.js'
import { sendActivationMail } from './MailService.js'
import { generateTokens, saveToken, removeToken, validateRefreshToken, findToken } from './TokenService.js'
import ApiError from '../exceptions/ApiError.js';

export const registration = async (email, password) =>  {
  const candidate = await User.findOne({ email })

  if (candidate) {
    throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует!`)
  }

  const hashPassword = await bcrypt.hash(password, 3)
  const activationLink = uuidv4()
  const user = await User.create({ email, password: hashPassword, activationLink })
  await sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

  const userDto = new UserDto(user)
  const tokens = generateTokens({ ...userDto })
  await saveToken(userDto.id,  tokens.refreshToken)

  return { ...tokens, user: userDto }
} 

export const activate = async (activationLink) => {
  const user = await User.findOne({ activationLink })

  if (!user) {
    throw ApiError.BadRequest('Некоректная ссылка активации!')
  }

  user.isActivated = true
  await user.save()
}

export const login = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw ApiError.BadRequest('Пользователь с таким email не был найден!')
  }

  const isPassEquals = bcrypt.compare(password, user.password)
  if (!isPassEquals) {
    throw ApiError.BadRequest('Неверный пароль!')
  }

  const userDto = new UserDto(user)
  const tokens = generateTokens({ ...userDto })
  await saveToken(userDto.id,  tokens.refreshToken)

  return { ...tokens, user: userDto }
}

export const logout = async (refreshToken) => {
  const token = removeToken(refreshToken)
  return token
}

export const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw ApiError.UnauthorizedError()
  }

  const userData = validateRefreshToken(refreshToken)
  const tokenFromDB = await findToken(refreshToken)
  if (!userData || !tokenFromDB) {
    throw ApiError.UnauthorizedError()
  }

  const user = await User.findById(userData.id)
  const userDto = new UserDto(user)
  const tokens = generateTokens({ ...userDto })
  await saveToken(userDto.id,  tokens.refreshToken)

  return { ...tokens, user: userDto }
}

export const getAllUsers = async () => {
  const users = await User.find()
  return users
}