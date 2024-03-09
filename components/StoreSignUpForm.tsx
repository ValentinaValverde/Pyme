'use client'

import React from 'react'
import { createStore } from '@/utils/actions/storeActions'

const StoreSignUpForm = () => {
	return (
		<form action={createStore}>
			<div className='join w-full'>
				<input
					className='input input-bordered join-item w-full'
					placeholder='storename'
					type='text'
					name='storename'
					required
				/>
				<input
					className='input input-bordered join-item w-full'
					placeholder='ownername'
					type='text'
					name='ownername'
					required
				/>
				<input
					className='input input-bordered join-item w-full'
					placeholder='mockuserid'
					type='number'
					name='mockuserid'
					required
				/>
				<input
					className='input input-bordered join-item w-full'
					placeholder='ein'
					type='number'
					name='ein'
					required
				/>
				<button type='submit' className='btn join-item btn-primary'>
					Submit
				</button>
			</div>
		</form>
	)
}

export default StoreSignUpForm
