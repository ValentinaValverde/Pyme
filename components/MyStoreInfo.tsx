import React from 'react'
import Link from 'next/link'
import { Button } from '@mui/material'

const MyStoreInfo = ({ myStore }: any) => {
	const { storename, owner, ein, streetAddress, city, state, zipcode, slug } =
		myStore
	return (
		<div>
			<h3>MyStoreInfo</h3>
			<ul>
				<li>Store name: {storename}</li>
				<li>Owner: {owner}</li>
				<li>EIN: {ein}</li>
				<li>Address: {streetAddress}</li>
				<li>City: {city}</li>
				<li>State: {state}</li>
				<li>Zip Code: {zipcode}</li>
				<Link href={`/mystore/${slug}/address`}>
					<Button variant='contained' color='primary'>
						Edit Address
					</Button>
				</Link>
			</ul>
		</div>
	)
}

export default MyStoreInfo
