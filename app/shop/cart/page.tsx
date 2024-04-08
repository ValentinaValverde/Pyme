import React from 'react'
import { getCartItems } from '@/utils/actions/cartItemActions'
import Cart from '@/components/Cart'

const CartPage = async () => {
	const cartItems = await getCartItems()

	return <Cart cartItems={cartItems} />
}

export default CartPage
