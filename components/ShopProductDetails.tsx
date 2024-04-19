'use client'
import { Product } from '@/lib/models/ProductModel'
import AddToCart from '@/components/ShopAddToCart'
import { Card, CardContent } from '@mui/material';

export default function ShopProductDetails({ product }: { product: Product }) {
  return (
    <>
      <div className="my-2"></div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Card style={{ backgroundColor: 'white', borderRadius: '15px' }}>
            <CardContent>
          <img
            src={product?.productImage}
            alt={product?.productName}
            width={640}
            height={640}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
            </CardContent>
          </Card>
        </div>
        <div>
          <ul className="space-y-4">
            <li>
              <h1 className="text-xl">{product.productName}</h1>
            </li>
            <div className="divider"></div>
            <li>
              Description: <p>{product.productDetails}</p>
            </li>
          </ul>
        </div>
        <div>
          <Card style={{ backgroundColor: 'white', borderRadius: '15px' }}>
            <CardContent>
              <div className="mb-2 flex justify-between">
                <div>Price</div>
                <div>${product.price}</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Status</div>
                <div>{product.inInv > 0 ? 'In Stock' : 'Unavailable'}</div>
              </div>
              {product.inInv > 0 && (
                <div className="card-actions justify-center">
                  <AddToCart item={{ ...product, qty: 0, color: '', size: '' }} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}