import PageHeader from '@/components/PageHeader'
import PersonIcon from '@mui/icons-material/Person'
import React, { Fragment, useState } from 'react'
import { Button, Input, Loading, Text, Divider, Link, Image, Spacer } from '@nextui-org/react'
import { Card } from '@nextui-org/react'
import { useRouter } from 'next/router'

import { Box } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import { LoginUserData } from '@/http/auth'
const Login = () => {
  // const router = useRouter();
  // const { register, handleSubmit } = useForm();
  const [loadingData, setLoading] = useState(false)
  const [UserName, SetUserName] = useState('')
  const [Password, setPassword] = useState('')
  const [Err, setErr] = useState(String)

  const router = useRouter()

  const onSubmit = async() => {
    // TODO: Send the login data to your backend API
    try {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (Password.trim() === '' || UserName.trim() === '') {
        setErr('provide valid information')
      } else if (!emailRegex.test(UserName)) {
        setErr('provide valid email')
      } else if (Password.trim().length < 6) {
        setErr('password should be at least 5 letters')
      } else {
        setLoading(true)
        //check with axios
        await LoginUserData(UserName, Password)
          .then(({ data }:any) => {
            console.log(data.access_token)
            console.log(data.refresh_token)
            localStorage.setItem('access_token', data?.data?.access_token)
            localStorage.setItem('refresh_token', data?.data?.refresh_token)
            setLoading(false)
            router.push('/')
          })
         
      }
    } catch (error: any) {
      setErr('Email/password was incorrect')

    } finally {
      setLoading(false)
    }
  }

  return (
    <Fragment>
      <PageHeader title="SignIn" />

      <Spacer y={2.9} />

      <Card css={{ marginTop: '$12' }} bordered>
        <Card.Body>
          <Spacer y={1.6} />
          <Input
            value={UserName}
            onChange={e => {
              setErr('')

              SetUserName(e.target.value)
            }}
            color="warning"
            type="email"
            bordered
            labelPlaceholder="Email"
            contentRight={
              <PersonIcon
                className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                style={{ color: '#ffb900' }}
              />
            }
          />

          <Spacer y={1.9} />
          <Input.Password
            value={Password}
            onChange={e => {
              setErr('')
              setPassword(e.target.value)
            }}
            color="warning"
            bordered
            labelPlaceholder="Password"
            visibleIcon={<LockOpenIcon style={{ color: '#ffb900' }} />}
            hiddenIcon={<LockIcon style={{ color: '#ffb900' }} />}
          />
          <Text
            size={13}
            css={{ textAlign: 'center', marginTop: '$10', marginBottom: '$10', color: 'Red' }}
          >
            {Err}
          </Text>

          <Button
            onClick={onSubmit}
            color="warning"
            css={{ marginTop: '$10', width: '100%' }}
            data-testid="qrcode-button"
            disabled={loadingData}
          >
            {loadingData ? (
              <Loading
                style={{
                  marginTop: '10px'
                }}
                size="sm"
              />
            ) : (
              'Login'
            )}
          </Button>

          <Spacer y={0.8} />
        </Card.Body>
      </Card>
    </Fragment>
  )
}

export default Login
