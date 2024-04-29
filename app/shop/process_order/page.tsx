'use client';
import React, { useState, useEffect } from 'react';
import { createOrder } from '@/utils/actions/orderActions';

const ProcessOrderPage = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const processOrder = async () => {
      setLoading(true);
      await createOrder();
      setLoading(false);
    };

    processOrder();
  }, []);

  return loading ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
        fontSize: '24px',
        fontWeight: 'bold',
      }}
    >
      Processing Order...
    </div>
  ) : (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
        fontSize: '24px',
        fontWeight: 'bold',
      }}
    >
      Your order has been processed.
    </div>
  );
};

export default ProcessOrderPage;
