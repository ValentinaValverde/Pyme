'use server'

import dbConnect from '@/lib/dbConnect'
import CartModel from '@/lib/models/CartModel'
import CartItemModel from '@/lib/models/CartItemModel'
import { ProductModel } from '@/lib/models/ProductModel'
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

	const lineItemsPromises = cartItems.map(async (item) => {
		const product = await ProductModel.findById(item.productId)
		const price = Number(product.price * 100)
		return {
			price_data: {
				currency: 'usd',
				product_data: {
					name: product.productName
				},
				unit_amount: price
			},
			quantity: item.quantity
		}
	})

	const lineItems = await Promise.all(lineItemsPromises)

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: lineItems,
		mode: 'payment',
		success_url: 'http://localhost:3000/shop/process_order',
		cancel_url: 'http://localhost:3000/shop/cart'
		// automatic_tax: { enabled: true }
	})

	const sessionDetails = {
		id: session.id,
		url: session.url,
		status: session.status
	}

	return sessionDetails
}
