import React from 'react'
import { getShippingAddress } from '@/utils/actions/userActions'
import ShippingAddress from '@/components/ShippingAddress'



const getAddressPage = async() => {
  const address = await getShippingAddress(true);
  return (
    <div>
      <ShippingAddress address={address} shop={false}/>
    </div>
  )
}

export default getAddressPage