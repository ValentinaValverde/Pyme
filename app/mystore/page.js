import { React } from 'react'
import { getMyStoreInfo } from '@/utils/actions/storeActions'
import { redirect } from 'next/navigation'

const MyStoreHolder = async () => {
	const store = await getMyStoreInfo()

	if (store.slug) {
		redirect(`/mystore/${store.slug}`)
	}

	return (
		<>
			<h3>Redirecting...</h3>
		</>
	)
}

export default MyStoreHolder
