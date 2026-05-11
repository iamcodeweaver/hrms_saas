"use client";
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText, Checkbox } from "@mui/material";
import PageHeader from "@/components/common/PageHeader";

export default function CompliancePage() {
  return (
    <Box>
      <PageHeader title="Compliance" subtitle="Policies and acknowledgements" />
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Company Policies</Typography>
          <List>
            {['Code of Conduct', 'Data Privacy Policy', 'Anti-Harassment Policy'].map((policy) => (
              <ListItem key={policy} secondaryAction={<Checkbox />}>
                <ListItemText primary={policy} secondary="Effective: Jan 1, 2026" />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}
