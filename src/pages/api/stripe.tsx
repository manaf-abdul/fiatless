// pages/api/stripe.js

// import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';
import { NextApiRequest, NextApiResponse } from 'next';

const stripe = new Stripe("sk_test_51NPnyFIB3FTgGfl17usfb5GLokVkIfQ1z9Mw9he4E1UCB14Qxj7Cstt8HuD8rYsWUmyMYsfD5LsqCowuFx3G8FGO00xbnec02f", {
    apiVersion: '2023-08-16',
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const { amount} = req.body;
            const  currency="USD" 
            // Create a PaymentIntent on Stripe
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency,
                payment_method_types: ['card'],
            });
            console.log("paymentIntent", paymentIntent)
            res.status(200).json({ clientSecret: paymentIntent.client_secret });
        } catch (error) {
            console.error('Stripe API Error:', error);
            res.status(500).json({ error: 'Could not create payment intent' });
        }
    }
    else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
