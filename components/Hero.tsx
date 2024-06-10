import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Hero() {
  return (
    <>
      <Box 
        display="flex" 
        justifyContent="center"
        alignItems="center" 
        width="100%" 
        height="40vh" 
        bgcolor="#E3B7DA" 
        borderRadius="0" 
        padding="20px"
        aria-labelledby="hero-heading"
      >
        <Box marginRight="80px">
          <Image src="/images/image_with_transparent_background.png" alt="Shopping bags illustration" width={150} height={150} objectFit="contain" aria-describedby="Shopping bags illustration" />
        </Box>
        <Box>
          <Typography id="hero-intro" variant="body1" color="#2C3E50" marginTop="50px" marginBottom="10px">welcome to</Typography>
          <Typography id="hero-heading" variant="h1" color="#2C3E50" marginBottom="10px">Pyme</Typography>
          <Typography id="hero-description" variant="body1" color="#2C3E50">the marketplace for small businesses.</Typography>
        </Box>
      </Box>
    </>
  );
}

