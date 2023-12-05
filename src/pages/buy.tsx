import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import PageHeader from '@/components/PageHeader';
import { Input,Button, Col, Grid, Progress, Row, Spacer, Text, useInput } from '@nextui-org/react';
import { Input as CustomInput, Popover, Radio, Modal, message, Typography, Alert } from "antd";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/CheckOutForm';
import { useAccount } from 'wagmi';
import WalletConnectButton from '@/components/WalletConnectButton';
import { ArrowDownOutlined, ArrowLeftOutlined, CheckCircleOutlined, DownOutlined } from '@ant-design/icons';
import tokenList from "../utils/tokenList.json";
const usd = {
  "ticker": "USD",
  "img": "https://cdn.moralis.io/eth/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
  "name": "USD Coin",
  "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  "decimals": 6
}

const Buy = () => {
  const { value, reset, bindings } = useInput("");
  const { address, isConnecting, isDisconnected } = useAccount()
  const [hash, setHash] = useState(null);
  console.log({ hash })

  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(usd);
  const [isOpen, setIsOpen] = useState(false);

  function openModal(asset: any) {
    // setChangeToken(asset);
    setIsOpen(true);
  }

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
  function modifyToken(i: any) {
    const token=tokenList[i]
    if(token.ticker==="USDT"){
 // setPrices(null);
    // setTokenOneAmount(null);
    // setTokenTwoAmount(null);
    // if (changeToken === 1) {
      setTokenOne(tokenList[i]);
      // fetchPrices(tokenList[i].address, tokenTwo.address)
      // } else {
      //   setTokenTwo(tokenList[i]);
      //   fetchPrices(tokenOne.address, tokenList[i].address)
      // }
      setIsOpen(false);
    }
  }

  const amountHandler=(e:any)=>{
    setAmount(e.target.value)

  }

  return (
    <Fragment>
      <PageHeader title="Buy" />
      <Progress
        color={step === 3 ? "success" : "gradient"}
        value={step === 0 ? 0 : step === 1 ? 30 : step === 2 ? 60 : 100}
        size="xs"
      />
      <Spacer y={2} />
      <Modal
        open={isOpen}
        footer={null}
        onCancel={() => setIsOpen(false)}
        title="Select a token"
        // className='modalList'
        style={{background:"black"}}
        centered
      >
        
        <div className="modalContent">
          {tokenList?.map((e, i) => {
            return (
              <div
                className="tokenChoice"
                style={{cursor:e.ticker!=="USDT" ? "not-allowed":"pointer"}}
                aria-disabled={e.ticker==="USDT"}
                key={i}
                onClick={() => modifyToken(i)}
              >
                <img src={e.img} alt={e.ticker} className="tokenLogo" />
                <div className="tokenChoiceNames">
                  <div className="tokenName">{e.name}</div>
                  <div className="tokenTicker">{e.ticker}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
      {step === 0 && <><Row>
        <Col span={12} >
          <div className="inputs">
            <CustomInput
            type='number'
              placeholder="0"
              value={amount}
              onChange={amountHandler}
              style={{ height: "6rem", fontSize: "xx-large",color:"white",background:"black" }}
            />
            <CustomInput placeholder="0"
              value={Number(amount)+(Number(amount)*3/100)} 
              disabled={true}
              style={{ height: "6rem", color: "white", fontSize: "xx-large",background:"#11151d" }}
            />
            <div className="switchButton"
            >
              <ArrowDownOutlined rev={""} className="switchArrow" />
            </div>
            <div className="assetOne" onClick={() => openModal(1)}>
              <img src={tokenOne?.img} alt="assetOneLogo" className="assetLogo"/>
              {tokenOne?.ticker}
              <DownOutlined rev={"ok"} />
            </div>
            <div className="assetTwo">
              <img src={tokenTwo.img} alt="assetOneLogo" className="assetLogo" />
              {tokenTwo.ticker}
              <DownOutlined rev={"ok"} />
            </div>
          </div>
        </Col>
      </Row>
        <Spacer y={1.8} />
        <Button 
          disabled={!validateAmount(amount)}
          color="gradient"
          css={{ width: "100%" }} onClick={() => stepHandler(1)}>
          PROCEED
        </Button>
      </>
      }
      {step === 1 && <>
        <Row>
          <Col span={1} onClick={() => setStep(0)}>
            <ArrowLeftOutlined rev={""} style={{color:"#ba59d9"}}/>
          </Col>
          <Col css={{ display: "flex", justifyContent: "center" }} span={11}>
            <Text h4 color="primary">Details</Text>
          </Col>
        </Row>
        <Spacer y={1} />

        <Row>
          <Col span={12} css={{ display: 'flex', flexDirection: "column", justifyContent: "center" }}>
            {!address && <WalletConnectButton size="lg" />}
            {address &&
              <Button color='gradient' style={{ width: "100%",color:"white" }} onClick={() => stepHandler(2)}>
                Proceed with Connected Wallet
              </Button>
            }
            <Text style={{ textAlign: "center" }}>OR</Text>
            <Button color='gradient' style={{ width: "100&" }} onClick={() => setShowAddressInput(!showAddressInput)}>
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
                <Button color='gradient'
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
            <ArrowLeftOutlined rev={""} style={{color:"#ba59d9"}}/>
          </Col>
          <Col css={{ display: "flex", justifyContent: "center" }} span={11}>
            <Text h4 color="gradient">PAYMENT</Text>
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
                  setHash={setHash}
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
        {hash ?
          <Row>
            <Typography
            >
              {hash}
            </Typography>
          </Row>
          : ""}
          <CheckCircleOutlined rev={""} style={{ fontSize: "10rem", width: "100%" }} color='success'/>
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