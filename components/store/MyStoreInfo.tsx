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
    <>
      {/* <TableContainer component={Box}> */}
      {/* <Table>
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
      </Table> */}
      {/* <Box mt={2} /> */}
      {/* </TableContainer> */}

      <p style={{ fontSize: 20, textAlign: 'center', width: 500 }}>
        Store Info
      </p>
      <div className="storeinfo_container">
        <div className="row">
          <p>Store Name: </p>
          <p>{storename}</p>
        </div>
        <div className="row">
          <p>Owner Name: </p>
          <p>{owner}</p>
        </div>
        <div className="row">
          <p>EIN: </p>
          <p>{ein}</p>
        </div>
        <div>
          ----------------------------------------------------------------------
        </div>
        <div className="row">
          <p>Address: </p>
          <p>{streetAddress}</p>
        </div>
        <div className="row">
          <p>City: </p>
          <p>{city}</p>
        </div>
        <div className="row">
          <p>State: </p>
          <p>{state}</p>
        </div>
        <div className="row">
          <p>Zipcode: </p>
          <p>{zipcode}</p>
        </div>
      </div>

      <Link href={`/mystore/${slug}/address`}>
        <button className="unfilled_button" style={{ marginTop: 20 }}>
          Edit Address
        </button>
      </Link>
    </>
  );
};

export default MyStoreInfo;
