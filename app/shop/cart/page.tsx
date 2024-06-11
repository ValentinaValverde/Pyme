import React from 'react';
import { getCartItems } from '@/utils/actions/cartItemActions';
import { Cart } from '@/components/cart/Cart';

const CartPage = async () => {
  const cartItems = await getCartItems();

  return (
    <>
      <div
        style={{
          // backgroundColor: 'black',
          width: '100%',
          maxWidth: '100%',
          height: '100%',
        }}
      >
        <Cart initialCartItems={cartItems} />
      </div>
    </>
  );
};

export default CartPage;
