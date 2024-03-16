'use client'
import React from 'react'
import Navbar from '@/components/Navbar'
import { Box } from '@mui/material'
import { useParams } from 'next/navigation'

const MyStoreHome = () => {
  const params = useParams()
  const slug = params.slug?.toString() || ''
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Navbar storeSlug={slug} />
        <Box component={'main'} sx={{ flexGrow: 1, p: 3 }}>
          <div>Store Home</div>
        </Box>
      </Box>
    </>
  )
}

export default MyStoreHome
