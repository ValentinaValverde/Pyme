import { Product } from '@/lib/models/ProductModel';
import ShopProductDetails from '@/components/shop/ShopProductDetails';
import { getStoreProducts } from '@/utils/actions/shopActions';
import StoreProductList from '@/components/shop/ShopProductList';

export default async function ProductDetails({
  params,
}: {
  params: { shopSlug: string; productSlug: string };
}) {
  // TODO: this data should be fetched via hooks or SWR
  let product = (await getStoreProducts(params.shopSlug).then((res) => {
    return res.find((x) => x.productSlug === params.productSlug);
  })) as Product;

  let products = await getStoreProducts(params.shopSlug);

  return (
    <>
      <ShopProductDetails product={product} />
      <div style={{ height: 100 }} />
      {/* ISSUE: Linking is weird */}
      <StoreProductList storeSlug={params.shopSlug} products={products} />
    </>
  );
}
