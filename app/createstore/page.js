import React from 'react';
import { redirect } from 'next/navigation';
import StoreSignUpForm from '@/components/StoreSignUpForm';
import { checkCreatedStore } from '@/utils/actions/storeActions';

const CreateStore = async () => {
  const createdCheck = await checkCreatedStore();
  if (!createdCheck) {
    return <StoreSignUpForm />;
  } else if (!createdCheck.completeAddress) {
    redirect(`/createstore/${createdCheck.slug}/address`);
  } else if (!createdCheck.completeStory) {
    redirect(`/createstore/${createdCheck.slug}/story`);
  } else redirect('/mystore');
};
export default CreateStore;
