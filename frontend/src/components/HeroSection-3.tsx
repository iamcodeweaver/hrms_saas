import { Box, Typography, Button, Grid } from '@mui/material';

export default function HeroSection() {
  return (
    <Box sx={{ py: 8, px: 4, bgcolor: 'background.default' }}>
      <Grid container spacing={4} sx={{ alignItems: 'center' }}>
        
        {/* Left side: headline + buttons */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography 
            variant="h4" // reduced size for one-line fit
            sx={{ fontWeight: 700, mb: 2, color: 'primary.main', whiteSpace: 'nowrap' }}
          >
            Streamline Your HR Management
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', mb: 3 }}
          >
            All‑in‑One Solution for Payroll, Attendance,
            Recruitment & Compliance.
          </Typography>

          <Box>
            <Button
              variant="contained"
              color="primary"
              sx={{
                mr: 2,
                px: 3,
                py: 1,
                borderRadius: 2, // rounded corners
                fontWeight: 600,
              }}
            >
              Get Started
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              href="/demo"
              sx={{
                px: 3,
                py: 1,
                borderRadius: 2,
                fontWeight: 600,
                borderWidth: 2, // thicker outline
              }}
            >
              Watch Demo
            </Button>
          </Box>
        </Grid>

        {/* Right side: hero image */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            component="img"
            src="/assets/hero.png"
            alt="HRMS hero preview"
            sx={{
              width: '70%', // scaled down
              borderRadius: 2,
              boxShadow: 3,
              display: 'block',
              mx: 'auto',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
