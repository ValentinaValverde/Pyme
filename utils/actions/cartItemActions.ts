'use server'

import dbConnect from '@/lib/dbConnect'
import CartItemModel from '@/lib/models/CartItemModel'
import CartModel from '@/lib/models/CartModel'
import { ProductModel } from '@/lib/models/ProductModel'
import { auth } from '@clerk/nextjs/server'

export const createCartItem = async (productSlug: string, quantity: number) => {
	await dbConnect()

	const { userId } = auth()

	let cart = await CartModel.findOne({
		$and: [{ userId }, { active: true }]
	})

	if (!cart) {
		cart = await CartModel.create({
			userId
		})
	}

	const product = await ProductModel.findOne({ productSlug: productSlug })
	const cartItemExist = await CartItemModel.findOne({
		$and: [{ cartId: cart.id }, { productId: product.id }]
	})

	if (cartItemExist) {
		cartItemExist.quantity += quantity
	}

	const newCartItem = await CartItemModel.create({
		cartId: cart.id,
		productId: product.id,
		quantity
	})
}
