
import type { NextApiRequest, NextApiResponse } from 'next'
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import Cors from 'cors'

const chain = EvmChain.MUMBAI;
console.log("chain", chain)

const startMoralis = async () => {
    await Moralis.start({
        apiKey: process.env.MORALIS_API_KEY,
    });
};

startMoralis();

const cors = Cors({
    methods: ['POST', 'GET', 'HEAD'],
    origin:['http://localhost:3000', 'https://owpc-wallet.vercel.app','https://theowpc.com'],
  })

function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: Function
  ) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
  }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await runMiddleware(req, res, cors)
    try {
        const { id } = req.query
        const addressId = id + ''
        let responseToken: any = await Moralis.EvmApi.token.getWalletTokenBalances({
            address: addressId,
            chain,
        });
        responseToken = await responseToken.toJSON()
        let responseNative: any = await Moralis.EvmApi.balance.getNativeBalance({
            chain,
            address: addressId,
        });
        responseNative = responseNative.toJSON()
        const nativePayload = {
            token_address: "0x0000000000000000000000000000000000001010",
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
            balance: responseNative?.balance
        }
        responseToken.unshift(nativePayload)
        
        // const data = await response.toJSON()
        res.status(200).json({ message: 'Successfull', data:responseToken });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'ERROR', error });
    }
}