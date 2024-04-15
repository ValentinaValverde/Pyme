import React from 'react'
import { StoreStory } from '@/lib/models/StoreStoryModel'
import { Box } from '@mui/material'
import { Card, CardContent } from '@mui/material';

export default function ShopStoreStory({
  story,
  storeSlug,
  storeName,
}: {
  story: StoreStory
  storeSlug: string
  storeName: string
}) {
  if (!story?.storeDetails) {
    return (
      <h2 className="mt-8 font-medium text-lg">
        Currently this store does not have a store story
      </h2>
    )
  }
  const storeImageAlt = `${storeSlug} store image`
  return (

    <React.Fragment>
      <Box>
        <h1 style={{ fontSize: '3em', fontWeight: 600 }} className="text-2xl py-2">{storeName}</h1>
      </Box>
      <Box display="flex" flexDirection="row" gap={2}>
        <Card style={{ flex: 1, borderRadius: '15px' }}>
          <CardContent>
            <img
              loading="lazy"
              src={story.storeImage}
              alt={storeImageAlt}
              style={{ width: '100%', height: '100%' }}
            />
          </CardContent>
        </Card>
        <Card style={{ flex: 1, borderRadius: '15px' }}>
          <CardContent style={{ width: '100%', height: '100%' }}>
            <h2 style={{ fontSize: '1.5em', fontWeight: 600 }}>Our Story</h2>
            <h5 style={{ width: '100%', height: '100%' }}>{story.storeDetails}</h5>
          </CardContent>
        </Card>
      </Box>
    </React.Fragment>
  )
}
