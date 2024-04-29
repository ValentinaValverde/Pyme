import React from 'react';
import { redirect } from 'next/navigation';
import StoreStoryForm from '@/components/create-forms/StoreStoryForm';
import { checkCreatedStore } from '@/utils/actions/storeActions';

const createStoreStoryPage = async ({ params }) => {
  const checkStore = await checkCreatedStore();
  if (!checkStore) {
    redirect('/createstore');
  } else if (!checkStore.completeAddress) {
    redirect(`/createstore/${checkStore.slug}/address`);
  } else if (checkStore.completeStory) {
    redirect(`/mystore/${checkStore.slug}/story/edit`);
  }
  return <StoreStoryForm myStore={params.slug} />;
};

export default createStoreStoryPage;
