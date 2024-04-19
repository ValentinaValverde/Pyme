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

	cartItems.forEach(async (item) => {
		console.log(item.store_id)
		if (item.store_id! in storeDic) {
			const order = await OrderModel.create({
				cart_id: cart.id,
				user_id: userId,
				store_id: item.store_id,
				total_price: 0
			})

			if (!order) {
				throw new Error('Order not created')
			} else {
				console.log('Order created' + order.id)
			}
			storeDic[item.store_id] = order.id
			console.log(storeDic[item.store_id])
		}
		const orderId = storeDic[item.storeId]
		if (!orderId) {
			console.log('order Info ' + storeDic[item.storeId])
			throw new Error('Order id found')
		}
		const orderItem = await OrderItemModel.create({
			order_id: orderId,
			product_id: item.productId,
			quantity: item.quantity,
			price_at_time: item.priceAtTime,
			status: 'processing'
		})
		const order = await OrderModel.findById({ orderId })
		order.total_price += item.quantity * item.priceAtTime
	})

	cart.active = false

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
