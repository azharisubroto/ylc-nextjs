import React, { useState } from 'react'
import fetchJson from '@/lib/fetchJson'
import useUser from '@/lib/useUser'
import dynamic from 'next/dynamic'

//import Container from '@material-ui/core/Container'
//import Box from '@material-ui/core/Box'
//import Head from 'next/head'
//import TextField from '@material-ui/core/TextField'
//import Button from '@material-ui/core/Button'
const Container = dynamic(import('@material-ui/core/Container'), { ssr: false })
const Box = dynamic(import('@material-ui/core/Box'), { ssr: false })
const Head = dynamic(import('next/head'), { ssr: false })
const TextField = dynamic(import('@material-ui/core/TextField'), { ssr: false })
const Button = dynamic(import('@material-ui/core/Button'), { ssr: false })

const Login = () => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const { mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: true
  })

  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState('')

  /**
   * Handle Login
   */
  const onSubmit = async () => {
    setLoading(true)

    const payload = {
      username: values.username,
      password: values.password
    }

    try {
      await mutateUser(
        fetchJson('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
      ).then(() => {
        setLoading(false)
      })
    } catch (error) {
      //console.error('An unexpected error happened:', error)
      setErrorMsg('Credentials failed, please check your login details again.')
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Member Login - Your Life Choices</title>
      </Head>
      <Container maxWidth="lg">
        <main>
          <h1 className="text-center">Login to YourLifeChoices Account</h1>

          <Box my={3}>
            <TextField
              type="text"
              label="Email/Username"
              variant="outlined"
              color="primary"
              onChange={handleChange('username')}
              value={values.username}
              fullWidth
            />
          </Box>

          <Box my={3}>
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              color="primary"
              onChange={handleChange('password')}
              value={values.password}
              fullWidth
            />
          </Box>

          {errorMsg && <div style={{ marginBottom: 20, color: 'red' }}>{errorMsg}</div>}

          <Button
            color="primary"
            disableElevation={true}
            variant="contained"
            size="large"
            type="submit"
            onClick={() => {
              onSubmit()
            }}
            fullWidth>
            {loading == true ? 'Loading' : 'Sign In'}
          </Button>
        </main>
      </Container>
    </>
  )
}

export default Login
