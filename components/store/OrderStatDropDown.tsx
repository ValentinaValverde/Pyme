'use client'
import React, { useState } from 'react';
import { Box, MenuItem, Select, FormControl } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { updateOrderStatus } from '@/utils/actions/orderActions';

const OrderStatDropDown = ({ item, status }: {item: any, status: any}) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: SelectChangeEvent) => {
    event.preventDefault();
    const newStatus = event.target.value;
    updateStatus(item, newStatus);
  };

  const updateStatus = async (item: any, newStatus: any) => {
    setLoading(true);
    try {
      await updateOrderStatus(item, newStatus);
      setCurrentStatus(newStatus); 
      setError(null);
    } catch (error) {
      console.error('Failed to update status', error);
      setError('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minWidth: 100, maxWidth: 150 }}>
      <FormControl fullWidth error={!!error}>
        <Select
          labelId="status-select-label"
          id="status-select"
          value={currentStatus}
          onChange={handleChange}
          disabled={isLoading}
        >
          <MenuItem value={'processing'}>Processing</MenuItem>
          <MenuItem value={'working'}>Working</MenuItem>
          <MenuItem value={'shipped'}>Shipped</MenuItem>
        </Select>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </FormControl>
    </Box>
  );
}

export default OrderStatDropDown;
