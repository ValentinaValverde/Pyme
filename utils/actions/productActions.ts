'use server'

import dbConnect from '@/lib/dbConnect'
import ProductModel from '@/lib/models/ProductModel'
import StoreModel from '@/lib/models/StoreModel'
import { redirect } from 'next/navigation'

export const createProduct = async (formData: any) => {
	await dbConnect()

	const productName = formData.get('productName')
	const inInv = formData.get('inInv')
	const productDetails = formData.get('productDetails')
	const price = formData.get('price')
	const storeSlug = formData.get('storeSlug')
	console.log(`slug: ${storeSlug}`)

	if (!productName || !inInv || !productDetails || !price) {
		throw new Error('Please add all fields')
	}

	const store = await StoreModel.findOne({ slug: storeSlug })
	const productStoreId = store.id
	console.log(productStoreId)

	const productExist = await ProductModel.findOne({
		$and: [{ productName }, { productStoreId }]
	})

	if (productExist) {
		console.log('product exist')
		throw new Error('You already have a product with this name')
	}

	let productSlug = productName
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-*|-*$/g, '')

	const product = await ProductModel.create({
		productName,
		productSlug,
		productDetails,
		inInv,
		price,
		productStoreId
	})

	console.log(`product: ${product.productSlug}`)

	redirect('/')
}

export const getStoreProducts = async (slug: string) => {
	const store = await StoreModel.findOne({ slug })
	const storeId = store.id
	console.log(storeId)

	const storeProducts = await ProductModel.find({
		productStoreId: storeId
	})

	return storeProducts
}
