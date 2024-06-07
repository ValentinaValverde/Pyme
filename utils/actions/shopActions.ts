'use server';

import dbConnect from '@/lib/dbConnect';
import StoreModel from '@/lib/models/StoreModel';
// import { StoreSchema } from '@/lib/models/StoreModel';
import { Product, ProductModel } from '@/lib/models/ProductModel';
import { StoreStory } from '@/lib/models/StoreStoryModel';
import { StoreStoryModel } from '@/lib/models/StoreStoryModel';
import exp from 'constants';

import StoreAddressSchema from '@/lib/models/StoreAddress';

export const getStoreProducts = async (slug: string): Promise<Product[]> => {
  await dbConnect();

  const store = await StoreModel.findOne({ slug: slug });

  if (!store) {
    throw new Error('Store not found');
  }

  const storeId = store.id;

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

export const getStoreName = async (storeSlug: string): Promise<string> => {
  await dbConnect();
  const store = await StoreModel.findOne({ slug: storeSlug });
  if (!store) {
    return '';
  }
  return store.storename;
};

export const getStores = async () => {
  await dbConnect();

  const stores = await StoreModel.find();
  return stores;
};

export const getFeaturedStores = async () => {
  await dbConnect();

  const allStores = await getStores();
  const stores = await Promise.all(
    allStores.map(async (store) => {
      const story = await getStoreStory(store.slug);
      return {
        storeName: store.storename,
        storeImg: story?.storeImage,
        storeStory: story?.storeDetails,
        storeSlug: store.slug,
      };
    })
  );

  const shuffleStores = stores.sort((a, b) => 0.5 - Math.random());
  return shuffleStores.slice(0, 3);
};

export const getDisplayAllStores = async () => {
  await dbConnect();

  const allStores = await getStores();
  const stores = await Promise.all(
    allStores.map(async (store) => {
      const story = await getStoreStory(store.slug);
      return {
        storeName: store.storename,
        storeImg: story?.storeImage,
        storeOwner: store.ownername,
        slug: store.slug,
      };
    })
  );

  return stores;
};

// getStoreByState
// pass in state to function
// find address model
// storeIDs

// store = await getStoreAddress or something
// every store that has that state is now in variable store
// get storeID from those stores

export const getStoreByState = async () => {
  await dbConnect();

  // const store = await StoreAddressSchema.find({
  //   storeState: state,
  // });

  console.log('STORE ADDRESS SCHEMA: ', StoreAddressSchema);
};
