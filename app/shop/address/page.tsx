import React from 'react'
import { getShippingAddress } from '@/utils/actions/userActions'
import ShippingAddress from '@/components/ShippingAddress'

const address = getShippingAddress(true);

const getAddressPage = () => {
  return (
    <div>
      <ShippingAddress address={address}/>
    </div>
  )
}

export default getAddressPage