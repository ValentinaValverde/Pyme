'use server'

import dbConnect from '@/lib/dbConnect'
import CartModel from '@/lib/models/CartModel'
import { auth } from '@clerk/nextjs/server'
import { create } from 'zustand'

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
	} catch (error) {}
}
