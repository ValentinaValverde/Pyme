import ProductItem from '@/components/products/ProductItem'
import { getAllProducts } from '@/utils/actions/productActions'

export default async function Home() {
  const products = await getAllProducts();
  return (
    <>
      <h2 className="text-2xl py-2 text-green-900">
        Pequeñas y Medianas Empresas | Small and Medium Sized Businesses
      </h2>
      <h2 className="text-2xl py-2">Latest Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductItem key={product.productSlug} product={product} />
        ))}
      </div>
    </>
  )
}
