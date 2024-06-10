import React from 'react'
import { getOrderAddress } from '@/utils/actions/orderActions'
import ShippingAddress from '@/components/ShippingAddress'

const orderAddressPage = async ({ params }: any) => {
  const address = await getOrderAddress(params.order);
  return (
    <ShippingAddress address={address} shop={true}/>
  )
}

export default orderAddressPage