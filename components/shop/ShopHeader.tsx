import React from 'react';
import { StoreStory } from '@/lib/models/StoreStoryModel';

export default function ShopHeader({
  story,
  storeSlug,
  storeName,
}: {
  story: StoreStory | null;
  storeSlug: string;
  storeName: string;
}) {
  const storeImageAlt = `${storeSlug} store image`;

  return (
    <>
      <div>
        <div>
          <img
            src={story?.storeImage}
            alt={storeImageAlt}
            className="shop_image"
          />
        </div>
        <div className="shop_info">
          <p className="title">{storeName}</p>
          <p>{story?.storeDetails}</p>
        </div>

        <div className="owner_info_container">
          <div>
            <img
              src={story?.ownerImage}
              alt="Shop Owner Image"
              className="owner_image"
            />
          </div>
          <div className="container">
            {/* in the future I'd like to have the owners name below */}
            {/* example: "About John Smith" */}
            <p className="about_owner_title">About the Owner</p>
            <p>{story?.ownerDetails}</p>
          </div>
        </div>
      </div>
    </>
  );
}
