'use server'

import dbConnect from '@/lib/dbConnect'
import UserModel from '@/lib/models/UserModel'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/dist/server/api-utils'

export const getAllUsers = async () => {
	await dbConnect()
	return UserModel.find({}).sort({ createdAt: -1 })
}

export const createUser = async (formData: any) => {
	await dbConnect()
	const username = formData.get('username')
	const email = formData.get('email')
	const password = formData.get('password') // Remember to hash passwords in production
	const role = formData.get('role') || 'Customer'

	// some validation here

	await UserModel.create({
		username,
		email,
		password,
		role
	})

	// revalidate path if using ISR
	revalidatePath('/')
}
