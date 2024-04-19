import Link from 'next/link';

export default function BusinessSection({ stores }: any) {
  console.log('STORES:', stores[0]);

  return (
    <>
      <div>
        <h1 className="center">shop by business</h1>
        <div className="businesscard_container">
          {stores.map((store: any) => (
            <Link href={`/shop/${store.slug}`} key={store.storeName}>
              <div className="card w-96 bg-base-100 shadow-xl m-5">
                <figure>
                  <img
                    src={store.storeImg}
                    alt="Small Business Image"
                    width="400"
                    height="100"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{store.storename}</h2>
                  <p>By {store.ownername}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
