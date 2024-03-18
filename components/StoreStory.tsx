import React from "react";
import { getStoreStory } from "@/utils/actions/storeActions";
import Image from "next/image";

const StoreStory = async ({ myStore }: any) => {
  const story = await getStoreStory(myStore);

  if (!story.storeDetails) {
    return (
      <h2 className="mt-8 font-medium text-lg">
        Currently this store does not have a store story
      </h2>
    );
  }
  const storeImageAlt = `${myStore} store image`;
  return (
    <>
      <Image
        loading="lazy"
        src={story.storeImage}
        alt={storeImageAlt}
        className="max-w-xs max-h-24"
        width={100}
        height={100}
      />
      <h5>{story.storeDetails}</h5>
      <Image
        loading="lazy"
        src={story.ownerImage}
        alt="owners Image"
        className="max-w-xs max-h-24"
        width={100}
        height={100}
      />
      <h5>{story.ownerDetails}</h5>
    </>
  );
};

export default StoreStory;
