import '../styling/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from '@/components/shop/NavBar';
import { Box } from '@mui/material';

const inter = Inter({ subsets: ['latin'] });

export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <NavBar />
        <Box component={'main'} sx={{ flexGrow: 1, p: 3, mt: 7 }}>
          {children}
        </Box>
      </Box>
    </>
  );
}
