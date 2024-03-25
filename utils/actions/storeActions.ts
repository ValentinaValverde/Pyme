'use server'

import dbConnect from '@/lib/dbConnect'
import StoreModel from '@/lib/models/StoreModel'
import StoreAddressModel from '@/lib/models/StoreAddress'
import StoreStoryModel from '@/lib/models/StoreStoryModel'
import { nanoid } from 'nanoid'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { z, ZodError } from 'zod'
import { revalidatePath } from 'next/cache'

export const createStore = async (prevState: any, formData: any) => {
	await dbConnect()

	const { userId } = auth()
	const storename = formData.get('storename')
	const ownername = formData.get('ownername')
	const ein = formData.get('ein')

	if (!storename || !ownername || !ein) {
		return { message: 'Please add all fields' }
		//throw new Error('Please add all fields')
	}

	const storeExist = await StoreModel.findOne({
		$or: [{ userId }, { ein }]
	})

	if (storeExist) {
		return {
			message: 'error pleae check EIN, note: account can only have one store'
		}
		// throw new Error('A store with the same account or EIN already exists')
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
		storename: z
			.string()
			.trim()
			.min(2, 'Store name too short')
			.max(50, 'Store name is too short'),
		ownername: z
			.string()
			.trim()
			.min(2, 'Owner name is too short')
			.max(75, 'Owner name is too long'),
		ein: z.string().trim().length(9, 'Please check EIN')
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
		if (error instanceof ZodError) {
			const errorMessages = error.issues
				.map((issue) => `${issue.path.join('.')}: ${issue.message}`)
				.join(', ')

			return { message: `Validation failed: ${errorMessages}` }
		}
		return { message: 'Please Check EIN' }
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

export const createStoreAddress = async (prevState: any, formData: any) => {
	await dbConnect()
	const { userId } = auth()
	const streetAddress = formData.get('streetAddress')
	const city = formData.get('city')
	const state = formData.get('state')
	const zipcode = formData.get('zipcode')
	//const myStore = formData.get('myStore')

	if (!streetAddress || !city || !state || !zipcode) {
		return { message: 'Please add all fields' }
		//throw new Error('Please add all fields')
	}

	const store = await StoreModel.findOne({ userId: userId })

	const storeId = store.id
	const myStore = store.slug

	const submittedAddress = z.object({
		streetAddress: z.string().trim().min(3, 'Pleae review Address'),
		city: z
			.string()
			.trim()
			.min(1, 'Pleae review city')
			.max(25, 'Please review city'),
		state: z
			.string()
			.trim()
			.min(4, 'Please review state')
			.max(13, 'Please review state'),
		zipcode: z
			.string()
			.trim()
			.min(5, 'Please review zip code')
			.max(10, 'Please review zip code')
	})

	const AddressObject = {
		streetAddress,
		city,
		state,
		zipcode
	}

	try {
		submittedAddress.parse(AddressObject)

		const storeAddress = await StoreAddressModel.create({
			streetAddress,
			city,
			state,
			zipcode,
			storeId
		})
	} catch (error) {
		if (error instanceof ZodError) {
			const errorMessages = error.issues
				.map((issue) => `${issue.path.join('.')}: ${issue.message}`)
				.join(', ')

			return { message: `Validation failed: ${errorMessages}` }
		}
		return { message: 'Error saving the address,please try again' }
	}

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

export const createOrUpdateStoreStory = async (
	prevState: any,
	formData: any
) => {
	await dbConnect()
	const { userId } = auth()
	const storeImage = formData.get('storeImage')
	const storeDetails = formData.get('storeDetails')
	const ownerImage = formData.get('ownerImage')
	const ownerDetails = formData.get('ownerDetails')

	if (!storeImage || !storeDetails || !ownerImage || !ownerDetails) {
		return { message: 'please fill out all fields' }
		//throw new Error('Please add all fields')
	}

	const store = await StoreModel.findOne({ userId: userId })

	const newStoreCheck = !store.completeStory

	const submittedStory = z.object({
		storeImage: z.string().trim().url(),
		storeDetails: z
			.string()
			.trim()
			.min(10, 'Please make store details longer')
			.max(3000, 'Please shorten store details'),
		ownerImage: z.string().trim().url(),
		ownerDetails: z
			.string()
			.trim()
			.min(10, 'Please make owner details longer')
			.max(3000, 'Please shorten owner details')
	})

	const storyObject = {
		storeImage,
		storeDetails,
		ownerImage,
		ownerDetails
	}

	try {
		submittedStory.parse(storyObject)
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
	} catch (error) {
		if (error instanceof ZodError) {
			const errorMessages = error.issues
				.map((issue) => `${issue.path.join('.')}: ${issue.message}`)
				.join(', ')

			return { message: `Validation failed: ${errorMessages}` }
		}
		return { message: 'Error saving the story, please try again' }
	}

	await StoreModel.findOneAndUpdate(
		{ userId: userId },
		{
			completeStory: true
		}
	)

	const myStore = store.slug

	if (newStoreCheck) {
		redirect(`/mystore/${myStore}/products`)
	}
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
