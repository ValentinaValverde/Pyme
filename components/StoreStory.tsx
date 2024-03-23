import React from 'react'
import { getStoreStory } from '@/utils/actions/storeActions'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@mui/material'

const StoreStory = async ({ myStore }: any) => {
	const story = await getStoreStory(myStore)

	if (!story.storeDetails) {
		return (
			<h2 className='mt-8 font-medium text-lg'>
				Currently this store does not have a store story
			</h2>
		)
	}
	const storeImageAlt = `${myStore} store image`
	return (
		<>
			<img
				loading='lazy'
				src={story.storeImage}
				alt={storeImageAlt}
				className='max-w-xs max-h-24'
				width={100}
				height={100}
			/>
			<h5>{story.storeDetails}</h5>
			<img
				loading='lazy'
				src={story.ownerImage}
				alt='owners Image'
				className='max-w-xs max-h-24'
				width={100}
				height={100}
			/>
			<h5>{story.ownerDetails}</h5>
			{story.owner && (
				<Link href={`/mystore/${myStore}/story/edit`}>
					<Button variant='contained' color='primary'>
						Edit Story
					</Button>
				</Link>
			)}
		</>
	)
}

export default StoreStory
