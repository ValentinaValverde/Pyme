'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { upsertShippingAddress } from '@/utils/actions/userActions'
import { useFormStatus, useFormState } from 'react-dom'
import toast from 'react-hot-toast'


const SubmitBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="submit-button rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      aria-label="Submit shipping address form"
    >
      {pending ? 'Wait...' : 'Save'}
    </button>
  );
};

const initialState = {
  message: '',
};

const UpsertShippingAddressForm = (address: any) => {
  const [state, formAction] = useFormState(upsertShippingAddress, initialState);
  useEffect(() => {
    if (state.message !== '') {
      toast.error(state.message)
    }
  }, [state])
  return (
    <>
      <div className="styled_form">
        <form action={formAction} aria-labelledby="shipping-address-heading">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900" id="shipping-address-heading">
                Create Store Address
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="streetAddress" className="block text-sm font-medium leading-6 text-gray-900">
                    Street Address
                  </label>
                  <input
                    id="streetAddress"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="text"
                    name="streetAddress"
                    defaultValue={address.streetAddress}
                    required
                    aria-required="true"
                  />
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      id="city"
                      type="text"
                      name="city"
                      defaultValue={address.city}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      id="state"
                      type="text"
                      name="state"
                      defaultValue={address.state}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="zipcode" className="block text-sm font-medium leading-6 text-gray-900">
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      id="zipcode"
                      type="text"
                      name="zipcode"
                      defaultValue={address.zipcode}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      aria-required="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <SubmitBtn />
          </div>
        </form>
      </div>
    </>
  )
}

export default UpsertShippingAddressForm