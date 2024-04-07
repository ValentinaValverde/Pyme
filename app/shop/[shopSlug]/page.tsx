import StoreProductList from '@/components/ShopProductList'
import { getStoreProducts } from '@/utils/actions/shopActions'

export default async function Home({
  params,
}: {
  params: { shopSlug: string }
}) {
  // TODO: this data should be fetched via hooks or SWR (or maybe it can stay as server-side rendered)
  let products = await getStoreProducts(params.shopSlug)
  return (
    <>
      <StoreProductList storeSlug={params.shopSlug} products={products} />
    </>
  )
}
