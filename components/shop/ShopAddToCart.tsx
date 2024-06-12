'use client';
import useCartService from '@/lib/hooks/useCartStore';
import { OrderItem } from '@/lib/models/OrderModel';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AddToCart({ item }: { item: OrderItem }) {
  const router = useRouter();
  const { items, increase } = useCartService();
  const [existItem, setExistItem] = useState<OrderItem | undefined>();
  useEffect(() => {
    setExistItem(items.find((x) => x.slug === item.slug));
  }, [item, items]);

  const addToCartHandler = () => {
    increase(item);
  };
  return existItem ? (
    <div>
      <button className="btn" type="button" aria-label="Decrease quantity">
        -
      </button>
      <span className="px-2" aria-live="polite" aria-atomic="true">
        {existItem.qty}</span>
      <button className="btn" type="button" aria-label="Increase quantity">
        +
      </button>
    </div>
  ) : (
    <button
      onClick={addToCartHandler}
      className="btn btn-primary w-full"
      type="button"
      aria-label="Add to cart"
    >
      Add to Cart
    </button>
  );
}
