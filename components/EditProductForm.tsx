'use client'
import React from 'react'
import { editStoreProduct } from '@/utils/actions/productActions'

const EditProductForm = ({ product, myStore }: any) => {
	const { productName, inInv, productDetails, price, productSlug } = product

	return (
		<form action={editStoreProduct}>
			<div className='join w-full'>
				<input
					className='input input-bordered join-item w-full'
					placeholder='productName'
					type='text'
					defaultValue={productName}
					name='productName'
					required
				/>
				<input
					className='input input-bordered join-item w-full'
					placeholder='productDetails'
					type='text'
					defaultValue={productDetails}
					name='productDetails'
					required
				/>
				<input
					className='input input-bordered join-item w-full'
					placeholder='inInv'
					type='number'
					defaultValue={inInv}
					name='inInv'
					required
				/>
				<input
					className='input input-bordered join-item w-full'
					placeholder='price'
					type='text'
					defaultValue={price}
					name='price'
					required
				/>
				<input
					className='input input-bordered join-item w-full'
					type='text'
					placeholder='image url'
					name='productImage'
					required
				/>
				<input type='hidden' name='productSlug' value={productSlug} />
				<input type='hidden' name='myStore' value={myStore} />
				<button type='submit' className='btn join-item btn-primary'>
					Submit
				</button>
			</div>
		</form>
	)
}

export default EditProductForm
