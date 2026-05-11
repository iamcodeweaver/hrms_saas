"use client";
import { Box, Card, CardContent, Typography } from "@mui/material";
import PageHeader from "@/components/common/PageHeader";

export default function AssetsPage() {
  return (
    <Box>
      <PageHeader title="Asset Management" subtitle="Track company assets and assignments" />
      <Card><CardContent>Asset inventory and assignments...</CardContent></Card>
    </Box>
  );
}
