import Link from 'next/link';

export default function Featured({ featuredStores }: any) {
  console.log('FT:', featuredStores);

  return (
    <div>
      {featuredStores.map((store: any) => (
        <Link href={`/shop/${store.storeSlug}`} key={store.storeName}>
          <div className="card w-96 bg-base-100 shadow-xl m-5">
            <figure>
              <img src={store.storeImg} alt="Small Business Image" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{store.storeName}</h2>
              <p>{store.storeStory}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
