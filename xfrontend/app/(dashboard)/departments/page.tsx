"use client";
import { Box, Card, CardContent } from "@mui/material";
import PageHeader from "@/components/common/PageHeader";

export default function DepartmentsPage() {
  return (
    <Box>
      <PageHeader title="Departments" subtitle="Manage departments" />
      <Card><CardContent>Departments list...</CardContent></Card>
    </Box>
  );
}
