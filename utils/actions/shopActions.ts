'use server';

import dbConnect from '@/lib/dbConnect';
import StoreModel from '@/lib/models/StoreModel';
// import { StoreSchema } from '@/lib/models/StoreModel';
import { Product, ProductModel } from '@/lib/models/ProductModel';
import { StoreStory } from '@/lib/models/StoreStoryModel';
import { StoreStoryModel } from '@/lib/models/StoreStoryModel';
import exp from 'constants';
import StoreAddressModel from '@/lib/models/StoreAddress';

interface StoreData {
  storeName: string;
  storeImg: string | undefined;
  storeOwner: string;
  slug: string;
}

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

export const getStoresByState = async (state: string) => {
  await dbConnect();
  console.log('STATE FROM SHOPACTIONS: ', state);

  // Get all store addresses in the state
  const storesAddress = await StoreAddressModel.find({ state: state });

  // filter all stores by the storeId
  const stories = await StoreStoryModel.find({
    storeId: { $in: storesAddress.map((store) => store.storeId) },
  });

  // filter all stores by the id
  const stores = await StoreModel.find({
    id: { $in: stories.map((story) => story.storeId) },
  });

  let displayStoreData: StoreData[] = [];

  stores.forEach((store) => {
    const storeAddress = storesAddress.find(
      (address) => address.storeId === store.id
    );
    const storeStory = stories.find((story) => story.storeId === store.id);
    displayStoreData.push({
      storeName: store.storename,
      storeImg: storeStory?.storeImage,
      storeOwner: store.ownername,
      slug: store.slug,
    });
  });
  return displayStoreData;
};
