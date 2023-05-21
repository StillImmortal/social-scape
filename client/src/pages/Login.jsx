import { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirm_password: ''
  })

  const [validFields, setValidFields] = useState({
    email: true,
    password: true,
    confirm_password: true,
  })

  const VALID_REGEX = {
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    confirm_password: new RegExp(`^${credentials.password}$`)
  }

  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name] : e.target.value
    })
  }

  const handleInput = ({target}) => {
    const isValid = target.value.match(VALID_REGEX[target.name])

    setValidFields({
      ...validFields,
      [target.name] : isValid
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const isMatch = credentials.password === credentials.confirm_password

    if (!isMatch) {
      setMessage('Register failed!')
    } else {
      setMessage('Register completed seccessfully!')
    }
  }

  return (
    <section className='h-screen w-screen flex-center flex-col gap-6'>
      {message && (
        <p1 className='mb-10 text-lg font-bold'>
          {message}
        </p1>
      )}
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '30ch' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onSubmit={handleSubmit}
      >
        <h2 className='font-bold text-2xl mb-4 text-blue-400'>Register</h2>
        <TextField
          type='email'
          required
          label='Email'
          name='email'
          value={credentials.email}
          onChange={handleChange}
          onInput={handleInput}
          error={!validFields.email}
        />
        <TextField
          type='password'
          required
          label='Password'
          name='password'
          value={credentials.password}
          onChange={handleChange}
          onInput={handleInput}
          error={!validFields.password}
        />
        <TextField
          type='password'
          required
          label='Confirm Password'
          name='confirm_password'
          value={credentials.confirm_password}
          onChange={handleChange}
          onInput={handleInput}
          error={!validFields.confirm_password}
        />
        <Button 
          type='submit'
          variant='outlined'
          sx={{
            mt: '16px',
            width: '15ch'
          }}
        >
          Submit
        </Button>
      </Box>
    </section>
  )
}

export default Login