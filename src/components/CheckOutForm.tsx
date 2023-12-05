// components/CheckoutForm.js

import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { callContractFunctionAPI } from '@/http/contract';
import { Button } from '@nextui-org/react';

function CheckoutForm({ value, currency, setStep,toAddres,setHash }: any) {
    const router = useRouter()
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(value);
    const [paymentError, setPaymentError] = useState(null);

    const { address } = useAccount()

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        // if (!address) {
        //     alert("Please connect your wallet")
        //     return
        // }
        let { data } = await axios.post(
            '/api/stripe',
            {
                amount: value,
                currency: currency
            },
        );
        console.log({ data })
        if (!stripe || !elements) {
            return;
        }
        const cardElement = elements.getElement(CardElement);
        if (cardElement === null) {
            setLoading(false)
            return;
        }
        const { error: payerror, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (payerror) {
            console.log("payerror", payerror)
            setLoading(false)
            return;
        } // Payment method created successfully
        const { id } = paymentMethod;
        setPaymentError(null);

        const { token, error } = await stripe.createToken(cardElement);

        if (payerror) {
            console.log(payerror);
            setLoading(false)
        } else {
            try {
                const { paymentIntent, error: confirmError } =
                    await stripe.confirmCardPayment(
                        data.clientSecret, // Replace with the actual client secret
                        {
                            payment_method: {
                                card: cardElement,
                                billing_details: {},
                            },
                        }
                    );
                if (confirmError) {
                    console.log(confirmError);
                    return;
                }
                if (paymentIntent) {
                    try {
                        const data = await callContractFunctionAPI({ toAddress: toAddres, amount: value, type: currency,paymentId: paymentIntent })
                        // console.log({ data })
                        console.log("data", data)
                        setHash(data?.data)
                        // setTransactionHash(data.data)
                        // const payload = {
                        //     // from: data.from,
                        //     // to:data.to,
                        //     // messageHash:data.messageHash??"",
                        //     // blockHash:data.blockHash,
                        //     // blockNumber:String(data.blockNumber),
                        //     transactionHash: data.data,
                        //     status: 1,
                        //     // blockHash:data.blockHash,
                        //     // value:data.value ?? ""
                        // }
                        // await postTransaction(payload)
                        // console.log("data", data)
                        // router.push({
                        //     pathname: '/success',
                        //     query: { hash: data?.data },
                        // });
                        setStep()
                    } catch (error: any) {
                        console.log(error);
                        setAlert({
                            open: true,
                            message: error?.response?.data?.message ?? error.message,
                            severity: "error"
                        })
                        setLoading(false)
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };
    const cardElementOptions = {
        style: {
            base: {
                fontSize: '18px',
                color: 'black',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };
    const [alert, setAlert] = React.useState({
        severity: "",
        message: "",
        open: false
    })

    // const handleStripe = () => {
    //     setAlert({
    //         open: true,
    //         message: "Err: Transaction reverted by Etherium Virtual MAchine",
    //         severity: "error"
    //     })
    // }
    return (
        <form onSubmit={handleSubmit}>
            <div style={{ paddingBottom: "1.5rem", paddingTop: "1.5rem" }}>
                <label>
                    <CardElement id='card-element' options={cardElementOptions} />
                </label>
            </div>
            {paymentError && <div className="error">{paymentError}</div>}
            <Button
                type="submit"
                disabled={!stripe || loading}
                style={{
                    width: "100%",
                    height: "2rem",
                    // background: "#0070f0",
                    border: "none",
                    borderRadius: "8px",
                    // color: "white"
                }}
                color='gradient'
            >
                {loading ? 'Processing...' : 'Pay Now'}
            </Button>
        </form>
    );
}

export default CheckoutForm;
