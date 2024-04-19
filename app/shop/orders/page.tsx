import React from 'react'
import { createOrder } from '@/utils/actions/orderActions'

const customerOrderPage = async () => {
	await createOrder()
	return <div>Processing Order...</div>
}

export default customerOrderPage
