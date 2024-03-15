'use client'

import React from 'react'
import { createStoreAddress } from '@/utils/actions/storeActions'

const StoreAddressForm = ({ myStore }: any) => {
	return (
		<form action={createStoreAddress}>
			<div className='join w-full'>
				<input
					className='input input-bordered join-item w-full'
					placeholder='Street Address'
					type='text'
					name='streetAddress'
					required
				/>
				<input
					className='input input-bordered join-item w-full'
					placeholder='City'
					type='text'
					name='city'
					required
				/>
				<input
					className='input input-bordered join-item w-full'
					placeholder='State'
					type='text'
					name='state'
					required
				/>
				<input
					className='input input-bordered join-item w-full'
					placeholder='Zip Code'
					type='text'
					name='zipcode'
					required
				/>
				<input type='hidden' name='myStore' value={myStore} />
				<button type='submit' className='btn join-item  btn-primary'>
					Submit
				</button>
			</div>
		</form>
	)
}

export default StoreAddressForm
