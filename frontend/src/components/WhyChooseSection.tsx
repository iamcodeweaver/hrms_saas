import { Box, Typography, Grid, Paper } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const reasons = [
  { icon: <ThumbUpIcon color="primary" />, title: 'Easy to Use', desc: 'Intuitive design with minimal learning curve.' },
  { icon: <SecurityIcon color="primary" />, title: 'Secure & Reliable', desc: 'Enterprise‑grade security and uptime guarantee.' },
  { icon: <SupportAgentIcon color="primary" />, title: '24/7 Support', desc: 'Dedicated support team always available.' },
];

export default function WhyChooseSection() {
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
        Why Choose Our HRMS?
      </Typography>
      <Grid
        container
        spacing={4}
        sx={{ justifyContent: 'center' }}
      >
        {reasons.map((r, i) => (
          <Grid
            size={{ xs: 12, sm: 4 }}
            key={i}
          >
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              {r.icon}
              <Typography variant="h6" sx={{ mt: 2 }}>
                {r.title}
              </Typography>
              <Typography color="text.secondary">{r.desc}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
