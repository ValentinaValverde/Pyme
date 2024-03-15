'use server'

import dbConnect from '@/lib/dbConnect'
import StoreModel from '@/lib/models/StoreModel'
import ProductModel from '@/lib/models/ProductModel'
import { redirect } from 'next/navigation'
import { Product, ProductModel } from '@/lib/models/ProductModel'

export const createProduct = async (formData: any) => {
	await dbConnect()

	const productName = formData.get('productName')
	const inInv = formData.get('inInv')
	const productDetails = formData.get('productDetails')
	const price = formData.get('price')
	const productImage = formData.get('productImage')
	const storeSlug = formData.get('storeSlug')

	if (!productName || !inInv || !productDetails || !price || !productImage) {
		throw new Error('Please add all fields')
	}

	console.log(`${productImage}`)

	const store = await StoreModel.findOne({ slug: storeSlug })
	const productStoreId = store.id

	const productExist = await ProductModel.findOne({
		$and: [{ productName }, { productStoreId }]
	})

	if (productExist) {
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
		productImage,
		productStoreId
	})

	redirect(`/mystore/${storeSlug}/products`)
}

export const getStoreProducts = async (slug: string) => {
	await dbConnect()
	const store = await StoreModel.findOne({ slug: slug })

	const storeId = store.id

	const storeProducts = await ProductModel.find({
		productStoreId: storeId
	})

	return storeProducts
}

export const editStoreProduct = async (formData: any) => {
	await dbConnect()
	const productName = formData.get('productName')
	const productSlug = formData.get('productSlug')
	const productImage = formData.get('productImage')
	const inInv = formData.get('inInv')
	const productDetails = formData.get('productDetails')
	const price = formData.get('price')
	const storeSlug = formData.get('myStore')

	if (!productName || !inInv || !productDetails || !price) {
		throw new Error('Please do not leave any fields blank')
	}

	const existingProduct = await ProductModel.findOne({ productSlug })

	if (!existingProduct) {
		throw new Error('Product not found')
	}

	try {
		const updatedProduct = await ProductModel.findOneAndUpdate(
			{ productSlug: productSlug },
			{
				productName,
				inInv,
				productDetails,
				price,
				productImage
			}
		)
		if (!updatedProduct) {
			throw new Error('Product not found')
		}
	} catch (error: any) {
		console.error('Error updating product:', error.message)
	}

	await ProductModel.findOneAndUpdate(
		{ productSlug: productSlug },
		{
			productName,
			inInv,
			productDetails,
			price
		}
	)

	redirect(`/mystore/${storeSlug}/products`)
}

export const getProduct = async (slug: any) => {
	await dbConnect()
	const product = await ProductModel.findOne({ productSlug: slug })
	return product
}

export const getAllProducts = async () => {
	await dbConnect()
	const products = await ProductModel.find({})
	return products as Product[]
}