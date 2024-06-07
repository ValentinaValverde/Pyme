import Link from 'next/link';

export default function StorePage({ stores }: any) {
  console.log('STORES:', stores[0]);

  return (
    <>
      <div>
        <h1 className="center">(this is businesses by state)</h1>
        <div className="businesscard_container">
          {stores.map((store: any) => (
            // this link should be to store STATE
            // <Link href={`/shop/${store.slug}`} key={store.storeName}>
            <div
              className="card w-96 bg-base-100 shadow-xl m-5"
              key={store.storeName}
            >
              <figure className="business_card_figure">
                <img
                  src={store.storeImg}
                  alt="Small Business Image"
                  width="400"
                  height="100"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{store.storeName}</h2>
                <p>By {store.storeOwner}</p>
              </div>
            </div>
            // </Link>
          ))}
        </div>
      </div>
    </>
  );
}
