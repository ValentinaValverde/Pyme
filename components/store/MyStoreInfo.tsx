import React from 'react';
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

const MyStoreInfo = ({ myStore }: any) => {
  const { storename, owner, ein, streetAddress, city, state, zipcode, slug } =
    myStore;
  return (
    <TableContainer component={Box}>
      <Typography variant="h3">MyStoreInfo</Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Store name:</TableCell>
            <TableCell>{storename}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Owner:</TableCell>
            <TableCell>{owner}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>EIN:</TableCell>
            <TableCell>{ein}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Address:</TableCell>
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
      <Link href={`/mystore/${slug}/address`}>
        <button className="unfilled_button">Edit Address</button>
      </Link>
    </TableContainer>
  );
};

export default MyStoreInfo;
