import { Box, Typography, Button } from '@mui/material';

export default function HeroSection() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 8,
        px: 4,
        bgcolor: 'background.default',
        flexWrap: { xs: 'wrap', md: 'nowrap' },
        gap: 4,
      }}
    >
      {/* Left content */}
      <Box sx={{ maxWidth: { xs: '100%', md: '50%' } }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: 'primary.main',
          }}
        >
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
          <Button variant="contained" color="primary" sx={{ mr: 2 }}>
            Get Started
          </Button>

          <Button variant="outlined" color="secondary" href="/demo">
            Watch Demo
          </Button>
        </Box>
      </Box>

      {/* Right image */}
      <Box
        component="img"
        src="/assets/hero.png"
        alt="HRMS hero preview"
        sx={{
          width: { xs: '100%', md: '40%' },
          maxHeight: 420,
          objectFit: 'contain',
          borderRadius: 2,
          boxShadow: 3,
        }}
      />
    </Box>
  );
}