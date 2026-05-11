"use client";
import { Box, Card, CardContent, Tabs, Tab, Typography } from "@mui/material";
import { useState } from "react";
import PageHeader from "@/components/common/PageHeader";

export default function PerformancePage() {
  const [tab, setTab] = useState(0);
  return (
    <Box>
      <PageHeader title="Performance Management" subtitle="Reviews, goals, and feedback" />
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Reviews" />
        <Tab label="Goals" />
        <Tab label="Feedback" />
      </Tabs>
      <Card><CardContent>Performance content...</CardContent></Card>
    </Box>
  );
}
