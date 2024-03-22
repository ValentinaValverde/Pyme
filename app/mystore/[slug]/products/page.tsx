import React from 'react'
import ProductList from '@/components/ProductList'
import Sidebar from '@/components/Sidebar'
import { Box } from '@mui/material'
import { Button } from '@mui/material'

const myProductsPage = ({ params }) => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Sidebar storeSlug={params.slug} />
        <Box component={'main'} sx={{ flexGrow: 1, p: 3 }}>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }}>
              + Add Product
            </Button>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <ProductList myStore={params.slug} />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default myProductsPage
