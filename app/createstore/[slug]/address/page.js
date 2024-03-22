import React from 'react';
import CreateStoreAddressForm from '@/components/create-forms/CreateStoreAddressForm';

const storeStreetAddressPage = ({ params }) => {
  return (
    <>
      <CreateStoreAddressForm myStore={params.slug} />
    </>
  );
};

export default storeStreetAddressPage;
