import React from 'react'
import { getMyStoreInfo } from '@/utils/actions/storeActions'
import MyStoreInfo from '@/components/MyStoreInfo'
import Sidebar from '@/components/Sidebar'
import { Box } from '@mui/material'

const myStoreInfoPage = async () => {
	const myStore = await getMyStoreInfo()
	return (
		<Box sx={{ display: 'flex' }}>
			<Sidebar storeSlug={myStore.slug} />
			<Box component={'main'} sx={{ flexGrow: 1, p: 3 }}>
				<MyStoreInfo myStore={myStore} />
			</Box>
		</Box>
	)
}

export default myStoreInfoPage
