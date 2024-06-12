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
      <NavBar />
      <div>{children}</div>
      <Footer />
    </>
  );
}
