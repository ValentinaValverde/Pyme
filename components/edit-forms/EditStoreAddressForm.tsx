"use client";
import React from "react";
import { editStoreAddresss } from "@/utils/actions/storeActions";

const EditStoreAddressForm = ({ storeInfo, myStore }: any) => {
  const { streetAddress, city, state, zipcode } = storeInfo;
  return (
    <>
      <div className="styled_form">
        <form action={editStoreAddresss}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Edit Store Address
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Street Address
                  </label>
                  <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="text"
                    name="streetAddress"
                    defaultValue={streetAddress}
                    required
                  />
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-2 sm:col-start-1">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      City
                    </label>
                    <input
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      type="text"
                      name="city"
                      defaultValue={city}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      State / Province
                    </label>
                    <input
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      type="text"
                      name="state"
                      defaultValue={state}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      ZIP / Postal code
                    </label>
                    <input
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      type="text"
                      name="zipcode"
                      defaultValue={zipcode}
                    />
                  </div>
                </div>

                <input type="hidden" name="myStore" value={myStore} />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            {/* <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button> */}
            <button
              type="submit"
              className="submit-button rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditStoreAddressForm;