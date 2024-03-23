import React from 'react'
import StoreStory from '@/components/StoreStory'
import Sidebar from '@/components/Sidebar'
import { Box } from '@mui/material'
//import { useParams } from 'next/navigation'

const MyStoreHome = ({ params }: any) => {
	//const params = useParams()
	//const slug = params.slug?.toString() || ''
	return (
		<>
			<Box sx={{ display: 'flex' }}>
				<Sidebar storeSlug={params.slug} />
				<Box component={'main'} sx={{ flexGrow: 1, p: 3 }}>
					<StoreStory myStore={params.slug} />
				</Box>
			</Box>
		</>
	)
}

export default MyStoreHome
