import React from 'react'
import { redirect } from 'next/navigation'
import CreateStoreAddressForm from '@/components/create-forms/CreateStoreAddressForm'
import { checkCreatedStore } from '@/utils/actions/storeActions'

const storeStreetAddressPage = async ({ params }) => {
	const checkStore = await checkCreatedStore()
	if (!checkStore) {
		redirect('/createstore')
	} else if (!checkStore.completeAddress) {
		return (
			<>
				<CreateStoreAddressForm myStore={params.slug} />
			</>
		)
	} else if (!checkStore.completeStory) {
		redirect(`/createstore/${createdCheck.slug}/`)
	} else {
		redirect(`/mystore/${checkStore.slug}/address`)
	}
}
export default storeStreetAddressPage
