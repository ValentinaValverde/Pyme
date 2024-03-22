import React from 'react'
import { updateInventory } from '@/utils/actions/productActions'

const EditProductInvForm = ({ product, myStore }: any) => {
	const { inInv, productSlug } = product
	return (
		<>
			<div className='styled_form'>
				<form action={updateInventory}>
					<div className='space-y-12'>
						<div className='border-b border-gray-900/10 pb-12'>
							<h2 className='text-base font-semibold leading-7 text-gray-900'>
								Update Inventory
							</h2>

							<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
								<div className='sm:col-span-4'>
									<label className='block text-sm font-medium leading-6 text-gray-900'>
										Inventory
									</label>
									<input
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
										type='number'
										name='inInv'
										defaultValue={inInv}
										required
									/>
								</div>

								<input type='hidden' name='productSlug' value={productSlug} />
								<input type='hidden' name='myStore' value={myStore} />
							</div>
						</div>
					</div>

					<div className='mt-6 flex items-center justify-end gap-x-6'>
						{/* <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button> */}
						<button
							type='submit'
							className='submit-button rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default EditProductInvForm
