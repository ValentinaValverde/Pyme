import React from 'react';
import { getCustomerOrders } from '@/utils/actions/orderActions';
import CustomerOrders from '@/components/CustomerOrders';

const customerOrdersPage = async () => {
  const orders = await getCustomerOrders();

  return <CustomerOrders orders={orders} />;
};

export default customerOrdersPage;
