
import type { NextApiRequest, NextApiResponse } from 'next'
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

const chain = EvmChain.SEPOLIA;
console.log("chain", chain)

const startMoralis = async () => {
    await Moralis.start({
        apiKey: process.env.MORALIS_API_KEY,
    });
};

startMoralis();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { id } = req.query
        const addressId = id + ''
        const response = await Moralis.EvmApi.transaction.getWalletTransactions({
            address: addressId,
            chain,
        });
        const data = await response.toJSON()
        res.status(200).json({ message: 'Successfull', data });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'ERROR', error });
    }
}