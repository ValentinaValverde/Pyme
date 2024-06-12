import React from 'react';
import { getCartItems } from '@/utils/actions/cartItemActions';
import { Cart } from '@/components/cart/Cart';

const CartPage = async () => {
  const cartItems = await getCartItems();

  return (
    <>
      <div>
        <Cart initialCartItems={cartItems} />
      </div>
    </>
  );
};

export default CartPage;
