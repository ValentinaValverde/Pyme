'use server'

import dbConnect from '@/lib/dbConnect'
import StoreModel from '@/lib/models/StoreModel'
import StoreAddressModel from '@/lib/models/StoreAddress'
import StoreStoryModel from '@/lib/models/StoreStoryModel'
import { nanoid } from 'nanoid'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { red } from '@mui/material/colors'

export const createStore = async (prevState: any, formData: any) => {
	await dbConnect()

	const { userId } = auth()
	const storename = formData.get('storename')
	const ownername = formData.get('ownername')
	const ein = formData.get('ein')

	if (!storename || !ownername || !ein) {
		throw new Error('Please add all fields')
	}

	const storeExist = await StoreModel.findOne({
		$or: [{ userId }, { ein }]
	})

	if (storeExist) {
		return { message: 'storeExist' }
		throw new Error('A store with the same account or EIN already exists')
	}

	let slug = storename
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-*|-*$/g, '')

	let slugExists = true
	while (slugExists) {
		const storeExist = await StoreModel.findOne({ slug })
		if (storeExist) {
			let randomString = nanoid(3) // Generates a random string
			slug = `${slug}-${randomString}`
		} else {
			slugExists = false
		}
	}
	const submittedStore = z.object({
		storename: z.string().min(2).max(50),
		ownername: z.string().min(2).max(35),
		ein: z.string().length(9)
	})

	const StoreObject = {
		storename,
		ownername,
		ein
	}
	try {
		submittedStore.parse(StoreObject)

		const store = await StoreModel.create({
			storename,
			slug,
			ownername,
			userId,
			ein,
			completeSignUp: true
		})
	} catch (error) {
		console.error(error)
		return { message: 'error' }
	}
	redirect(`createstore/${slug}/address`)
}

export const getMyStoreInfo = async () => {
	await dbConnect()
	const { userId } = auth()
	const store = await StoreModel.findOne({ userId: userId })
	if (!store) {
		redirect(`/createstore`)
	}
	const storeAddress = await StoreAddressModel.findOne({ storeId: store.id })

	return {
		storename: store.storename,
		owner: store.ownername,
		ein: store.ein,
		streetAddress: storeAddress.streetAddress,
		city: storeAddress.city,
		state: storeAddress.state,
		zipcode: storeAddress.zipcode,
		active: store.active,
		slug: store.slug
	}
}

export const createStoreAddress = async (formData: any) => {
	await dbConnect()
	const { userId } = auth()
	const streetAddress = formData.get('streetAddress')
	const city = formData.get('city')
	const state = formData.get('state')
	const zipcode = formData.get('zipcode')
	//const myStore = formData.get('myStore')

	if (!streetAddress || !city || !state || !zipcode) {
		throw new Error('Please add all fields')
	}

	const store = await StoreModel.findOne({ userId: userId })

	const storeId = store.id
	const myStore = store.slug

	const storeAddress = await StoreAddressModel.create({
		streetAddress,
		city,
		state,
		zipcode,
		storeId
	})

	await StoreModel.findOneAndUpdate(
		{ userId: userId },
		{
			completeAddress: true
		}
	)

	redirect(`/createstore/${myStore}/story`)
}

export const editStoreAddresss = async (formData: any) => {
	await dbConnect()
	const { userId } = auth()
	const streetAddress = formData.get('streetAddress')
	const city = formData.get('city')
	const state = formData.get('state')
	const zipcode = formData.get('zipcode')
	//const myStore = formData.get('myStore')

	if (!streetAddress || !city || !state || !zipcode) {
		throw new Error('Please add all fields')
	}

	const store = await StoreModel.findOne({ userId: userId })

	try {
		const storeAddress = await StoreAddressModel.findOneAndUpdate(
			{ storeId: store.id },
			{
				streetAddress,
				city,
				state,
				zipcode
			}
		)

		if (!storeAddress) {
			throw new Error('Address not found')
		}
	} catch (error: any) {
		console.error('Error updating address:', error.message)
	}

	const myStore = store.slug

	redirect(`/mystore/${myStore}/info`)
}

export const createOrUpdateStoreStory = async (formData: any) => {
	await dbConnect()
	const { userId } = auth()
	const storeImage = formData.get('storeImage')
	const storeDetails = formData.get('storeDetails')
	const ownerImage = formData.get('ownerImage')
	const ownerDetails = formData.get('ownerDetails')

	if (!storeImage || !storeDetails || !ownerImage || !ownerDetails) {
		throw new Error('Please add all fields')
	}

	const store = await StoreModel.findOne({ userId: userId })

	await StoreStoryModel.findOneAndUpdate(
		{ storeId: store.id },
		{
			storeImage,
			storeDetails,
			ownerImage,
			ownerDetails
		},
		{ upsert: true, new: true }
	)

	await StoreModel.findOneAndUpdate(
		{ userId: userId },
		{
			completeStory: true
		}
	)

	const myStore = store.slug

	redirect(`/mystore/${myStore}`)
}

export const getStoreStory = async (slug: string) => {
	await dbConnect()
	const { userId } = auth()
	const storeSlug = slug
	let owner = false
	const store = await StoreModel.findOne({ slug: storeSlug })
	const storeId = store.id

	owner = store.userId === userId

	const story = await StoreStoryModel.findOne({ storeId: storeId })
	if (!story) {
		return null
	}

	const { storeImage, storeDetails, ownerImage, ownerDetails } = story

	return {
		storeImage,
		storeDetails,
		ownerImage,
		ownerDetails,
		owner
	}
}

export const checkCreatedStore = async () => {
	await dbConnect()
	const { userId } = auth()
	if (!userId) {
		redirect('/')
	}
	const store = await StoreModel.findOne({ userId: userId })
	if (!store) {
		return false
	}

	const { slug, completeAddress, completeStory } = store

	return {
		slug,
		completeAddress,
		completeStory
	}
}
