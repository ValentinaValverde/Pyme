'use client'
import React from 'react'

const MyStoreInfo = ({ myStore }: any) => {
	const { storename, owner, ein, active } = myStore
	return (
		<div>
			<h3>MyStoreInfo</h3>
			<ul>
				<li>Store name: {storename}</li>
				<li>Owner: {owner}</li>
				<li>EIN: {ein}</li>
				<li>Active: {active}</li>
			</ul>
		</div>
	)
}

export default MyStoreInfo
