'use server'

import dbConnect from '@/lib/dbConnect'
import StoreModel from '@/lib/models/StoreModel'
import { Product, ProductModel } from '@/lib/models/ProductModel'

export const getStoreProducts = async (slug: string): Promise<Product[]> => {
  await dbConnect()

  const store = await StoreModel.findOne({ slug: slug })

  const storeId = store.id

  const storeProducts = await ProductModel.find({
    productStoreId: storeId,
  })

  return storeProducts
}
