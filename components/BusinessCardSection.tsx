import Link from 'next/link';

export default function BusinessSection({ stores }: any) {

  return (
    <>
      <div>
        <h1 className="center" id="shop-by-business-heading">shop by business</h1>
        <div className="businesscard_container" role="list"
          aria-labelledby="shop-by-business-heading">
          {stores.map((store: any) => (
            <Link href={`/shop/${store.slug}`} key={store.storeName} passHref>
              <div className="card w-96 bg-base-100 shadow-xl m-5">
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
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
