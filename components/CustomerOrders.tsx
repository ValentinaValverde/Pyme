import React from 'react'
import {
	  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from '@mui/material'

const CustomerOrders = ({ orders }: { orders: any[] }) => {
  if (orders.length === 0) {
    return <h2>No Orders Yet</h2>
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="Customer orders table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Order</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Product</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Image</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Quantity</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>
                Price Per Item
              </TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>

        {orders.map((order: any) => (
			<Box marginBottom={2} key={order.id}>
			<TableContainer component={Paper}>
			<Table aria-label="simple table"></Table>
          <Table key={order.id} style={{ marginTop: '20px' }}>
            <TableBody>
              <React.Fragment key={order.id}>
                <TableRow>
                  <TableCell colSpan={6} style={{ fontWeight: 'bold' }} aria-label={`Order number ${order.id}`}>
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
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>{item.status}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} style={{ fontWeight: 'bold' }}>
                    Total Price
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold' }} aria-label={`Total price for order ${order.id}`}>
                    ${order.totalPrice.toFixed(2)}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            </TableBody>
          </Table>
      </TableContainer>
	  <Divider style={{ backgroundColor: 'black', height: '2px', marginTop: '20px', marginBottom: '20px' }} />
	  </Box>
		))}
	  </TableContainer>
    </>
  )
}

export default CustomerOrders
