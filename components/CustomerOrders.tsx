import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'

const CustomerOrders = ({ orders }: { orders: any[] }) => {
  if (orders.length === 0) {
    return <h2>No Orders Yet</h2>
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>Order</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Product</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Image</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Quantity</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Price Per Item</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order: any) => (
            <React.Fragment key={order.id}>
              <TableRow>
                <TableCell colSpan={5} style={{ fontWeight: 'bold' }}>
                  Order ID: {order.id}
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
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} style={{ fontWeight: 'bold' }}>
                  Total Price
                </TableCell>
                <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CustomerOrders
