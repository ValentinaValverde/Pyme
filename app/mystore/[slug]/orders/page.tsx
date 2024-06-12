import React from 'react';
import { getStoreOrders } from '@/utils/actions/orderActions';
import StoreOrders from '@/components/store/StoreOrders';

const StoreOrdersPage = async ({ params }: any) => {
  const orders = await getStoreOrders();
  return <StoreOrders orders={orders} myStore={params.slug}/>;
};

export default StoreOrdersPage;
