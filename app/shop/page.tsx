import React from 'react';
import BusinessSection from '@/components/BusinessCardSection';
import { getDisplayAllStores } from '@/utils/actions/shopActions';
import Bag from '../../public/images/bags/Welcome.png';
import Image from 'next/image';

export default async function Home() {
  const businesses = await getDisplayAllStores();

  return (
    <>
      <div className="allstores_header">
        <Image src={Bag} alt="bag" className="image" />
        <p>All Stores</p>
      </div>
      <BusinessSection stores={businesses} />
    </>
  );
}
