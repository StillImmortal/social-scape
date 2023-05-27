import UserService from '../service/UserService.js'

// SIGN UP
export const signUp = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password, 
      picturePath,
      location,
      occupation,
    } = req.body

    console.log(req.body)

    const userData = await UserService.signUp(firstName, lastName, email, password, picturePath, location, occupation)
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    return res.json(userData)
  } catch (error) {
    next(error)
  }
}

// ACTIVATION
export const activation = async (req, res, next) => {
  try {
    const activationLink = req.params.link
    await UserService.activate(activationLink)
    return res.redirect(process.env.CLIENT_URL)
  } catch (error) {
    next(error)
  }
}


// SIGN IN
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const userData = await UserService.login(email, password)
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    return res.json(userData)
  } catch (error) {
    next(error)
  }
}

// SIGN OUT
export const signOut = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies
    const token = await UserService.signOut(refreshToken)
    res.clearCookie('refreshToken')
    res.json(token)
  } catch (error) {
    next(error)
  }
}

// REFRESH TOKEN
export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies
    const userData = await UserService.refresh(refreshToken)
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    return res.json(userData)
  } catch (error) {
    next(error)
  }
}

