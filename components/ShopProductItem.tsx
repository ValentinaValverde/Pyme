'use client'

import { Product } from '@/lib/models/ProductModel'
import Link from 'next/link'
import { createCartItem } from '@/utils/actions/cartItemActions'

export default function ShopProductItem({
	product,
	storeSlug
}: {
	product: Product
	storeSlug: string
}) {
	const addToCartHandler = async () => {
		await createCartItem(product.productSlug, 1)
	}
	return (
		<div className='card bg-base-300 shadow-xl mb-4'>
			<figure>
				<Link href={`${storeSlug}/product/${product.productSlug}`}>
					<img
						src={product.productImage}
						alt={product.productName}
						width={300}
						height={300}
						className='object-cover h-64 w-full'
					/>
				</Link>
			</figure>
			<div className='card-body'>
				<Link href={`${storeSlug}/product/${product.productSlug}`}>
					<h2 className='card-title font-normal'>{product.productName}</h2>
				</Link>
				<div className='card-actions flex justify-between items-center'>
					<span className='text-2xl'>${product.price}</span>{' '}
				</div>
				<button onClick={addToCartHandler} className='btn btn-primary w-full'>
					Add to Cart
				</button>
			</div>
		</div>
	)
}
