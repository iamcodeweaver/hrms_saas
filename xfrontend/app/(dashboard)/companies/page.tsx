"use client";
import { Box, Card, CardContent } from "@mui/material";
import PageHeader from "@/components/common/PageHeader";

export default function CompaniesPage() {
  return (
    <Box>
      <PageHeader title="Companies" subtitle="Manage organizations" />
      <Card><CardContent>Companies list...</CardContent></Card>
    </Box>
  );
}
