import Image from 'next/image';
import Link from 'next/link';
import Bag from '../public/images/bags/Welcome.png';

export default function Hero() {
  return (
    <>
      <div className="header">
        <div className="content">
          <h1 className="title">Pyme</h1>
          <p className="subtitle">The Marketplace for Small Businesses</p>
          <br />
          <button className="unfilled_button">
            <Link href="/shop">Browse Now</Link>
          </button>
        </div>
        <div className="content">
          <Image src={Bag} alt="bag" className="image" />
        </div>
      </div>
    </>
  );
}
