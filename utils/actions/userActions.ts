'use server'

import dbConnect from '@/lib/dbConnect'
import UserModel from '@/lib/models/UserModel'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
//import { redirect } from 'next/dist/server/api-utils'
import bcrypt from 'bcrypt'
import { auth } from '@clerk/nextjs/server'
import ShippingAddressModel from '@/lib/models/ShippingAddress'

export const getAllUsers = async () => {
	await dbConnect()
	return UserModel.find({}).sort({ createdAt: -1 })
}

export const createUser = async (formData: any) => {
	await dbConnect()

	const username = formData.get('username')
	const email = formData.get('email')
	const password = formData.get('password')
	const role = formData.get('role') || 'Customer'

	if (!username || !email || !password) {
		throw new Error('Please add all fields')
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	if (!emailRegex.test(email)) {
		throw new Error('Invalid email format')
	}

	if (password.length < 7) {
		throw new Error('Password should be at least 7 characters long')
	}

	const userExist = await UserModel.findOne({ email })

	if (userExist) {
		throw new Error(
			'Email already in use. Please signin or create an account with a different email address'
		)
	}

	const hashedPassword = await bcrypt.hash(password, 10)

	// some validation here

	const user = await UserModel.create({
		username,
		email,
		password: hashedPassword,
		role
	})

	redirect('/')
	// revalidate path if using ISR
	//revalidatePath('/')
}

export const userLogin = async (formData: any) => {
	await dbConnect()

	const email = formData.get('email')
	const password = formData.get('password')

	if (!email || !password) {
		throw new Error('Please provide both email and password')
	}

	const user = await UserModel.findOne({ email })

	if (!user) {
		throw new Error('Invalid email or password')
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password)

	if (!isPasswordMatch) {
		throw new Error('Invalid email or password')
	}

	redirect('/')
}

export const createShippingAddress = async (prevState: any, formData: any) => {
  await dbConnect()
  const { userId } = auth()
  const streetAddress = formData.get('streetAddress')
  const city = formData.get('city')
  const state = formData.get('state')
  const zipcode = formData.get('zipcode')

  if (!streetAddress || !city || !state || !zipcode) {
    return { message: 'Please add all fields' }
  }

  const shippingAddress = await ShippingAddressModel.create({
    userId,
    streetAddress,
    city,
    state,
    zipcode
  })

  return shippingAddress
}
