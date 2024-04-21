'use client'

import { Product } from '@/lib/models/ProductModel'
import Link from 'next/link'
import { createCartItem } from '@/utils/actions/cartItemActions'
import { Card } from '@mui/material'
import { CardContent } from '@mui/material'
import { CardMedia } from '@mui/material'
import { Button } from '@mui/material'
import { Typography } from '@mui/material'
import toast from 'react-hot-toast'

export default function ShopProductItem({
  product,
  storeSlug,
}: {
  product: Product
  storeSlug: string
}) {
  const addToCartHandler = async () => {
    await createCartItem(product.productSlug, 1)
    toast.success('Added to cart', {
      position: 'bottom-center',
    })
  }
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
          <Typography variant="h5" component="div">
            {product.productName}
          </Typography>
        </Link>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">${product.price}</Typography>
        </div>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={addToCartHandler}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )
}
