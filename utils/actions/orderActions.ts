'use server'

import dbConnect from '@/lib/dbConnect'
import OrderModel from '@/lib/models/OrderModel'
import CartModel from '@/lib/models/CartModel'
import CartItemModel from '@/lib/models/CartItemModel'
import OrderItemModel from '@/lib/models/OrderItemsModel'
import StoreModel from '@/lib/models/StoreModel'
import { getShopProduct } from './productActions'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export const createOrder = async () => {
	await dbConnect()

	const { userId } = auth()

	const cart = await CartModel.findOne({
		$and: [{ userId }, { active: true }]
	})

	if (!cart) {
		return
	}

	const cartItems = await CartItemModel.find({ cartId: cart.id })

	if (!cartItems) {
		return
	}

	let storeDic: any = {}

	for (let item of cartItems) {
		let storeIdStr = item.store_id.toString()
		if (!(storeIdStr in storeDic)) {
			const order = await OrderModel.create({
				cart_id: cart.id,
				user_id: userId,
				store_id: item.store_id,
				total_price: 0
			})

			storeDic[storeIdStr] = order.id
		}
		const orderId = storeDic[storeIdStr]
		const orderItem = await OrderItemModel.create({
			order_id: orderId,
			product_id: item.productId,
			quantity: item.quantity,
			price_at_time: item.priceAtTime,
			status: 'processing'
		})
		await OrderModel.findByIdAndUpdate(orderId, {
			$inc: { total_price: item.quantity * item.priceAtTime }
		})
		console.log('Order Item created', orderItem.id)
	}

	await CartModel.findByIdAndUpdate(cart.id, { active: false })

	redirect('/')
}

export const getOrder = async (orderId: string) => {
	await dbConnect()

	const { userId } = auth()

	const order = await OrderModel.findById({ orderId })

	if (!order) {
		return
	}

	if (userId != order.user_id) {
		const store = await StoreModel.findOne({ userId: userId })
		if (userId != store.userId) {
			return
		}
	}

	const orderItems = await OrderItemModel.find({ order_id: order.id })

	const items = orderItems.map(async (item) => {
		const product = await getShopProduct(item.product_id)
		return {
			productName: product.productName,
			productSlug: product.productSlug,
			quantity: item.quantity,
			price: item.price_at_time,
			productImage: product.productImage
		}
	})

	return {
		items: items,
		totalPrice: order.total_price
	}
}
