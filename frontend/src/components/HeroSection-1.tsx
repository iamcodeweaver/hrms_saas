import { Box, Typography, Button, Grid } from '@mui/material';

export default function HeroSection() {
  return (
    <Box sx={{ py: 8, px: 4, bgcolor: 'background.paper' }}>
      <Grid
        container
        spacing={4}
        sx={{ alignItems: 'center' }}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            Streamline Your HR Management
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', mb: 3 }}
          >
            All-in-One Solution for Payroll, Attendance,
            Recruitment & Compliance.
          </Typography>

          <Box>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mr: 2 }}
            >
              Get Started
            </Button>

            <Button
              variant="outlined"
              color="primary"
              href="/demo"
            >
              Watch Demo
            </Button>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <img
            src="/assets/dashboard-preview.png"
            alt="Dashboard preview"
            style={{
              width: '100%',
              borderRadius: 8,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}