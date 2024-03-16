import React from 'react'
import { updateInventory } from '@/utils/actions/productActions'

const EditProductInvForm = ({ product, myStore }: any) => {
	const { inInv, productSlug } = product
	return (
		<form action={updateInventory}>
			<input
				className='input input-bordered join-item w-full'
				placeholder='inInv'
				type='number'
				defaultValue={inInv}
				name='inInv'
				required
			/>
			<input type='hidden' name='productSlug' value={productSlug} />
			<input type='hidden' name='myStore' value={myStore} />
			<button type='submit' className='btn join-item btn-primary'>
				Update
			</button>
		</form>
	)
}

export default EditProductInvForm
