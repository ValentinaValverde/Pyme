import React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const QtyDropDown = ({
  slug,
  quantity,
  editQuantity,
}: {
  slug: string;
  quantity: any;
  editQuantity: Function;
}) => {
  const handleChange = async (event: SelectChangeEvent) => {
    event.preventDefault();
    let newQuantity = Number(event.target.value);

    await editQuantity(slug, newQuantity);
  };
  quantity.toString();
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          labelId="product-quantity-label"
          id="product-quantity"
          defaultValue={quantity}
          onChange={handleChange}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default QtyDropDown;
