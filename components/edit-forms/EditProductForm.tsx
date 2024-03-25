'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { editStoreProduct } from '@/utils/actions/productActions'
import { Product } from '@/lib/models/ProductModel'
import { useFormStatus, useFormState } from 'react-dom'
import toast from 'react-hot-toast'

interface EditProductFormProps {
	product: Product
	myStore: any // Replace 'any' with the actual type if known
}

const SubmitBtn = () => {
	const { pending } = useFormStatus()
	return (
		<button
			type='submit'
			disabled={pending}
			className='submit-button rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
		>
			{pending ? 'Wait...' : 'Save'}
		</button>
	)
}

const initialState = {
	message: ''
}

const EditProductForm: React.FC<EditProductFormProps> = ({
	product,
	myStore
}) => {
	const [state, formAction] = useFormState(editStoreProduct, initialState)
	useEffect(() => {
		if (state.message !== '') {
			toast.error(state.message)
		}
	}, [state])
	return (
		<>
			<div className='styled_form'>
				<form action={formAction}>
					<div className='space-y-12'>
						<div className='border-b border-gray-900/10 pb-12'>
							<h2 className='text-base font-semibold leading-7 text-gray-900'>
								Edit Product
							</h2>

							<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
								<div className='sm:col-span-4'>
									<label className='block text-sm font-medium leading-6 text-gray-900'>
										Product Name
									</label>
									<input
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
										type='text'
										name='productName'
										defaultValue={product.productName}
										required
									/>
								</div>

								<div className='col-span-full'>
									<label className='block text-sm font-medium leading-6 text-gray-900'>
										Product Details
									</label>
									<textarea
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
										rows={3}
										name='productDetails'
										defaultValue={product.productDetails}
										required
									/>
									<p className='mt-3 text-sm leading-6 text-gray-600'>
										Describe your product
									</p>
								</div>

								<div className='sm:col-span-4'>
									<label className='block text-sm font-medium leading-6 text-gray-900'>
										Inventory
									</label>
									<input
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
										type='number'
										name='inInv'
										defaultValue={product.inInv}
										required
									/>
								</div>

								<div className='sm:col-span-4'>
									<label className='block text-sm font-medium leading-6 text-gray-900'>
										Price
									</label>
									<input
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
										type='number'
										name='price'
										step='0.01'
										defaultValue={product.price}
										required
									/>
								</div>

								<div className='sm:col-span-4'>
									<label
										htmlFor='email'
										className='block text-sm font-medium leading-6 text-gray-900'
									>
										Product Image URL
									</label>
									<input
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
										type='text'
										name='productImage'
										defaultValue={product.productImage}
										required
									/>
								</div>

								<input
									type='hidden'
									name='productSlug'
									value={product.productSlug}
								/>
								<input type='hidden' name='myStore' value={myStore} />
							</div>
						</div>
					</div>

					<div className='mt-6 flex items-center justify-end gap-x-6'>
						<Link href={`/mystore/${myStore}/products`}>
							<button
								type='button'
								className='text-sm font-semibold leading-6 text-gray-900'
							>
								Cancel
							</button>
						</Link>
						<SubmitBtn />
					</div>
				</form>
			</div>
		</>
	)
}

export default EditProductForm
