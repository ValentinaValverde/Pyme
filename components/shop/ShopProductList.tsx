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
      <h2 className="products_title">Products</h2>
      <div className="shop_products_container">
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
