import React from 'react';
import { updateInventory } from '@/utils/actions/productActions';

const EditProductInvForm = ({ product, myStore }: any) => {
  const { inInv, productSlug } = product;
  return (
    <>
      <div className="styled_form">
        <form action={updateInventory} aria-describedby="formInstructions">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Update Inventory
              </h2>
              <p
                id="formInstructions"
                className="mt-3 text-sm leading-2 text-gray-600"
              >
                Update the inventory of your product below. All fields are
                required.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="inInv"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Inventory
                  </label>
                  <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="number"
                    name="inInv"
                    defaultValue={inInv}
                    required
                    aria-required="true"
                  />
                </div>

                <input type="hidden" name="productSlug" value={productSlug} />
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
              className="submit-button rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 button"
              aria-label="Save updated inventory"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProductInvForm;
