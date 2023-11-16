// pages/api/stripe.js
import { NextApiRequest, NextApiResponse } from 'next';
import { tokenContractABI } from '@/utils/contractABI';
import Web3, { Bytes } from 'web3';
import db from '../../../mongoose.config.js';
const transactionCollection = db.collection('transactions')
import Stripe from 'stripe'

const stripe = new Stripe("sk_test_51NPnyFIB3FTgGfl17usfb5GLokVkIfQ1z9Mw9he4E1UCB14Qxj7Cstt8HuD8rYsWUmyMYsfD5LsqCowuFx3G8FGO00xbnec02f", {
    apiVersion: '2023-08-16',
});

const OWNERADDRESS = "0xF4dc3E54618cc8bf1356969D82d5Ac6B422cC58b"
export const contractAddress = "0xb6CFF9e8f7414A61553f3fC16a99d01DB78D1A01"
//TESTNET
// const web3 = new Web3('https://polygon-mumbai.infura.io/v3/6c15b84543ac4f788e566e8136d5e0e4')
const web3 = new Web3('https://polygon-mainnet.infura.io/v3/6c15b84543ac4f788e566e8136d5e0e4')


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const { toAddress, amount, type, paymentId } = req.body;
            const paymentIntent = await stripe.paymentIntents.retrieve(
                paymentId.id,
            );
            const isValid = paymentIntent.status === 'succeeded';
            const tranaction = await transactionCollection.findOne({ "paymentId.id": paymentId })
            if (isValid && !tranaction) {

                const contractInstance = new web3.eth.Contract(tokenContractABI, contractAddress);
                let tramount = amount * 1000000000000000000
                const data = contractInstance.methods.transfer(toAddress, BigInt(tramount)).encodeABI(); // Replace with your function and arguments

                // Get the current nonce for the owner's address
                const nonce = await web3.eth.getTransactionCount(OWNERADDRESS);
                const gasPrice = await web3.eth.getGasPrice(); // Get the current gas price
                const gasPriceWithBuffer = gasPrice * BigInt(2); // Set a gas price higher than the current price

                // Create a raw transaction object
                const rawTx = {
                    nonce: web3.utils.toHex(nonce),
                    gasPrice: web3.utils.toHex(gasPriceWithBuffer),
                    gasLimit: web3.utils.toHex(300000), // Adjust the gas limit as needed
                    to: contractAddress,
                    value: '0x00', // No ether transfer
                    data: data,
                };
                const privateKey: any = process.env.PRIVATE_KEY

                // Sign the transaction
                const signedTx = await web3.eth.accounts.signTransaction(rawTx, privateKey);

                console.log("signedTx", signedTx);
                // Send the signed transaction to the Ethereum network
                const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
                const newTransaction = {
                    paymentId: paymentId,
                    walletAddress: toAddress,
                    price: amount * 1000000000000000000,
                    hash: signedTx.transactionHash
                };

                await transactionCollection.insertOne(newTransaction);
                // return txReceipt
                res.status(200).json({ data: txReceipt.transactionHash });
            } else {
                res.status(200).json({ data: "Transaction Error" });
            }
        } catch (error: any) {
            console.log("error", error);
            res.status(410).json({ message: error?.message });
        }
    }
    else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
