import { useState} from "react"
import {
  Box,
  IconButton,
  useMediaQuery
} from "@mui/material"
import {
  DarkMode,
  LightMode,
} from "@mui/icons-material"
import { useSelector, useDispatch } from "react-redux"

import { auth } from "../assets"
import BackgroundGradient from "../components/BackgroundGradient"
import LoginForm from "../components/LoginForm"
import { setMode } from "../state"

const Login = () => {
  const mode = useSelector((state) => state.mode)
  const dispatch = useDispatch()
  const isNonMobileScreens = useMediaQuery("(min-width: 768px)")

  const AuthPreview = () => {
  return (
    <Box
      className="flex-center flex-col gap-4"
    >
      <h1 className="auth-text-gradient text-4xl md:text-5xl 2xl:text-6xl 3xl:text-7xl  font-extrabold whitespace-nowrap">
        Social Scape
      </h1>
      <p className="auth-subText lg:text-lg font-semibold text-center max-w-[95%]">
        Присоединяйтесь к нам и открывайте новые горизонты социального взаимодействия с помощью AI.
      </p>
    </Box>
  )
}

  return (
    <Box 
      className={`relative overflow-x-hidden  ${isNonMobileScreens ? "w-screen h-screen flex-center" : "min-h-screen h-full"}`}
    > 
      <BackgroundGradient bgHeight={"h-full"} blurHeight={"h-full"} />
      <Box
        className="max-w-7xl w-full h-full flex-between z-50 px-4 py-6"
      >
        {isNonMobileScreens && 
          <Box
            className="w-[48%] h-full flex flex-col items-center justify-center gap-12"
          >
            <AuthPreview />
            <img 
              src={auth} 
              className="max-h-[50%]"
            />
          </Box>
        }

        <Box
        className={`${isNonMobileScreens ? "w-[48%] justify-center" : "w-full pb-4"} h-full z-50 flex items-center flex-col gap-12 pt-8`}
        >
          {!isNonMobileScreens && <AuthPreview />}
          <LoginForm />
        </Box>
      </Box>
      <Box 
        className={`absolute z-50 right-6 top-4`}
      >
        <IconButton
          onClick={() => dispatch(setMode())}
        >
          {mode === "light" ? (<DarkMode />) : (<LightMode />)}
        </IconButton>
      </Box>
    </Box>
  )
}

export default Login