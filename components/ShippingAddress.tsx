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
    <TableContainer component={Box} aria-labelledby="shipping-address-heading">
      <Typography variant="h3" id="shipping-address-heading">Shipping Address</Typography>
      <Table aria-label="Shipping address table">
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
          <Link href={`/shop/orders`} passHref>
            <button className="submit-button" aria-label="Continue to orders">Continue</button>
          </Link>
          <Link href={`/shop/address/update`} passHref>
            <button className="submit-button" aria-label="Update address">Update Address</button>
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