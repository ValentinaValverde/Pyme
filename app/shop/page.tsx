import StoreProductList from '@/components/StoreProductList'
import data from '@/lib/data'

export default function Home() {
  return (
    <>
      <StoreProductList data={data} />
    </>
  )
}
