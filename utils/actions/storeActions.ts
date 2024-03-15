'use server'

import dbConnect from '@/lib/dbConnect'
import StoreModel from '@/lib/models/StoreModel'
import StoreAddressModel from '@/lib/models/StoreAddress'
import { nanoid } from 'nanoid'
import { redirect } from 'next/navigation'

export const createStore = async (formData: any) => {
	await dbConnect()

	const storename = formData.get('storename')
	const ownername = formData.get('ownername')
	const mockuserid = formData.get('mockuserid')
	const ein = formData.get('ein')

	if (!storename || !ownername || !mockuserid || !ein) {
		throw new Error('Please add all fields')
	}

	const storeExist = await StoreModel.findOne({
		$or: [{ mockuserid }, { ein }]
	})

	if (storeExist) {
		throw new Error('A store with the same owner name or EIN already exists')
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

	const store = await StoreModel.create({
		storename,
		slug,
		ownername,
		mockuserid,
		ein
	})

	redirect('/')
}

export const getMyStoreInfo = async (slug: string) => {
	await dbConnect()
	const store = await StoreModel.findOne({ slug: slug })

	return {
		storename: store.storename,
		owner: store.ownername,
		ein: store.ein,
		active: store.active
	}
}

export const createStoreAddress = async (formData: any) => {
	await dbConnect()

	const streetAddress = formData.get('streetAddress')
	const city = formData.get('city')
	const state = formData.get('state')
	const zipcode = formData.get('zipcode')
	const myStore = formData.get('myStore')

	if (!streetAddress || !city || !state || !zipcode) {
		throw new Error('Please add all fields')
	}

	const store = await StoreModel.findOne({ slug: myStore })

	const storeId = store.id

	const storeAddress = await StoreAddressModel.create({
		streetAddress,
		city,
		state,
		zipcode,
		storeId
	})

	redirect(`/mystore/${myStore}`)
}
