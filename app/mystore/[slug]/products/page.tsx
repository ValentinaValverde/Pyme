import React from 'react'
import ProductList from '@/components/ProductList'
import Navbar from '@/components/Navbar'
import { Box } from '@mui/material'

const myProductsPage = ({ params }) => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Navbar storeSlug={params.slug} />
        <Box component={'main'} sx={{ flexGrow: 1, p: 3 }}>
          <ProductList myStore={params.slug} />
        </Box>
      </Box>
    </>
  )
}

export default myProductsPage
