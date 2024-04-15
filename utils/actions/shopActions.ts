'use server'

import dbConnect from '@/lib/dbConnect'
import StoreModel from '@/lib/models/StoreModel'
import { Product, ProductModel } from '@/lib/models/ProductModel'
import { StoreStory } from '@/lib/models/StoreStoryModel'
import { StoreStoryModel } from '@/lib/models/StoreStoryModel'
import exp from 'constants'

export const getStoreProducts = async (slug: string): Promise<Product[]> => {
  await dbConnect()

  const store = await StoreModel.findOne({ slug: slug })

  if (!store) {
    throw new Error('Store not found')
  }

  const storeId = store.id

  const storeProducts = await ProductModel.find({
    productStoreId: storeId,
  })

  return storeProducts
}

export const getStoreStory = async (
  storeSlug: string
): Promise<StoreStory | null> => {
  await dbConnect()
  const store = await StoreModel.findOne({ slug: storeSlug })
  if (!store) {
    return null
  }
  const storeId = store.id

  const story = await StoreStoryModel.findOne({ storeId: storeId })
  if (!story) {
    return null
  }

  return story
}

export const getStoreName = async (storeSlug: string): Promise<string> => {
  await dbConnect()
  const store = await StoreModel.findOne({ slug: storeSlug })
  if (!store) {
    return ''
  }
  return store.storename
}