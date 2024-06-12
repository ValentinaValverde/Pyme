'use client';
import React from 'react';
import Link from 'next/link';
import { createOrUpdateStoreStory } from '@/utils/actions/storeActions';

const EditStoreStoryForm = ({ story, myStore }: any) => {
  const { storeImage, storeDetails, ownerImage, ownerDetails } = story;
  return (
    <>
      <div className="styled_form">
        <form
          action={createOrUpdateStoreStory}
          aria-describedby="formInstructions"
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Edit a Store Story
              </h2>
              <p
                id="formInstructions"
                className="mt-3 text-sm leading-2 text-gray-600"
              >
                Update the store story details below. All fields are required.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="ownerImage"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Owner Image URL
                  </label>
                  <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="text"
                    name="ownerImage"
                    id="ownerImage"
                    defaultValue={ownerImage}
                    required
                    aria-required="true"
                  />
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="ownerDetails"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Owner Story
                  </label>
                  <textarea
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    rows={3}
                    name="ownerDetails"
                    id="ownerDetails"
                    defaultValue={ownerDetails}
                    required
                    aria-required="true"
                  />
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Share your story
                  </p>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="storeImage"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Store Image URL
                  </label>
                  <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="text"
                    name="storeImage"
                    id="storeImage"
                    defaultValue={storeImage}
                    required
                    aria-required="true"
                  />
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="storeDetails"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Store Details / Story
                  </label>
                  <textarea
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    rows={3}
                    name="storeDetails"
                    id="storeDetails"
                    defaultValue={storeDetails}
                    required
                    aria-required="true"
                  />
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Share your store&apos;s story
                  </p>
                </div>

                <input type="hidden" name="myStore" value={myStore} />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link href={`/mystore/${myStore}`}>
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                aria-label="Cancel and go back to the store page"
              >
                Cancel
              </button>
            </Link>

            <button
              type="submit"
              className="submit-button rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 button"
              aria-label="Save store story"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default createOrUpdateStoreStory;
