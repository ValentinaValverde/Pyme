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
      >
        <Box marginRight="80px">
          <Image src="/images/image_with_transparent_background.png" alt="Shopping bags illustration" width={150} height={150} objectFit="contain" />
        </Box>
        <Box>
          <Typography variant="body1" color="#2C3E50" marginTop="50px" marginBottom="10px">welcome to</Typography>
          <Typography variant="h1" color="#2C3E50" marginBottom="10px">Pyme</Typography>
          <Typography variant="body1" color="#2C3E50">the marketplace for small businesses.</Typography>
        </Box>
      </Box>
    </>
  );
}

