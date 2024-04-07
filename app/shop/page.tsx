import StoreProductList from '@/components/StoreProductList'
import data from '@/lib/data'
import { Box } from '@mui/material'

export default function Home() {
  return (
    <>
          <StoreProductList data={data} />
    </>
  )
}
