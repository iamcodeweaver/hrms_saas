import { Box, Typography, Grid, Paper } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PaymentIcon from '@mui/icons-material/Payment';
import SchoolIcon from '@mui/icons-material/School';
import GavelIcon from '@mui/icons-material/Gavel';

const features = [
  { icon: <PeopleIcon color="primary" />, title: 'Employee Management', desc: 'Manage employee profiles.' },
  { icon: <PaymentIcon color="primary" />, title: 'Payroll Processing', desc: 'Automate salary and deductions.' },
  { icon: <SchoolIcon color="primary" />, title: 'Training & Development', desc: 'Track programs and certifications.' },
  { icon: <GavelIcon color="primary" />, title: 'Compliance Tracking', desc: 'Monitor policies and audits.' },
];

export default function FeaturesSection() {
  return (
    <Box sx={{ py: 8, px: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        Key Features for Your HR Needs
      </Typography>
      <Grid
        container
        spacing={4}
        sx={{ justifyContent: 'center' }}
      >
        {features.map((f, i) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 3 }}
            key={i}
          >
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              {f.icon}
              <Typography variant="h6" sx={{ mt: 2 }}>
                {f.title}
              </Typography>
              <Typography color="text.secondary">{f.desc}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
