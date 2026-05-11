import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';

export default function ContactSection() {
  return (
    <Box sx={{ py: 8, px: 4 }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          fontWeight: 700,
          mb: 6,
        }}
      >
        Get in Touch with Us
      </Typography>

      <Grid
        container
        spacing={4}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Left Side */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Your Name"
            margin="normal"
          />

          <TextField
            fullWidth
            label="Your Email"
            margin="normal"
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Your Message"
            margin="normal"
          />

          <Button
            variant="contained"
            sx={{ mt: 2 }}
          >
            Send Message
          </Button>
        </Grid>

        {/* Right Side */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            component="img"
            src="/assets/contact.png"
            alt="Contact"
            sx={{
              width: '100%',
              borderRadius: 2,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}