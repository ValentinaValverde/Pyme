'use client';
import React, { useEffect } from 'react';
import { createOrUpdateStoreStory } from '@/utils/actions/storeActions';
import Link from 'next/link';
import { useFormStatus, useFormState } from 'react-dom';
import toast from 'react-hot-toast';

const SubmitBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="submit-button rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 button"
      aria-disabled={pending}
      aria-label={pending ? 'Please wait...' : 'Save'}
    >
      {pending ? 'Wait...' : 'Save'}
    </button>
  );
};

const initialState = {
  message: '',
};

const StoreStoryForm = ({ story, myStore }: any) => {
  let storeImage = '';
  let storeDetails = '';
  let ownerImage = '';
  let ownerDetails = '';

  if (story) {
    storeImage = story.storeImage;
    storeDetails = story.storeDetails;
    ownerImage = story.ownerImage;
    ownerDetails = story.ownerDetails;
  }
  const [state, formAction] = useFormState(
    createOrUpdateStoreStory,
    initialState
  );
  useEffect(() => {
    if (state.message !== '') {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <>
      <div className="styled_form" aria-describedby="formInstructions">
        <form action={formAction}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Create a Store Story
              </h2>
              <p
                id="formInstructions"
                className="mt-3 text-sm leading-2 text-gray-600"
              >
                Share your store&apos;s story
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
                defaultValue={storeImage}
                name="storeImage"
                id="storeImage"
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
                defaultValue={storeDetails}
                name="storeDetails"
                id="storeDetails"
                minLength={10}
                maxLength={3000}
                required
                aria-required="true"
              />
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="ownerImage"
                  className="block text-sm font-medium leading-2 text-gray-900"
                >
                  Owner Image URL
                </label>
                <input
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="text"
                  defaultValue={ownerImage}
                  name="ownerImage"
                  id="ownerImage"
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
                  defaultValue={ownerDetails}
                  name="ownerDetails"
                  id="ownerDetails"
                  minLength={10}
                  maxLength={3000}
                  required
                  aria-required="true"
                />
                <input type="hidden" name="myStore" value={myStore} />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link href={`/mystore/${myStore}`} passHref>
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                aria-label="Cancel and go back to the store page"
              >
                Cancel
              </button>
            </Link>
            <SubmitBtn />
          </div>
        </form>
      </div>
    </>
  );
};

export default StoreStoryForm;
