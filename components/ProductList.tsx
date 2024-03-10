import React from 'react'
import { getStoreProducts } from '@/utils/actions/productActions'

const ProductList = async ({ myStore }: any) => {
	const products = await getStoreProducts(myStore)

	if (products.length === 0) {
		return (
			<h2 className='mt-8 font-medium text-lg'>
				Currently you do not have any active products
			</h2>
		)
	}
	return (
		<ul className='mt-8'>
			{products.map((product) => (
				<li
					key={product.id}
					className='flex justify-between items-center px-6 py-4 mb-4 border border-base-300 rounded-lg shadow-lg'
				>
					<h3>Name: {product.productName}</h3>
					<h3>Details: {product.productDetails}</h3>
					<h3>Price: {product.price}</h3>
					<h3>Inventory: {product.inInv}</h3>
				</li>
			))}
		</ul>
	)
}

export default ProductList
