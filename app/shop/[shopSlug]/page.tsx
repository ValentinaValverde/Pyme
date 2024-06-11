import ShopHeader from '@/components/shop/ShopHeader';
import StoreProductList from '@/components/shop/ShopProductList';
import {
  getStoreProducts,
  getStoreStory,
  getStoreName,
} from '@/utils/actions/shopActions';

export default async function Home({
  params,
}: {
  params: { shopSlug: string };
}) {
  // TODO: this data should be fetched via hooks or SWR (or maybe it can stay as server-side rendered)
  let products = await getStoreProducts(params.shopSlug);
  let story = await getStoreStory(params.shopSlug);
  let storeName = await getStoreName(params.shopSlug);

  return (
    <>
      <ShopHeader
        story={story}
        storeSlug={params.shopSlug}
        storeName={storeName}
      />
      <StoreProductList storeSlug={params.shopSlug} products={products} />
    </>
  );
}
