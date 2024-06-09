import React from 'react';
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material';
import OrderStatDropDown from './OrderStatDropDown';
import Link from 'next/link';


const StoreOrders = ({ orders, myStore }: { orders: any[], myStore: any }) => {

  if (orders.length === 0) {
    return <h2>No Orders Yet</h2>;
  }

  return (
    <div>
      {orders.map((order: any, index: number) => (
        <Box marginBottom={6} key={order.id}>
          <TableContainer
            component={Paper}
            style={{ marginTop: '20px', marginBottom: '20px' }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>Order</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Product</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Image</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Quantity</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>
                    Price Per Item
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order: any) => (
                  <React.Fragment key={order.id}>
                    <TableRow>
                      <TableCell colSpan={5} style={{ fontWeight: 'bold' }}>
                        Order #: {order.id}
                      </TableCell>
                    </TableRow>
                    {order.items.map((item: any) => (
                      <TableRow key={item.productSlug}>
                        <TableCell></TableCell>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>
                          <img
                            loading="lazy"
                            src={item.productImage}
                            alt={item.productName}
                            className="max-w-xs max-h-24"
                            width={100}
                            height={100}
                          />
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          <OrderStatDropDown
                            item={item.item_id}
                            status={item.status}
                          />
                        </TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={4} style={{ fontWeight: 'bold' }}>
                        Total Price
                      </TableCell>
                      <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={4} style={{ fontWeight: 'bold' }}>
                        <Link href={`/mystore/${myStore}/orders/${order.id}`}>
                          <button className="submit-button">Shipping Address</button>
                        </Link>
                      </TableCell>
                    </TableRow>
                    <Divider />
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider
            style={{
              backgroundColor: 'black',
              height: '2px',
              marginTop: '20px',
              marginBottom: '20px',
            }}
          />
        </Box>
      ))}
    </div>
  );
};

export default StoreOrders;
