import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ py: 4, textAlign: 'center', backgroundColor: '#1976d2', color: 'white' }}>
      <Typography variant="body2">
        © {new Date().getFullYear()} HRMS Platform — All Rights Reserved
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Link href="#" color="inherit" sx={{ mx: 1 }}>About</Link>
        <Link href="#" color="inherit" sx={{ mx: 1 }}>Pricing</Link>
        <Link href="#" color="inherit" sx={{ mx: 1 }}>Privacy Policy</Link>
      </Box>
    </Box>
  );
}
