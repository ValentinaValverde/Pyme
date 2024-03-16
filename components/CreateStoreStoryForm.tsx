'use client'
import React from 'react'
import { createStoreStory } from '@/utils/actions/storeActions'

const CreateStoreStoryForm = ({ myStore }: any) => {
	return (
		<form action={createStoreStory}>
			<div className='join w-full'>
				<input
					className='input input-bordered join-item w-full'
					type='text'
					placeholder='Store Image url'
					name='storeImage'
					required
				/>
				<input
					className='input input-bordered join-item w-full'
					type='text'
					placeholder='Store Story'
					name='storeDetails'
					required
				/>
				<input
					className='input input-bordered join-item w-full'
					type='text'
					placeholder='Owner Image url'
					name='ownerImage'
					required
				/>
				<input
					className='input input-bordered join-item w-full'
					type='text'
					placeholder='Owner Story'
					name='ownerDetails'
					required
				/>
				<input type='hidden' name='myStore' value={myStore} />
				<button type='submit' className='btn join-item btn-primary'>
					Submit
				</button>
			</div>
		</form>
	)
}

export default CreateStoreStoryForm
