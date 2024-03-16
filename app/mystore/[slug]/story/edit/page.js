import React from 'react'
import EditStoreStoryForm from '@/components/EditStoreStoryForm'
import { getStoreStory } from '@/utils/actions/storeActions'

const editStoryPage = async ({ params }) => {
	const story = await getStoreStory(params.slug)
	return <EditStoreStoryForm story={story} myStore={params.slug} />
}

export default editStoryPage
