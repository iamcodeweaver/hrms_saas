import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    q: 'How secure is the platform?',
    a: 'We use industry-standard encryption and secure authentication.',
  },
  {
    q: 'Can I access the HRMS on mobile devices?',
    a: 'Yes, it’s fully responsive and mobile-friendly.',
  },
  {
    q: 'Is there a free trial available?',
    a: 'Yes, you can request a demo or trial account.',
  },
  {
    q: 'How do I get support?',
    a: 'Our support team is available 24/7 via email and chat.',
  },
];

export default function FAQSection() {
  return (
    <Box sx={{ py: 8, px: 4 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Left Image */}
        <Box
          component="img"
          src="/assets/faq.png" // replace with your image path
          alt="FAQ Illustration"
          sx={{
            width: { xs: '100%', md: '40%' },
            maxWidth: 450,
            borderRadius: 3,
            objectFit: 'cover',
          }}
        />

        {/* FAQ Content */}
        <Box sx={{ flex: 1, width: '100%' }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              mb: 3,
            }}
          >
            Frequently Asked Questions
          </Typography>

          {faqs.map((f, i) => (
            <Accordion key={i}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{f.q}</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography color="text.secondary">{f.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Box>
  );
}