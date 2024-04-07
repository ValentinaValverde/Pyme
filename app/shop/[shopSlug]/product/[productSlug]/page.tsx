import { Product } from '@/lib/models/ProductModel'
import ShopProductDetails from '@/components/ShopProductDetails'
import { getStoreProducts } from '@/utils/actions/shopActions'

export default async function ProductDetails({
  params,
}: {
  params: { shopSlug: string; productSlug: string }
}) {
  // TODO: this data should be fetched via hooks or SWR
  let product = (await getStoreProducts(params.shopSlug).then((res) => {
    return res.find((x) => x.productSlug === params.productSlug)
  })) as Product
  return (
    <>
      <ShopProductDetails product={product} />
    </>
  )
}
