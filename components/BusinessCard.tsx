import Image from 'next/image';
import image from '../public/business_card_photo.webp';

export default function BusinessCard() {
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl m-5">
        <figure>
          <Image src={image} alt="image" width="400" height="100" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Business Name</h2>
          <p>Business Desc</p>
          {/* <div className="card-actions justify-start">
            <div className="badge badge-outline">Tag 1</div>
            <div className="badge badge-outline">Tag 2</div>
          </div> */}
        </div>
      </div>
    </>
  );
}
