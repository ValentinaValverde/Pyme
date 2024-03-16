import React from 'react'
import { getStoreProducts } from '@/utils/actions/productActions'
import Image from 'next/image'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const ProductList = async ({ myStore }: any) => {
  const products = await getStoreProducts(myStore)

  if (products.length === 0) {
    return (
      <h2 className="mt-8 font-medium text-lg">
        Currently you do not have any active products
      </h2>
    )
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Details</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Price</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Inventory</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.productName}</TableCell>
              <TableCell>{product.productDetails}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.inInv}</TableCell>
              <TableCell>
                {product.productImage && (
                  <Image
                    loading="lazy"
                    src={product.productImage}
                    alt={product.productName}
                    className="max-w-xs max-h-24"
                    width={100}
                    height={100}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
/*
    <ul className="mt-8">
      {products.map((product) => (
        <li
          key={product.id}
          className="flex justify-between items-center px-6 py-4 mb-4 border border-base-300 rounded-lg shadow-lg"
        >
          <h3>Name: {product.productName}</h3>
          <h3>Details: {product.productDetails}</h3>
          <h3>Price: {product.price}</h3>
          <h3>Inventory: {product.inInv}</h3>
          {product.productImage && (
            <Image
              loading="lazy"
              src={product.productImage}
              alt={product.productName}
              className="max-w-xs max-h-24"
              width={100}
              height={100}
            />
          )}
        </li>
      ))}
    </ul>
  )
}
*/

export default ProductList
