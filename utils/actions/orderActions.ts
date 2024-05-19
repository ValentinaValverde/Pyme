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

	redirect('/shop/address')
}

export const getOrder = async (orderId: any) => {
	await dbConnect()

	const { userId } = auth()

	const order = await OrderModel.findById(orderId)
	console.log('order', order)

	if (!order) {
		return
	}

	// if (userId != order.user_id) {
	// 	const store = await StoreModel.findOne({ userId: userId })
	// 	if (userId != store.userId) {
	// 		return
	// 	}
	// }

	const orderItems = await OrderItemModel.find({ order_id: order.id })

	const items = await Promise.all(
		orderItems.map(async (item) => {
			const product = await getShopProduct(item.product_id)
			return {
				productName: product.productName,
				productSlug: product.productSlug,
				store_id: product.productStoreId,
				quantity: item.quantity,
				price: item.price_at_time,
				productImage: product.productImage
			}
		})
	)

	return {
		id: order.id,
		items: items,
		totalPrice: order.total_price
	}
}

export const getCustomerOrders = async () => {
	await dbConnect()

	const { userId } = auth()

	const orders = await OrderModel.find({ user_id: userId })

	const orderList = await Promise.all(
		orders.map(async (order) => {
			const orderInfromation = await getOrder(order.id)
			return orderInfromation
		})
	)

	return orderList || []
}

export const getStoreOrders = async (): Promise<any[]> => {
	await dbConnect()

	const { userId } = auth()

	const store = await StoreModel.findOne({ userId: userId })

	if (!store) {
		return []
	}

	const orders = await OrderModel.find({ store_id: store.id })

	const orderList = await Promise.all(
		orders.map(async (order) => {
			const orderInformation = await getOrder(order.id)
			return orderInformation
		})
	)

	return orderList || []
}
