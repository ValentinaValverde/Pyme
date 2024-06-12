import React from 'react';
import { getStoreProducts } from '@/utils/actions/productActions';
import EditProductInvForm from './edit-forms/EditProductInvForm';
//import Image from "next/image";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';

const ProductList = async ({ myStore }: any) => {
  const products = await getStoreProducts(myStore);

  if (products.length === 0) {
    return (
      <h2 className="mt-8 font-medium text-lg">
        Currently you do not have any active products
      </h2>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Product list table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Details</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Price</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Inventory</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Image</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.productName}</TableCell>
              <TableCell>{product.productDetails}</TableCell>
              <TableCell>${product.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
              <TableCell>{product.inInv}</TableCell>
              <TableCell>
                {product.productImage && (
                  <img
                    loading="lazy"
                    src={product.productImage}
                    alt={product.productName}
                    className="max-w-xs max-h-24"
                    width={100}
                    height={100}
                    aria-describedby={`product-image-${product.id}`}
                  />
                )}
              </TableCell>
              <TableCell>
                <Link
                  href={`/mystore/${myStore}/products/${product.productSlug}`}
                  passHref
                >
                  <Tooltip title="Edit Product">
                    {/* <Button variant="contained"> */}
                    <EditIcon color="action"></EditIcon>
                    {/* </Button> */}
                  </Tooltip>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ProductList;
