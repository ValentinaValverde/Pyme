'use client'
import React, { useState, useEffect } from 'react'
import { createOrder } from '@/utils/actions/orderActions'

const ProcessOrderPage = () => {
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const processOrder = async () => {
			setLoading(true)
			await createOrder()
			setLoading(false)
		}

		processOrder()
	}, [])

	return loading ? <div>Processing Order...</div> : <div>Order Processed</div>
}

export default ProcessOrderPage
