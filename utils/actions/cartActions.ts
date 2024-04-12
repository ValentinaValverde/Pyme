'use server'

import dbConnect from '@/lib/dbConnect'
import CartModel from '@/lib/models/CartModel'
import CartItemModel from '@/lib/models/CartItemModel'
import { auth } from '@clerk/nextjs/server'
import Stripe from 'stripe'

export const createCart = async () => {
	await dbConnect()

	const { userId } = auth()

	const cart = await CartModel.findOne({
		$and: [{ userId }, { active: true }]
	})

	if (cart) {
		return
	}

	try {
		const newCart = await CartModel.create({
			userId
		})
	} catch (error) {
		console.error(error)
	}
}

export const checkOut = async () => {
	await dbConnect()

	const { userId } = auth()

	const cart = await CartModel.findOne({
		$and: [{ userId }, { active: true }]
	})

	if (!cart) {
		return
	}

	const cartItems = await CartItemModel.find({ cartId: cart.id })

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
		apiVersion: '2024-04-10'
	})

	if (!stripe) {
		throw new Error('Failed to initialize Stripe')
	}

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: [
			{
				price_data: {
					currency: 'usd',
					product_data: {
						name: 'T-shirt'
					},
					unit_amount: 2000
				},
				quantity: 1
			}
		],
		mode: 'payment',
		success_url: 'https://example.com/success',
		cancel_url: 'https://example.com/cancel',
		automatic_tax: { enabled: true }
	})

	return session
}
