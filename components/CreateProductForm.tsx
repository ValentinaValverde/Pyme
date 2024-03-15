'use client'

import React from 'react'
import { createProduct } from '@/utils/actions/productActions'

const CreateProductForm = ({ myStore }: any) => {
	return (
		<form action={createProduct}>
			<div className='join w-full'>
				<input
					className='input input-bordered join-item w-full'
					placeholder='productName'
					type='text'
					name='productName'
					required
				/>
				<input
					className='input input-bordered join-item w-full'
					placeholder='productDetails'
					type='text'
					name='productDetails'
					required
				/>
				<input
					className='input input-bordered join-item w-full'
					placeholder='inInv'
					type='number'
					name='inInv'
					required
				/>
				<input
					className='input input-bordered join-item w-full'
					placeholder='price'
					type='text'
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
				<input type='hidden' name='storeSlug' value={myStore} />
				<button type='submit' className='btn join-item btn-primary'>
					Submit
				</button>
			</div>
		</form>
	)
}

export default CreateProductForm
