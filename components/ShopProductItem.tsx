import React from 'react'
import { Product } from '@/lib/models/ProductModel'
import Link from 'next/link'

export default function ShopProductItem({
  product,
  storeSlug,
}: {
  product: Product
  storeSlug: string
}) {
  return (
    <div className="card bg-base-300 shadow-xl mb-4">
      <figure>
        <Link href={`${storeSlug}/product/${product.productSlug}`}>
          <img
            src={product.productImage}
            alt={product.productName}
            width={300}
            height={300}
            className="object-cover h-64 w-full"
          />
        </Link>
      </figure>
      <div className="card-body">
        <Link href={`${storeSlug}/product/${product.productSlug}`}>
          <h2 className="card-title font-normal">{product.productName}</h2>
        </Link>
        <div className="card-actions flex justify-between items-center">
          <span className="text-2xl">${product.price}</span>{' '}
        </div>
      </div>
    </div>
  )
}
