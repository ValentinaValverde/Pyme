'use client'

import React, { useState } from 'react'
import { checkOut } from '@/utils/actions/cartActions'
import { loadStripe } from '@stripe/stripe-js'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button, Tooltip } from '@mui/material'
import Link from 'next/link'
import { CartItemDetail, deleteCartItem } from '@/utils/actions/cartItemActions'
import DeleteIcon from '@mui/icons-material/Delete'
import { createCartItem } from '@/utils/actions/cartItemActions'
import AddIcon from '@mui/icons-material/Add'

import { Card, CardContent, Typography } from '@mui/material'


const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)
/*
// export function CartOld({ cartItems }: any) {
// 	React.useEffect(() => {
// 		const query = new URLSearchParams(window.location.search)
// 		if (query.get('success')) {
// 			alert('Order placed! You will receive an email confirmation.')
// 		}
// 		if (query.get('canceled')) {
// 			alert(
// 				'Order canceled -- continue to shop around and checkout when you’re ready.'
// 			)
// 		}
// 	}, [])

// 	const handleCheckout = async (event: any) => {
// 		event.preventDefault()
// 		const stripe = await stripePromise
// 		const { id }: any = await checkOut()
// 		const result = await stripe!.redirectToCheckout({
// 			sessionId: id
// 		})
// 		if (result.error) {
// 			alert(result.error.message)
// 		}
// 	}

// 	if (!cartItems || cartItems.length === 0) {
// 		return <div>There are currently no items in your cart</div>
// 	}

// 	return (
// 		<>
// 			<div>
// 				{cartItems.map((item: any) => (
// 					<div key={item.id}>
// 						<h1>{item.productName}</h1>
// 						<p>Price: {item.priceAtTime}</p>
// 						<p>Quantity: {item.quantity}</p>
// 					</div>
// 				))}
// 			</div>
// 			<form>
// 				<section>
// 					<button onClick={handleCheckout} type='button' role='link'>
// 						Checkout
// 					</button>
// 				</section>
// 				<style jsx>
// 					{`
// 						section {
// 							background: #ffffff;
// 							display: flex;
// 							flex-direction: column;
// 							width: 400px;
// 							height: 112px;
// 							border-radius: 6px;
// 							justify-content: space-between;
// 						}
// 						button {
// 							height: 36px;
// 							background: #556cd6;
// 							border-radius: 4px;
// 							color: white;
// 							border: 0;
// 							font-weight: 600;
// 							cursor: pointer;
// 							transition: all 0.2s ease;
// 							box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
// 						}
// 						button:hover {
// 							opacity: 0.8;
// 						}
// 					`}
// 				</style>
// 			</form>
// 		</>
// 	)
// }
*/
   


export function Cart({
	initialCartItems
}: {
	initialCartItems: CartItemDetail[]
}) {
	const [cartItems, setCartItems] = useState(initialCartItems)

	const _deleteCartItem = (productSlug: string) => {
		deleteCartItem(productSlug)
		setCartItems((prevCartItems) =>
			prevCartItems.filter((item) => item.productSlug !== productSlug)
		)
	}

	const _createCartItem = (
		productSlug: string,
		addedQuantity: number,
		currentQuantity: number
	) => {
		createCartItem(productSlug, addedQuantity)
		setCartItems((prevCartItems) =>
			prevCartItems.map((item) =>
				item.productSlug === productSlug
					? { ...item, quantity: currentQuantity + addedQuantity }
					: item
			)
		)
	}
	if (!cartItems || cartItems.length === 0) {
		return (
			<>
				<h2 className='mt-8 font-medium text-lg'>
					Currently you do not have any products in your cart.
				</h2>
			</>
		)
	}

	const handleCheckout = async (event: any) => {
		event.preventDefault()
		const stripe = await stripePromise
		const { id }: any = await checkOut()
		const result = await stripe!.redirectToCheckout({
			sessionId: id
		})
		if (result.error) {
			alert(result.error.message)
		}
	}

return (
	<>
	<div style={{ display: 'flex', justifyContent: 'space-between' }}>
		<TableContainer component={Paper}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell style={{ fontWeight: 'bold' }}>Item</TableCell>
						<TableCell style={{ fontWeight: 'bold' }}>Quantity</TableCell>
						<TableCell style={{ fontWeight: 'bold' }}>Price Per Item</TableCell>
						<TableCell style={{ fontWeight: 'bold' }}>Total</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{cartItems.map((product) => (
						<TableRow key={product.productSlug}>
							<TableCell>
								{product.productSlug}
								{product.productImage && (
									<img
										loading="lazy"
										src={product.productImage}
										alt={product.productName}
										className="max-w-xs max-h-24"
										width={100}
										height={100}
									/>
								)}{' '}
							</TableCell>
							<TableCell>
								{product.quantity}
								<Tooltip title="Delete">
								<Button onClick={() => _deleteCartItem(product.productSlug)}>
									<DeleteIcon />
								</Button>
								</Tooltip>
								<Tooltip title="Add Item">
								<Button onClick={() => _createCartItem(product.productSlug, 1, product.quantity)}>
									<AddIcon />
								</Button>
								</Tooltip>
							</TableCell>
							<TableCell>${product.priceAtTime.toFixed(2)}</TableCell>
							<TableCell>${(product.priceAtTime * product.quantity).toFixed(2)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>

			<Card style={{ width: '300px', height: '100%', marginLeft: '20px', marginTop: '20px' }}>
				<CardContent>
					<Typography variant="h5" component="div">
						Subtotal: $
						{cartItems.reduce((total, item) => total + item.priceAtTime * item.quantity, 0)}
					</Typography>
					<Button
          onClick={handleCheckout}
					variant="contained" 
					color="primary" 
					style={{ 
						marginTop: '20px',
						backgroundColor: 'oklch(79.3811% 0.146032 78.618794 /1)',
						borderRadius: '20px',
						color: 'black'
						}}>
						Submit Payment
					</Button>
				</CardContent>
			</Card>
		</div>
	</>
)
}

