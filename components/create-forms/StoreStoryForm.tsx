'use client'
import React, { useEffect } from 'react'
import { createOrUpdateStoreStory } from '@/utils/actions/storeActions'
import Link from 'next/link'
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

const StoreStoryForm = ({ story, myStore }: any) => {
	let storeImage = ''
	let storeDetails = ''
	let ownerImage = ''
	let ownerDetails = ''

	if (story) {
		storeImage = story.storeImage
		storeDetails = story.storeDetails
		ownerImage = story.ownerImage
		ownerDetails = story.ownerDetails
	}
	const [state, formAction] = useFormState(
		createOrUpdateStoreStory,
		initialState
	)
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
								Create a Store Story
							</h2>
							<p className='mt-3 text-sm leading-2 text-gray-600'>
								Share your store&apos;s story
							</p>
						</div>
						<div className='sm:col-span-4'>
							<label className='block text-sm font-medium leading-6 text-gray-900'>
								Store Image URL
							</label>
							<input
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
								type='text'
								defaultValue={storeImage}
								name='storeImage'
								required
							/>
						</div>

						<div className='col-span-full'>
							<label className='block text-sm font-medium leading-6 text-gray-900'>
								Store Details / Story
							</label>
							<textarea
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
								rows={3}
								defaultValue={storeDetails}
								name='storeDetails'
								minLength={10}
								maxLength={3000}
								required
							/>
						</div>
						<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
							<div className='sm:col-span-4'>
								<label className='block text-sm font-medium leading-2 text-gray-900'>
									Owner Image URL
								</label>
								<input
									className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									type='text'
									defaultValue={ownerImage}
									name='ownerImage'
									required
								/>
							</div>
							<div className='col-span-full'>
								<label className='block text-sm font-medium leading-6 text-gray-900'>
									Owner Story
								</label>
								<textarea
									className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									rows={3}
									defaultValue={ownerDetails}
									name='ownerDetails'
									minLength={10}
									maxLength={3000}
									required
								/>
								<input type='hidden' name='myStore' value={myStore} />
							</div>
						</div>
					</div>

					<div className='mt-6 flex items-center justify-end gap-x-6'>
						<Link href={`/mystore/${myStore}`}>
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

export default StoreStoryForm
