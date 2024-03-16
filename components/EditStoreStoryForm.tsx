'use client'
import React from 'react'
import { editStoreStory } from '@/utils/actions/storeActions'

const EditStoreStoryForm = ({ story, myStore }: any) => {
	const { storeImage, storeDetails, ownerImage, ownerDetails } = story
	return (
		<form action={editStoreStory}>
			<div className='join w-full'>
				<input
					className='input input-bordered join-item w-full'
					placeholder='Add Store Image'
					type='text'
					defaultValue={storeImage}
					name='storeImage'
					required
				/>
				<input
					className='input input-bordered join-item w-full'
					placeholder='Add Story for the store'
					type='text'
					defaultValue={storeDetails}
					name='storeDetails'
					required
				/>
				<input
					className='input input-bordered join-item w-full'
					placeholder='Add Owner Image'
					type='text'
					defaultValue={ownerImage}
					name='ownerImage'
					required
				/>
				<input
					className='input input-bordered join-item w-full'
					placeholder='Add story for the owner'
					type='text'
					defaultValue={ownerDetails}
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

export default EditStoreStoryForm
