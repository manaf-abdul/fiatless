import PageHeader from '@/components/PageHeader'
import React, { Fragment, useState } from 'react'
import { Spacer, Text } from '@nextui-org/react'
import { Card } from '@nextui-org/react'
import { useRouter } from 'next/router'
import OTPInputGroup from '@/components/OtpInput'

const SignUp = () => {
    // const router = useRouter();
    // const { register, handleSubmit } = useForm();

    const router = useRouter()

    const onSubmit = async () => {
        // TODO: Send the login data to your backend API

    }
    let PIN = window.localStorage.getItem("PIN")
    console.log("PIN", PIN)

    return (
        <Fragment>
            <PageHeader title="Verify" auth={true} />

            <Spacer y={2.9} />

            <Card css={{ marginTop: '$12' }} bordered>
                <Card.Body>
                    <Spacer y={1.6} />
                    {/* <OtpInput
            inputStyle={{ width: "100%" }}
            containerStyle={{width:"50%"}}
            value={otp}
            onChange={setOtp}
            
            numInputs={4}
            renderSeparator={<span></span>}
            renderInput={(props) => <input {...props} />}
          /> */}
                    <OTPInputGroup />
                    {!PIN ?
                        <Text color='primary' css={{ alignText: "center" }}>
                            Create A Pin
                        </Text>
                        :
                        <Text color='primary' css={{ align: "center" }}>
                            Enter PIN
                        </Text>
                    }
                    {/* <Button
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
          </Button> */}

                    <Spacer y={0.8} />
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default SignUp
