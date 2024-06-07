import React from 'react';
import BusinessSection from '@/components/BusinessCardSection';
import { getDisplayAllStores } from '@/utils/actions/shopActions';

export default async function Home() {
  const businesses = await getDisplayAllStores();

  return (
    <>
      <div>
        <BusinessSection stores={businesses} />
      </div>
    </>
  );
}
