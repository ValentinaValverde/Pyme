import React from 'react'
import { StoreStory } from '@/lib/models/StoreStoryModel'

export default function ShopStoreStory({
  story,
  storeSlug,
}: {
  story: StoreStory
  storeSlug: string
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
    <>
      <h1 className="text-2xl py-2">{storeSlug}</h1>
      <img
        loading="lazy"
        src={story.storeImage}
        alt={storeImageAlt}
        className="max-w-xs max-h-24"
        width={250}
        height={250}
      />
      <h5>{story.storeDetails}</h5>
      {/*
      <img
        loading="lazy"
        src={story.ownerImage}
        alt="owners Image"
        className="max-w-xs max-h-24"
        width={100}
        height={100}
      />
      <h5>{story.ownerDetails}</h5>
  */}
    </>
  )
}
