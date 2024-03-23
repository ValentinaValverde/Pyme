'use client'
import React from 'react'

const MyStoreInfo = ({ myStore }: any) => {
	const { storename, owner, ein, streetAddress, city, state, zipcode } = myStore
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
			</ul>
		</div>
	)
}

export default MyStoreInfo
