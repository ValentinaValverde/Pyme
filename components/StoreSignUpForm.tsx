'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { createStore } from '@/utils/actions/storeActions'
import { useFormStatus, useFormState } from 'react-dom'
import toast from 'react-hot-toast'

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

const StoreSignUpForm = () => {
	const [state, formAction] = useFormState(createStore, initialState)
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
								Sign Up!
							</h2>

							<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
								<div className='sm:col-span-4'>
									<label className='block text-sm font-medium leading-6 text-gray-900'>
										Store Name
									</label>
									<input
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
										type='text'
										name='storename'
										minLength={2}
										maxLength={50}
										required
									/>
								</div>

								<div className='sm:col-span-4'>
									<label className='block text-sm font-medium leading-6 text-gray-900'>
										Owner Name
									</label>
									<input
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
										type='text'
										name='ownername'
										minLength={2}
										maxLength={35}
										required
									/>
								</div>
								<div className='sm:col-span-4'>
									<label className='block text-sm font-medium leading-6 text-gray-900'>
										EIN
									</label>
									<input
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
										type='number'
										name='ein'
										title='Please enter 9 digit EIN'
										required
									/>
								</div>
							</div>
						</div>
					</div>

					<div className='mt-6 flex items-center justify-end gap-x-6'>
						<Link href='/'>
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

export default StoreSignUpForm
