import React from 'react';
import { getCartItems } from '@/utils/actions/cartItemActions';
import { Cart } from '@/components/cart/Cart';

const CartPage = async () => {
  const cartItems = await getCartItems();

  return <Cart initialCartItems={cartItems} />;
};

export default CartPage;
