import React from 'react'
import { StoreStory } from '@/lib/models/StoreStoryModel'
import { Box } from '@mui/material'
import { Card, CardContent } from '@mui/material'

export default function ShopStoreStory({
  story,
  storeSlug,
  storeName,
}: {
  story: StoreStory | null
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
      <Box style={{ padding: '20px 0' }}>
        <Card style={{ flex: 1, borderRadius: '15px' }}>
          <h1
            style={{
              fontSize: '3em',
              fontWeight: 600,
              padding: '20px 0',
              textAlign: 'center',
            }}
            className="text-2xl py-2"
            aria-label={`${storeName} store`}
          >
            {storeName}
          </h1>
        </Card>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        gap={2}
        role="region"
        aria-labelledby="store-story-heading"
      >
        <Card style={{ flex: 1, borderRadius: '15px' }}>
          <CardContent>
            <img
              loading="lazy"
              src={story.storeImage}
              alt={storeImageAlt}
              style={{ width: '100%', height: '100%' }}
              aria-describedby="store-story-image"
            />
            <span id="store-story-image" className="sr-only">
              Image of {storeName} store
            </span>
          </CardContent>
        </Card>
        <Card style={{ flex: 1, borderRadius: '15px' }}>
          <CardContent style={{ width: '100%', height: '100%' }}>
            <h2 style={{ fontSize: '1.5em', fontWeight: 600 }}>Our Story</h2>
            <h5 style={{ width: '100%', height: '100%' }}>
              {story.storeDetails}
            </h5>
          </CardContent>
        </Card>
      </Box>
    </React.Fragment>
  )
}
