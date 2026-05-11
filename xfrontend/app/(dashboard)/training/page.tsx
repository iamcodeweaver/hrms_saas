"use client";
import { Box, Card, CardContent, Typography, Grid, Chip, LinearProgress } from "@mui/material";
import { School } from "@mui/icons-material";
import PageHeader from "@/components/common/PageHeader";

export default function TrainingPage() {
  return (
    <Box>
      <PageHeader title="Training & Development" subtitle="Programs, enrollments, and certifications" />
      <Grid container spacing={3}>
        {[1, 2, 3].map((i) => (
          <Grid size={{ xs: 12, md: 4 }} key={i}>
            <Card>
              <CardContent>
                <School color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h6" fontWeight={600}>Leadership Training</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Develop leadership skills for managers
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Chip size="small" label="Active" color="success" />
                  <Typography variant="caption">24 enrolled</Typography>
                </Box>
                <LinearProgress variant="determinate" value={65} sx={{ mt: 2 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
