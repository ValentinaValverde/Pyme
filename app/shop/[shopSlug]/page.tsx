import StoreProductList from '@/components/ShopProductList'
import data from '@/lib/data'
import { getStoreProducts } from '@/utils/actions/shopActions'

export default async function Home({
  params,
}: {
  params: { shopSlug: string }
}) {
  let products = await getStoreProducts(params.shopSlug)
  return (
    <>
      <StoreProductList storeSlug={params.shopSlug} products={products} />
    </>
  )
}
