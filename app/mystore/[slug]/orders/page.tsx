import React from 'react'
import { getStoreOrders } from '@/utils/actions/orderActions'
import StoreOrders from '@/components/StoreOrders'

const StoreOrdersPage = async () => {
	const orders = await getStoreOrders()
	return <StoreOrders orders={orders} />
}

export default StoreOrdersPage
