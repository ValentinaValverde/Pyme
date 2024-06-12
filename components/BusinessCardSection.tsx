import Link from 'next/link';
import Image from 'next/image';

export default function BusinessSection({ stores }: any) {
  // console.log('STORES:', stores[0]);

  return (
    <>
      <div className="businesscard_container">
        {stores?.map((store: any) => (
          <div className="business_card" key={store.storeName}>
            <Link href={`/shop/${store.slug}`}>
              <img src={store.storeImg} alt="Store Image" />
              <h2>{store.storeName}</h2>
              <p className="subtitle">By {store.storeOwner}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
