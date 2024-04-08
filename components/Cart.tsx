import React from 'react'

const Cart = async ({ cartItems }: any) => {
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
		</>
	)
}

export default Cart
