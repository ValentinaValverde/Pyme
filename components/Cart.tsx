'use client'

import React from 'react'
import { checkOut } from '@/utils/actions/cartActions'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export default function Cart({ cartItems }: any) {
	React.useEffect(() => {
		const query = new URLSearchParams(window.location.search)
		if (query.get('success')) {
			alert('Order placed! You will receive an email confirmation.')
		}
		if (query.get('canceled')) {
			alert(
				'Order canceled -- continue to shop around and checkout when you’re ready.'
			)
		}
	}, [])

	const handleCheckout = async (event: any) => {
		event.preventDefault()
		const stripe = await stripePromise
		const { id }: any = await checkOut()
		console.log(id)
		const result = await stripe!.redirectToCheckout({
			sessionId: id
		})
		if (result.error) {
			alert(result.error.message)
		}
	}

	if (!cartItems || cartItems.length === 0) {
		return <div>There are currently no items in your cart</div>
	}

	return (
		<>
			<div>
				{cartItems.map((item: any) => (
					<div key={item.id}>
						<h1>{item.productName}</h1>
						<p>Price: {item.priceAtTime}</p>
						<p>Quantity: {item.quantity}</p>
					</div>
				))}
			</div>
			<form>
				<section>
					<button onClick={handleCheckout} type='button' role='link'>
						Checkout
					</button>
				</section>
				<style jsx>
					{`
						section {
							background: #ffffff;
							display: flex;
							flex-direction: column;
							width: 400px;
							height: 112px;
							border-radius: 6px;
							justify-content: space-between;
						}
						button {
							height: 36px;
							background: #556cd6;
							border-radius: 4px;
							color: white;
							border: 0;
							font-weight: 600;
							cursor: pointer;
							transition: all 0.2s ease;
							box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
						}
						button:hover {
							opacity: 0.8;
						}
					`}
				</style>
			</form>
		</>
	)
}
