'use server';

import dbConnect from '@/lib/dbConnect';
import StoreModel from '@/lib/models/StoreModel';
// import { StoreSchema } from '@/lib/models/StoreModel';
import { Product, ProductModel } from '@/lib/models/ProductModel';
import { StoreStory } from '@/lib/models/StoreStoryModel';
import { StoreStoryModel } from '@/lib/models/StoreStoryModel';
import exp from 'constants'


export const getStoreProducts = async (slug: string): Promise<Product[]> => {
  await dbConnect();

  const store = await StoreModel.findOne({ slug: slug });


  if (!store) {
    throw new Error('Store not found')
  }

  const storeId = store.id

  const storeProducts = await ProductModel.find({
    productStoreId: storeId,
  });

  return storeProducts;
};

export const getStoreStory = async (
  storeSlug: string
): Promise<StoreStory | null> => {
  await dbConnect();
  const store = await StoreModel.findOne({ slug: storeSlug });
  if (!store) {
    return null;
  }
  const storeId = store.id;

  const story = await StoreStoryModel.findOne({ storeId: storeId });
  if (!story) {
    return null;
  }

  return story;
};

// getStore function goes here

// pull / "get" stores from the db
// randomize stores
// display top 4 stores

export const getStores = async () => {
  await dbConnect();

  const stores = await StoreModel.find();
  return stores;
};

export const getFeaturedStores = async () => {
  await dbConnect();

  const allStores = await getStores();
  const stores = allStores.map(async (store) => {
    const story = await getStoreStory(store.slug);

    return {
      storeName: store.storeName,
      storeImg: story?.storeImage,
      storeStory: story?.storeDetails,
    };
  });

  console.log(stores);

  const shuffleStores = stores.sort((a, b) => 0.5 - Math.random());
  console.log('SHUFFLED STORES', shuffleStores.slice(0, 3));
  return shuffleStores.slice(0, 3);
};

export const getStoreName = async (storeSlug: string): Promise<string> => {
  await dbConnect()
  const store = await StoreModel.findOne({ slug: storeSlug })
  if (!store) {
    return ''
  }
  return store.storename
}
