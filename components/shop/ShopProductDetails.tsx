'use client';
import { Product } from '@/lib/models/ProductModel';
import { Card, CardContent } from '@mui/material';
import { Button } from '@mui/material';
import { createCartItem } from '@/utils/actions/cartItemActions';
import toast from 'react-hot-toast';

export default function ShopProductDetails({ product }: { product: Product }) {
  const addToCartHandler = async () => {
    await createCartItem(product.productSlug, 1);
    toast.success('Added to cart', {
      position: 'bottom-center',
    });
  };

  return (
    <>
      <div className="product_container">
        {/* <div> */}
        <img
          src={product?.productImage}
          alt={product?.productName}
          className="image"
        />
        {/* </div> */}
        <div className="product_info_container">
          <p className="product_name">{product.productName}</p>
          <p>${product.price.toFixed(2)}</p>
          <p>{product.productDetails}</p>
          <button onClick={addToCartHandler} className="unfilled_button">
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
