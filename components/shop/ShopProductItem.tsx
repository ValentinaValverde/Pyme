'use client';

import { Product } from '@/lib/models/ProductModel';
import Link from 'next/link';
import { createCartItem } from '@/utils/actions/cartItemActions';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { CardMedia } from '@mui/material';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import toast from 'react-hot-toast';

export default function ShopProductItem({
  product,
  storeSlug,
}: {
  product: Product;
  storeSlug: string;
}) {
  const addToCartHandler = async () => {
    await createCartItem(product.productSlug, 1);
    toast.success('Added to cart', {
      position: 'bottom-center',
    });
  };
  return (
    <Card
      style={{
        backgroundColor: 'white',
        borderRadius: '15px',
        marginBottom: '16px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Link href={`${storeSlug}/product/${product.productSlug}`}>
        <CardMedia
          component="img"
          style={{ height: '300px', width: '100%', objectFit: 'cover' }}
          image={product.productImage}
          alt={product.productName}
        />
      </Link>
      <CardContent style={{ marginTop: 'auto' }}>
        <Link href={`${storeSlug}/product/${product.productSlug}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5" component="div">
              {product.productName}
            </Typography>
          </div>
        </Link>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">${product.price.toFixed(2)}</Typography>
        </div>
        {product.inInv > 0 ? (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={addToCartHandler}
          style={{
            borderRadius: '20px',
            backgroundColor: 'oklch(76.172% 0.089459 200.026556 /1)',
            color: 'black',
          }}
        >
          Add to Cart
        </Button>
        ) : (
          <Button
            disabled
            variant="contained"
            color="error"
            fullWidth
            style={{
              borderRadius: '20px',
              backgroundColor: 'oklch(76.172% 0.089459 0 /1)',
              color: 'black',
            }}
          >
            Out of Stock
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
