import PageHeader from '@/components/PageHeader'
import WalletConnectButton from '@/components/WalletConnectButton'
import { Button, Col, Divider, Input, Progress, Row, Spacer, Text, useInput } from '@nextui-org/react'
import React, { Fragment, useState } from 'react'
import { useAccount } from 'wagmi'

const sell = () => {
    const [step, setStep] = useState<Number>(0)
    const [showAddressInput, setShowAddressInput] = useState<Boolean>(false)
    const { address, isConnecting, isDisconnected } = useAccount()
    const [addres, setAddres] = useState<String | undefined>(address ?? "")
    console.log({ addres })

    const stepHandler = (e: number) => {
        if (e === 0) {
            setAddres(address)
        }
        setStep(e)
    }
    const { value, reset, bindings } = useInput("");

    const validateEthereumAddress = (value: string) => {
        const regex = /^(0x)?[0-9a-fA-F]{40}$/;
        return regex.test(value);
    };

    return (
        <Fragment>
            <PageHeader title="Sell" />
            <Progress
                color={step === 3 ? "success" : "primary"}
                value={step === 0 ? 0 : step === 1 ? 30 : step === 2 ? 60 : 100}
                size="xs"
            />
            <Spacer y={2} />
            <Row>
                <Col
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}
                >
                    {step === 0 &&
                        <>
                            <Col span={12}
                                style={{
                                    display: "flex",
                                    flexDirection:"row",
                                    justifyContent: "center"
                                }}
                            >
                                {!address && <WalletConnectButton size="lg" />}
                            </Col>
                            {address &&
                                <Button color='primary' style={{ width: "100%" }} onClick={() => stepHandler(1)}>
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
                                        labelPlaceholder="Enter your address"
                                        color="primary"
                                        helperColor={validateEthereumAddress(value) ? "success" : "error"}
                                        helperText={validateEthereumAddress(value) ? "Correct Ethereum address" : "Enter a valid Ethereum address"}

                                    />
                                    <Spacer y={1.6} />
                                    <Button color='primary' style={{ width: "100&" }} onClick={() => setStep(1)}>
                                        Proceed
                                    </Button>
                                </>
                            }

                        </>
                    }
                </Col>
            </Row>
        </Fragment>
    )
}

export default sell