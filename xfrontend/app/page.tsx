"use client";

import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AppBar,
  Toolbar,
  Link,
} from "@mui/material";
import {
  ExpandMore,
  People,
  Payments,
  School,
  Gavel,
  CheckCircle,
  Security,
  SupportAgent,
  ArrowForward,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Slider from "react-slick";

const faqImages = [
  "/assets/dashboard1.png",
  "/assets/dashboard2.png",
  "/assets/hero.png",
  "/assets/mobile-view.png",
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 10000,
  arrows: false,
};

const features = [
  {
    title: "Employee Management",
    description: "Manage employee profiles, documents, and lifecycle from hire to retire.",
    icon: People,
    color: "#3b82f6",
    bgColor: "#eff6ff",
  },
  {
    title: "Payroll Processing",
    description: "Automate salary calculations, deductions, and payslip generation.",
    icon: Payments,
    color: "#10b981",
    bgColor: "#ecfdf5",
  },
  {
    title: "Training & Development",
    description: "Track programs, enrollments, and certifications across your workforce.",
    icon: School,
    color: "#f59e0b",
    bgColor: "#fffbeb",
  },
  {
    title: "Compliance Tracking",
    description: "Monitor policies, acknowledgements, and audit trails effortlessly.",
    icon: Gavel,
    color: "#8b5cf6",
    bgColor: "#f5f3ff",
  },
];

const whyUs = [
  {
    title: "Easy to Use",
    description: "Intuitive design with minimal learning curve. Your team is productive from day one.",
    icon: CheckCircle,
    color: "#10b981",
  },
  {
    title: "Secure & Reliable",
    description: "Enterprise-grade security and uptime guarantee. Your data is always protected.",
    icon: Security,
    color: "#3b82f6",
  },
  {
    title: "24/7 Support",
    description: "Dedicated support team always available. We're here whenever you need us.",
    icon: SupportAgent,
    color: "#f59e0b",
  },
];

const faqs = [
  {
    question: "How does the employee onboarding process work?",
    answer: "Our platform streamlines onboarding with digital document collection, automated welcome workflows, and role-based access provisioning.",
  },
  {
    question: "Can I process payroll for multiple currencies?",
    answer: "Yes. The system supports multi-currency payroll with automatic tax calculations and compliance reporting for each region.",
  },
  {
    question: "Is there a mobile app for attendance tracking?",
    answer: "Employees can clock in/out via web or mobile-responsive interface. Biometric device integration is also supported.",
  },
  {
    question: "How secure is my company data?",
    answer: "We use AES-256 encryption, role-based access control, and regular automated backups. All data is stored in SOC 2 compliant facilities.",
  },
  {
    question: "Can I integrate with existing accounting software?",
    answer: "Yes. We offer REST APIs and pre-built integrations with popular accounting, ERP, and biometric systems.",
  },
];

export default function LandingPage() {
  const router = useRouter();
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  return (
    <Box>
      {/* Navigation */}
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: "rgba(15, 23, 42, 0.95)", backdropFilter: "blur(10px)" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 36, height: 36, borderRadius: 1.5, bgcolor: "white", display: "flex", alignItems: "center", justifyContent: "center", color: "#0f172a", fontWeight: 700 }}>
              H
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "white" }}>
              HRMS
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Link href="#features" underline="none" sx={{ color: "rgba(255,255,255,0.8)", "&:hover": { color: "white" } }}>
              Features
            </Link>
            <Link href="#faq" underline="none" sx={{ color: "rgba(255,255,255,0.8)", "&:hover": { color: "white" }, display: { xs: "none", sm: "block" } }}>
              FAQ
            </Link>
            <Link href="#contact" underline="none" sx={{ color: "rgba(255,255,255,0.8)", "&:hover": { color: "white" }, display: { xs: "none", sm: "block" } }}>
              Contact
            </Link>
            <Button
              variant="contained"
              size="small"
              onClick={() => router.push("/login")}
              sx={{ bgcolor: "white", color: "#0f172a", "&:hover": { bgcolor: "#f1f5f9" } }}
            >
              Sign In
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          pt: 8,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{alignItems: "center"}}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: "white",
                  mb: 2,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  lineHeight: 1.2,
                }}
              >
                Streamline Your HR Management
              </Typography>
              <Typography variant="h5" sx={{ color: "rgba(255,255,255,0.7)", mb: 4, fontWeight: 400 }}>
                All-in-One Solution for Payroll, Attendance, Recruitment & Compliance.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => router.push("/login")}
                  sx={{ px: 4, py: 1.5, bgcolor: "#3b82f6", "&:hover": { bgcolor: "#2563eb" } }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ px: 4, py: 1.5, borderColor: "rgba(255,255,255,0.3)", color: "white", "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.05)" } }}
                  onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  bgcolor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 4,
                  p: 4,
                  backdropFilter: "blur(10px)",
                }}
              >
                <Typography variant="h6" sx={{ color: "white", mb: 2, fontWeight: 600 }}>
                  HRMS Preview
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {[
                    { label: "Employees", value: "1,247", color: "#3b82f6" },
                    { label: "On Leave", value: "23", color: "#f59e0b" },
                    { label: "Payroll", value: "₦45M", color: "#10b981" },
                  ].map((stat) => (
                    <Box key={stat.label} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, bgcolor: "rgba(255,255,255,0.05)", borderRadius: 2 }}>
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>{stat.label}</Typography>
                      <Typography variant="h6" sx={{ color: stat.color, fontWeight: 700 }}>{stat.value}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features */}
      <Box id="features" sx={{ py: 10, bgcolor: "#f8fafc" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="overline" sx={{ color: "#3b82f6", fontWeight: 600, letterSpacing: 2 }}>
              FEATURES
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mt: 1, color: "#0f172a" }}>
              Key Features for Your HR Needs
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {features.map((feature) => (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={feature.title}>
                <Card sx={{ height: "100%", borderRadius: 3, border: "1px solid #e2e8f0", boxShadow: "none", "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.08)", transform: "translateY(-4px)", transition: "all 0.3s" } }}>
                  <CardContent sx={{ p: 3 }}>
                    <Avatar sx={{ bgcolor: feature.bgColor, color: feature.color, width: 56, height: 56, mb: 2 }}>
                      <feature.icon />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#0f172a" }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Why Choose Us */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} sx={{ alignItems: "center"}}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography variant="overline" sx={{ color: "#3b82f6", fontWeight: 600, letterSpacing: 2 }}>
                WHY CHOOSE US
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, mt: 1, mb: 3, color: "#0f172a" }}>
                Why Choose Our HRMS?
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Built for African businesses with local compliance, multi-currency payroll, and intuitive design.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Grid container spacing={3}>
                {whyUs.map((item) => (
                  <Grid size={{ xs: 12, sm: 4 }} key={item.title}>
                    <Card sx={{ height: "100%", textAlign: "center", p: 2, borderRadius: 3, border: "1px solid #e2e8f0", boxShadow: "none" }}>
                      <CardContent>
                        <Avatar sx={{ bgcolor: item.color + "15", color: item.color, width: 64, height: 64, mx: "auto", mb: 2 }}>
                          <item.icon sx={{ fontSize: 32 }} />
                        </Avatar>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FAQ */}
      <Box id="faq" sx={{ py: 10, bgcolor: "#f8fafc" }}>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={6}
            sx={{
              alignItems: "center",
            }}
          >
            {/* Left Side - Carousel */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  // borderRadius: 4,
                  overflow: "hidden",
                  // boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                }}
              >
                <Slider {...sliderSettings}>
                  {faqImages.map((img, index) => (
                    <Box
                      key={index}
                      component="img"
                      src={img}
                      alt={`FAQ ${index + 1}`}
                      sx={{
                        width: "100%",
                        height: { xs: 300, md: 500 },
                        objectFit: "contain",
                      }}
                    />
                  ))}
                </Slider>
              </Box>
            </Grid>

            {/* Right Side - FAQ */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: "#3b82f6",
                    fontWeight: 600,
                    letterSpacing: 2,
                  }}
                >
                  FAQ
                </Typography>

                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    mt: 1,
                    color: "#0f172a",
                  }}
                >
                  Frequently Asked Questions
                </Typography>
              </Box>

              {faqs.map((faq, index) => (
                <Accordion
                  key={index}
                  sx={{
                    mb: 1,
                    borderRadius: 2,
                    boxShadow: "none",
                    border: "1px solid #e2e8f0",
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                  >
                    <Typography sx={{ fontWeight: 600 }}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Typography color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact */}
      <Box id="contact" sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={6}
            sx={{
              alignItems: "center",
            }}
          >
            {/* Left Side */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    color: "#0f172a",
                    mb: 2,
                  }}
                >
                  Get in Touch with Us
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                >
                  We'd love to hear from you. Send us a message and
                  our team will get back to you shortly.
                </Typography>
              </Box>

              <Card
                sx={{
                  borderRadius: 3,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2.5,
                    }}
                  >
                    <TextField
                      label="Your Name"
                      fullWidth
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          name: e.target.value,
                        })
                      }
                    />

                    <TextField
                      label="Your Email"
                      type="email"
                      fullWidth
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          email: e.target.value,
                        })
                      }
                    />

                    <TextField
                      label="Your Message"
                      multiline
                      rows={4}
                      fullWidth
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          message: e.target.value,
                        })
                      }
                    />

                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{ py: 1.5, mt: 1 }}
                      onClick={() =>
                        alert(
                          "Message sent! We'll get back to you shortly."
                        )
                      }
                    >
                      Send Message
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Right Side Image */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                component="img"
                src="/assets/contact.png"
                alt="Contact Us"
                sx={{
                  width: "100%",
                  borderRadius: 4,
                  objectFit: "cover",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 4, bgcolor: "#0f172a", color: "white", textAlign: "center" }}>
        <Container maxWidth="lg">
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            © 2026 HRMS. All rights reserved. Built for modern African businesses.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
