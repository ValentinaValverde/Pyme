import React from 'react'
import StoreStory from '@/components/StoreStory'
import Sidebar from '@/components/Sidebar'
import { Box } from '@mui/material'

const myStoreStoryPage = ({ params }) => {
	return (
		<Box sx={{ display: 'flex' }}>
			<Sidebar storeSlug={params.slug} />
			<Box component={'main'} sx={{ flexGrow: 1, p: 3 }}>
				<MyStoreStory myStore={params.slug} />
			</Box>
		</Box>
	)
}

export default myStoreStoryPage
