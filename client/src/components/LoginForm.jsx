import { useState } from "react"
import { 
  Box, 
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme

} from "@mui/material"
import { EditOutlined } from "@mui/icons-material"
import { Formik } from "formik"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Dropzone from "react-dropzone"

import { setLogin } from "../state"


const registerSchema = yup.object().shape({
  firstName: yup.string().required("Обязательное поле"),
  lastName: yup.string().required("Обязательное поле"),
  email: yup.string().email("Неверная почта").required("Обязательное поле"),
  password: yup.string().required("Обязательное поле"),
  location: yup.string(),
  occupation: yup.string(),
  picture: yup.string(),
})

const loginSchema = yup.object().shape({
  email: yup.string(),
  password: yup.string()
})

const initialValuesRegister = {
  firstName: "", 
  lastName: "", 
  email: "", 
  password: "", 
  location: "", 
  occupation: "", 
  picture: "", 
}

const initialValuesLogin = {
  email: "", 
  password: "", 
}

const LoginForm = () => {
  const [pageType, setPageType] = useState("login")
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const isNonMobileScreens = useMediaQuery("(min-width: 768px)")
  const { palette } = useTheme()
  const isLogin = pageType === "login"
  const isRegister = pageType === "register"

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData()
    for (let value in values) {
      formData.append(value, values[value])
    }

    if (values.picture) formData.append("picturePath", values.picture.name)

    for (const value of formData.values()) {
      console.log(value);
    }

    const savedUserResponse = await fetch(
      "http://localhost:5000/auth/sign-up",
      {
        method: "POST",
        body: formData
      }
    )
    const savedUser = await savedUserResponse.json()
    onSubmitProps.resetForm()

    if (savedUser) {
      setPageType("login")
    }
  }

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(
      "http://localhost:5000/auth/sign-in",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      }
    )
    const loggedIn = await loggedInResponse.json()
    onSubmitProps.resetForm()

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token
        })
      )
      navigate("/")
    }
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps)
    if (isRegister) await register(values, onSubmitProps)
  }

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="flex w-full md:w-3/4 flex-col gap-5"
        >
          <Box
            className="grid gap-4 grid-cols-4"
            sx={{
              "& > div": { gridColumn: isNonMobileScreens ? undefined : "span 4" }
            }}
          >
            {isRegister && (
              <>
                <TextField 
                  label="Имя"
                  name="firstName"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  className="col-span-2"
                />

                <TextField 
                  label="Фамилия"
                  name="lastName"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  className="col-span-2"
                />  

                <TextField 
                  label="Местоположение"
                  name="location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  className="col-span-4"
                />  

                <TextField 
                  label="Профессия"
                  name="occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                  helperText={touched.occupation && errors.occupation}
                  className="col-span-4"
                />  

                <Box
                  className="col-span-4 rounded-[4px] p-4"
                  border={`1px solid ${palette.neutral.medium}`}
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        className="p-4 hover:cursor-pointer"
                        border={`2px dashed ${palette.primary.main}`}
                      >
                        <input 
                          {...getInputProps()}
                        />
                        {!values.picture ? (
                          <Typography
                            sx={{ color: palette.neutral.main }}
                          >
                            Добавить фото
                          </Typography>
                        )
                        : (
                          <div
                            className="flex-between"
                          >
                            <p>
                              {values.picture.name}
                            </p>
                            <EditOutlined />
                          </div>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField 
              label="Почта"
              type="email"
              name="email"
              required={isRegister ? true : false}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              className="col-span-4"
              InputLabelProps={{ shrink: true }}
            />  

            <TextField 
              label="Пароль"
              type="password"
              name="password"
              required={isRegister ? true : false}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              className="col-span-4"
              InputLabelProps={{ shrink: true }}
            />  
          </Box>
          <Box 
            className="flex flex-col items-center gap-2"
          >
            <Button
              type="submit"
              className="w-full mx-8 p-4"
              sx={{
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main }
              }}
            >
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login")
                resetForm()
              }}
              sx={{
                textAlign: "center",
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light
                }
              }}
            >
              {isLogin ? "У меня нет акканута" : "У меня уже есть аккаунт"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default LoginForm