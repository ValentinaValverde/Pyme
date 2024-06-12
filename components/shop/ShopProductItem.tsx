'use client';

import { Product } from '@/lib/models/ProductModel';
import Link from 'next/link';
import { createCartItem } from '@/utils/actions/cartItemActions';
import toast from 'react-hot-toast';

// export default function ShopProductItem({
//   product,
//   storeSlug,
// }: {
//   product: Product;
//   storeSlug: string;
// }) {
//   const addToCartHandler = async () => {
//     await createCartItem(product.productSlug, 1);
//     toast.success('Added to cart', {
//       position: 'bottom-center',
//     });
//   };
//   return (
//     <>
// <Link
//   href={`${storeSlug}/product/${product.productSlug}`}
//   className="product_card"
// >
//   <img
//     src={product.productImage}
//     alt={product.productName}
//     className="image"
//   />
//   <p>{product.productName}</p>
//   <p className="price">${product.price.toFixed(2)}</p>
// </Link>
//     </>
//   );
// }

export default function ShopProductItem({
  product,
  storeSlug,
}: {
  product: Product;
  storeSlug: string;
}) {
  return (
    <>
      <Link
        href={`${storeSlug}/product/${product.productSlug}`}
        className="product_card"
      >
        <img
          src={product.productImage}
          alt={product.productName}
          className="image"
        />
        <p>{product.productName}</p>
        <p className="price">${product.price.toFixed(2)}</p>
      </Link>
    </>
  );
}
