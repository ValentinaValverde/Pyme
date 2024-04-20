'use server'

import dbConnect from '@/lib/dbConnect'
import StoreModel from '@/lib/models/StoreModel'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { Product, ProductModel } from '@/lib/models/ProductModel'
import { auth } from '@clerk/nextjs/server'
import { z, ZodError } from 'zod'

export const createProduct = async (prevState: any, formData: any) => {
	await dbConnect()

	const { userId } = auth()
	const productName = formData.get('productName')
	let inInv = formData.get('inInv')
	const productDetails = formData.get('productDetails')
	let price = formData.get('price')
	const productImage = formData.get('productImage')
	//const storeSlug = formData.get('storeSlug')

	if (!productName || !inInv || !productDetails || !price || !productImage) {
		return { message: 'Please add all fields' }
	}

	const store = await StoreModel.findOne({ userId: userId })
	const productStoreId = store.id

	const productExist = await ProductModel.findOne({
		$and: [{ productName }, { productStoreId }]
	})

	if (productExist) {
		return { message: 'You already have a product with this name' }
	}

	let productSlug = productName
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-*|-*$/g, '')

	inInv = parseInt(inInv)
	price = parseFloat(price)

	const submittedProduct = z.object({
		productName: z
			.string()
			.trim()
			.min(2, 'Product name too short')
			.max(75, 'Product name too long'),
		productDetails: z
			.string()
			.trim()
			.min(10, 'Product details is too short')
			.max(2000, 'Product details is too long'),
		inInv: z.number().nonnegative().lte(9999, 'Inventory Count Max is 9999'),
		price: z.number().positive(),
		productImage: z.string().trim().url()
	})

	const productObject = {
		productName,
		productDetails,
		inInv,
		price,
		productImage
	}

	try {
		submittedProduct.parse(productObject)
		const product = await ProductModel.create({
			productName,
			productSlug,
			productDetails,
			inInv,
			price,
			productImage,
			productStoreId
		})
	} catch (error) {
		if (error instanceof ZodError) {
			const errorMessages = error.issues
				.map((issue) => `${issue.path.join('.')}: ${issue.message}`)
				.join(', ')

			return { message: `Validation failed: ${errorMessages}` }
		}
		return { message: 'Error saving the product, please try again' }
	}

	redirect(`/mystore/${store.slug}/products`)
}

export const getStoreProducts = async (slug: string) => {
	await dbConnect()

	const { userId } = auth()
	const store = await StoreModel.findOne({ userId: userId })

	const storeId = store.id

	const storeProducts = await ProductModel.find({
		productStoreId: storeId
	})

	return storeProducts
}

export const editStoreProduct = async (prevState: any, formData: any) => {
	await new Promise((resolve) => setTimeout(resolve, 2000))
	await dbConnect()

	const { userId } = auth()
	const productName = formData.get('productName')
	const productSlug = formData.get('productSlug')
	const productImage = formData.get('productImage')
	let inInv = formData.get('inInv')
	const productDetails = formData.get('productDetails')
	let price = formData.get('price')
	const storeSlug = formData.get('myStore')

	if (!productName || !inInv || !productDetails || !price) {
		return { message: 'Please do not leave any fields blank' }
	}

	const store = await StoreModel.findOne({ userId: userId })
	const product = await ProductModel.findOne({ productSlug: productSlug })

	if (store.id != product.productStoreId) {
		redirect(`mystore/`)
	}

	inInv = parseInt(inInv)
	price = parseFloat(price)

	const submittedProduct = z.object({
		productName: z
			.string()
			.trim()
			.min(2, 'Product name too short')
			.max(75, 'Product name too long'),
		productDetails: z
			.string()
			.trim()
			.min(10, 'Product details is too short')
			.max(2000, 'Product details is too long'),
		inInv: z.number().nonnegative().lte(9999, 'Inventory Count Max is 9999'),
		price: z.number().positive(),
		productImage: z.string().trim().url()
	})

	const productObject = {
		productName,
		productDetails,
		inInv,
		price,
		productImage
	}

	try {
		submittedProduct.parse(productObject)
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
	} catch (error) {
		if (error instanceof ZodError) {
			const errorMessages = error.issues
				.map((issue) => `${issue.path.join('.')}: ${issue.message}`)
				.join(', ')

			return { message: `Validation failed: ${errorMessages}` }
		}
		return { message: 'Error saving the product, please try again' }
	}

	redirect(`/mystore/${storeSlug}/products`)
}

export const getProduct = async (slug: any) => {
	await dbConnect()
	const { userId } = auth()
	const store = await StoreModel.findOne({ userId: userId })

	const product = await ProductModel.findOne({ productSlug: slug })

	if (store.id != product.productStoreId) {
		redirect(`/mystore/`)
	}
	return product
}

export const getShopProduct = async (productId: any) => {
	await dbConnect()
	const product = await ProductModel.findById(productId)

	return product
}

export const getProducts = async (slug: string) => {
	await dbConnect()
	const store = await StoreModel.findOne({ slug: slug })

	const storeProducts = await ProductModel.find({
		productStoreId: store.id
	})

	return storeProducts
}

export const getAllProducts = async () => {
	await dbConnect()
	const products = await ProductModel.find({})
	return products as Product[]
}

export const updateInventory = async (formData: any) => {
	await dbConnect()

	const inInv = formData.get('inInv')
	const productSlug = formData.get('productSlug')
	const myStore = formData.get('myStore')

	if (!inInv || inInv < 0) {
		throw new Error('Please enter a non-negative number')
	}

	const existingProduct = await ProductModel.findOne({ productSlug })

	if (!existingProduct) {
		throw new Error('Product not found')
	}

	try {
		const updatedProduct = await ProductModel.findOneAndUpdate(
			{ productSlug: productSlug },
			{
				inInv
			}
		)
		if (!updatedProduct) {
			throw new Error('Product not found')
		}
	} catch (error: any) {
		console.error('Error updating Product Inventory:', error.message)
	}

	revalidatePath(`/mystore/${myStore}/products`)
}
