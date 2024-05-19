import React from 'react'
import CreateShippingAddressForm from '@/components/UpsertShippingAddressForm'
import { getShippingAddress } from '@/utils/actions/userActions'

const shippingAddress = getShippingAddress(false);

const upsertShippingAddress = () => {
  return (
    <div>
      <CreateShippingAddressForm address={shippingAddress}/>
    </div>
  )
}

export default upsertShippingAddress