import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import PageHeader from '@/components/PageHeader';
import { Button, Col, Grid, Input, Progress, Row, Spacer, Text, useInput } from '@nextui-org/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/CheckOutForm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAccount } from 'wagmi';
import WalletConnectButton from '@/components/WalletConnectButton';

const Buy = () => {
  const { value, reset, bindings } = useInput("");
  const { address, isConnecting, isDisconnected } = useAccount()

  const validateEthereumAddress = (value: string) => {
    const regex = /^(0x)?[0-9a-fA-F]{40}$/;
    return regex.test(value);
  };

  const validateAmount = (value: string | number): boolean => {
    if (typeof value === "string") {
      const parsedValue = parseInt(value);
      console.log(parsedValue > 100)
      return parsedValue > 100;
    } else if (typeof value === "number") {
      console.log(value > 100)
      return value > 100;
    } else {
      return false;
    }
  };

  const [showAddressInput, setShowAddressInput] = useState<Boolean>(false)
  const [clientSecret, setClientSecret] = useState("pi_3NyVtHIB3FTgGfl10R9Xwnf3_secret_lWgrpbDDt0JeF95efv8zV0W08");

  const [step, setStep] = useState(0)
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [userAddress, setUserAddress] = useState('');
  const [amount, setAmount] = useState<any>(100);

  async function loadData() {
    setLoading(true)
    await setStripePromise(loadStripe('pk_test_51NPnyFIB3FTgGfl1zLFnY8OSeaJcUxt0npsV6WK3u94N2pe1dLjJIwasElC4hfDRPQmMCJ5SVUMTpFkus9CpV1gY00hCwurox8', {
      apiVersion: '2022-11-15', // Set your desired API version here
    }))
    setLoading(false)
  }

  const [addres, setAddres] = useState<String | undefined>(address ?? "")

  const stepHandler = async (e: number, custom?: any) => {
    if (e === 2) {
      // setAddres(address)
      if (custom) {
        setAddres(userAddress)
      } else {
        setAddres(address)
      }
      loadData()
    }
    if (e === 0) {
      setStep(0)
    }

    setStep(e)
  }

  return (
    <Fragment>
      <PageHeader title="Buy" />
      <Progress
        color={step === 3 ? "success" : "primary"}
        value={step === 0 ? 0 : step === 1 ? 30 : step === 2 ? 60 : 100}
        size="xs"
      />
      <Spacer y={2} />
      {step === 0 && <><Row>
        <Col span={10} >
          <Input
            css={{ width: "100%" }}
            bordered
            type='number'
            min={100}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            labelPlaceholder="Amount"
            color="primary"
            helperColor={validateAmount(amount) ? "success" : "error"}
            helperText={validateAmount(amount) ? "" : "Amount should be greater than 100"}
          />
        </Col>
        <Spacer x={0.5} />
        <Col span={2}>
          <Text h3>USDT</Text>
        </Col>
      </Row>
        <Spacer y={1} />
        <Row>
          <Col span={10} >
            <Input
              css={{ width: "100%" }}
              bordered
              readOnly
              label='Amout you pay'
              // placeholder="Amount you pay"
              initialValue="0"
              color="primary" />
          </Col>
          <Spacer x={0.5} />
          <Col span={2}>
            <Spacer y={1.5} />
            <Text h3>USD</Text>
          </Col>
        </Row>
        <Spacer y={1.8} />
        <Button color="primary"
          disabled={!validateAmount(amount)}
          css={{ width: "100%" }} onClick={() => stepHandler(1)}>
          PROCEED
        </Button>
      </>
      }
      {step === 1 && <>
        <Row>
          <Col span={1} onClick={() => setStep(0)}>
            <ArrowBackIcon color='primary' />
          </Col>
          <Col css={{ display: "flex", justifyContent: "center" }} span={11}>
            <Text h4 color="primary">Details</Text>
          </Col>
        </Row>
        <Spacer y={1} />

        <Row>
          <Col span={12} css={{ display: 'flex', flexDirection: "column", justifyContent: "center" }}>
            {/* <Col span={12}
            style={{
              display: "flex",
              flexDirection:"row",
              justifyContent: "center"
            }}
          > */}
            {!address && <WalletConnectButton size="lg" />}
            {/* </Col> */}
            {address &&
              <Button color='primary' style={{ width: "100%" }} onClick={() => stepHandler(2)}>
                Proceed with Connected Wallet
              </Button>
            }
            <Text style={{ textAlign: "center" }}>OR</Text>
            <Button color='primary' style={{ width: "100&" }} onClick={() => setShowAddressInput(!showAddressInput)}>
              Enter a wallet address
            </Button>
            {showAddressInput &&
              <>
                <Spacer y={1.6} />
                <Input
                  {...bindings}
                  css={{ width: "100%" }}
                  bordered
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                  labelPlaceholder="Enter your address"
                  color="primary"
                  helperColor={validateEthereumAddress(userAddress) ? "success" : "error"}
                  helperText={validateEthereumAddress(userAddress) ? "Correct Ethereum address" : "Enter a valid Ethereum address"}

                />
                <Spacer y={1.6} />
                <Button color='primary'
                  disabled={!validateEthereumAddress(userAddress)}
                  style={{ width: "100&" }} onClick={() => stepHandler(2, true)}>
                  Proceed
                </Button>
              </>
            }
          </Col>
        </Row>
        <Spacer y={1} />
        {/* <Button color="primary" css={{ width: "100%" }} onClick={() => stepHandler(2)}>
          Confirm
        </Button> */}
        <Spacer y={1.8} />
      </>
      }
      {step === 2 && <>
        <Row>
          <Col span={1} onClick={() => setStep(1)}>
            <ArrowBackIcon color='primary' />
          </Col>
          <Col css={{ display: "flex", justifyContent: "center" }} span={11}>
            <Text h4 color="primary">PAYMENT</Text>
          </Col>
        </Row>
        <Spacer y={1} />
        <Row>
          <Col span={12} >
            {stripePromise && (
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  value={amount}
                  currency={'USD'}
                  setStep={() => setStep(3)}
                  toAddres={addres}
                />
              </Elements>
            )}
          </Col>
          <Spacer x={0.5} />
        </Row>
        <Spacer y={1.8} />
      </>
      }
      {step === 3 && <>
        <Spacer y={1} />
        <Row>
          <Col span={12}  >
            <Text h3 color='success' css={{ textAlign: "center" }}> Success</Text>
          </Col>
        </Row>
        <Spacer y={1} />
        {/* <Col span={12}  css={{display:"flex",flexDirection:"column",justifyContent:"center"}}> */}
        <CheckCircleIcon sx={{ fontSize: "10rem", width: "100%" }} color='success' />
        <Button color="success" css={{ width: "100%" }} onClick={() => stepHandler(0)}>
          Go Back
        </Button>
        {/* </Col> */}
        <Spacer y={1.8} />
      </>
      }
    </Fragment>
  )
}

export default Buy