import '../styling/globals.css';
import { Inter } from 'next/font/google';
import NavBar from '@/components/shop/NavBar';
import Footer from '@/components/shop/Footer';
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
        {/* took this out: sx={{ flexGrow: 1, p: 3, mt: 7 }} */}
        <Box component={'main'} sx={{ marginTop: '75px', padding: '10px' }}>
          {children}
        </Box>
      </Box>
      <Footer />
    </>
  );
}
