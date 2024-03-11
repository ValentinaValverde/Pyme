import React from 'react'
import EditProductForm from '@/components/EditProductForm'
import { getProduct } from '@/utils/actions/productActions'
import Link from 'next/link'

const editProductPage = async ({ params }) => {
	const product = await getProduct(params.product)
	const myStore = params.slug

	console.log(myStore)

	return (
		<>
			<EditProductForm product={product} myStore={myStore} />
		</>
	)
}

export default editProductPage
