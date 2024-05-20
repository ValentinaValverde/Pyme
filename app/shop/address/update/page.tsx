import React from 'react'
import UpsertShippingAddressForm from '@/components/UpsertShippingAddressForm'
import { getShippingAddress } from '@/utils/actions/userActions'



const upsertShippingAddressPage = async() => {
  const shippingAddress = await getShippingAddress(false);
  return (
    <div>
      <UpsertShippingAddressForm address={shippingAddress}/>
    </div>
  )
}

export default upsertShippingAddressPage