import React from 'react';
import ProductItem from './ShopProductItem';
import { Product } from '@/lib/models/ProductModel';

export default function StoreProductList({
  products,
  storeSlug,
}: {
  products: Product[];
  storeSlug: string;
}) {
  return (
    <>
      <h2
        style={{ padding: '20px 0', fontWeight: 500 }}
        className="text-2xl py-2 text-center"
        id="product-list-heading"
      >
        Our Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
      role="listitem"
      aria-labelledby="product-list-heading">
        {products.map((product) => (
          <ProductItem
            key={product.productSlug}
            storeSlug={storeSlug}
            product={product}
          />
        ))}
      </div>
    </>
  );
}
