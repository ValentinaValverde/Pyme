'use client'

import React, { useEffect } from 'react'
import Link from 'next/link';
import {
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';




const ShippingAddress = ({address, shop}: {address: any, shop: boolean}) => {
  const { streetAddress, city, state, zipcode } = address;
  const router = useRouter();

  


  return (
    <TableContainer component={Box}>
      <Typography variant="h3">Shipping Address</Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Street Address:</TableCell>
            <TableCell>{streetAddress}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>City:</TableCell>
            <TableCell>{city}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>State:</TableCell>
            <TableCell>{state}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Zip Code:</TableCell>
            <TableCell>{zipcode}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box mt={2}></Box>
      {!shop && (
        <>
          <Link href={`/shop/orders`}>
            <button className="submit-button">Continue</button>
          </Link>
          <Link href={`/shop/address/update`}>
            <button className="submit-button">Update Address</button>
          </Link>
        </>
        )}
      {shop && (
        <button className="submit-button" onClick={() => router.back()}>Back</button>
      )}
    </TableContainer>
  )
}

export default ShippingAddress