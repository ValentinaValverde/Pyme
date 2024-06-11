'use client';

import React, { useState } from 'react';
import { checkOut } from '@/utils/actions/cartActions';
import { loadStripe } from '@stripe/stripe-js';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Tooltip, Box } from '@mui/material';
import Link from 'next/link';
import {
  CartItemDetail,
  deleteCartItem,
} from '@/utils/actions/cartItemActions';
import DeleteIcon from '@mui/icons-material/Delete';
import { createCartItem } from '@/utils/actions/cartItemActions';
import AddIcon from '@mui/icons-material/Add';
import QtyDropDown from './QtyDropDown';
import { editCartItemQuantity } from '@/utils/actions/cartItemActions';

import { Card, CardContent, Typography } from '@mui/material';

import Bag from '../../public/images/bags/ComeAgain.png';
import Image from 'next/image';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export function Cart({
  initialCartItems,
}: {
  initialCartItems: CartItemDetail[];
}) {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const _deleteCartItem = (productSlug: string) => {
    deleteCartItem(productSlug);
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.productSlug !== productSlug)
    );
  };

  const _editCartItemQuantity = async (
    productSlug: string,
    newQuantity: number
  ) => {
    if (newQuantity === 0) {
      _deleteCartItem(productSlug);
      return;
    }
    await editCartItemQuantity(productSlug, newQuantity);
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.productSlug === productSlug
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <>
        <div className="empty_cart">
          <p className="text">
            Hmm, doesn&apos;t seem like there&apos;s anything here.
          </p>
          <button className="unfilled_button">
            <Link href="/shop">Go Shopping!</Link>
          </button>
        </div>
      </>
    );
  }

  const handleCheckout = async (event: any) => {
    event.preventDefault();
    const stripe = await stripePromise;
    const { id }: any = await checkOut();
    const result = await stripe!.redirectToCheckout({
      sessionId: id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <>
      <div className="cart_container">
        <div className="table_container">
          {cartItems.map((product) => (
            <div key={product.productSlug} className="cart_item_row">
              <div className="container wide">
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="image"
                />
                <div className="product_info">
                  <p>{product.productName}</p>
                  <QtyDropDown
                    slug={product.productSlug}
                    quantity={product.quantity}
                    editQuantity={_editCartItemQuantity}
                  />
                  <p>${product.priceAtTime.toFixed(2)}/item</p>
                </div>
              </div>
              <div className="container short">
                <button
                  className="filled_button"
                  onClick={() => _deleteCartItem(product.productSlug)}
                >
                  X
                </button>
                <p>${(product.priceAtTime * product.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* separate */}
        <div className="pricebag_container">
          <div className="subtotal">
            <p className="title">Subtotal</p>
            <p>
              Total: $
              {cartItems
                .reduce(
                  (total, item) => total + item.priceAtTime * item.quantity,
                  0
                )
                .toFixed(2)}
            </p>
            <button className="filled_button" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
          <Image src={Bag} alt="Bag" className="bag" />
        </div>
      </div>
    </>
  );
}
