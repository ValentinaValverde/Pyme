import React from 'react'
import EditProductForm from '@/components/edit-forms/EditProductForm'
import { getProduct } from '@/utils/actions/productActions'
import Sidebar from '@/components/Sidebar'
import { Box } from '@mui/material'

const editProductPage = async ({ params }: { params: any }) => {
	const productDoc = await getProduct(params.product)
	const product = productDoc.toObject()
	const myStore = params.slug

	// Remove non-serializable properties
	delete product._id
	delete product.__v
	delete product.productStoreId

	return (
		<>
			<Box sx={{ display: 'flex' }}>
				<Sidebar storeSlug={myStore} />
				<Box component={'main'} sx={{ flexGrow: 1, p: 3 }}>
					<EditProductForm product={product} myStore={myStore} />
				</Box>
			</Box>
		</>
	)
}

export default editProductPage
