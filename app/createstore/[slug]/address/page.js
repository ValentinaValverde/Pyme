import React from 'react'
import StoreAddressForm from '@/components/StoreAddressForm'

const storeStreetAddressPage = ({ params }) => {
	return (
		<>
			<StoreAddressForm myStore={params.slug} />
		</>
	)
}

export default storeStreetAddressPage
