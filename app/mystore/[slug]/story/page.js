import React from 'react'
import StoreStory from '@/components/StoreStory'

const myStoreStoryPage = ({ params }) => {
	return <StoreStory myStore={params.slug} />
}

export default myStoreStoryPage
