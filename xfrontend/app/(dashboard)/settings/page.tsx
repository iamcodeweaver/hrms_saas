"use client";

import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Grid,
} from "@mui/material";
import {
  Business,
  Palette,
  Notifications,
  Security,
} from "@mui/icons-material";
import PageHeader from "@/components/common/PageHeader";

export default function SettingsPage() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <PageHeader title="Settings" subtitle="Configure your HRMS" />

      <Card>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label="Company" icon={<Business />} iconPosition="start" />
          <Tab label="Appearance" icon={<Palette />} iconPosition="start" />
          <Tab
            label="Notifications"
            icon={<Notifications />}
            iconPosition="start"
          />
          <Tab label="Security" icon={<Security />} iconPosition="start" />
        </Tabs>

        <CardContent>
          {tab === 0 && (
            <Box sx={{ maxWidth: 600 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Company Information
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Company Name"
                    fullWidth
                    defaultValue="Demo Company"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Slug"
                    fullWidth
                    defaultValue="demo-company"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Timezone"
                    fullWidth
                    defaultValue="Africa/Lagos"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField label="Currency" fullWidth defaultValue="NGN" />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField label="Locale" fullWidth defaultValue="en" />
                </Grid>
              </Grid>
              <Box sx={{ mt: 3 }}>
                <Button variant="contained">Save Changes</Button>
              </Box>
            </Box>
          )}

          {tab === 1 && (
            <Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Appearance
              </Typography>
              <FormControlLabel control={<Switch />} label="Dark Mode" />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Compact Mode"
              />
            </Box>
          )}

          {tab === 2 && (
            <Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Notification Preferences
              </Typography>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Email Notifications"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Push Notifications"
              />
              <FormControlLabel
                control={<Switch />}
                label="SMS Notifications"
              />
            </Box>
          )}

          {tab === 3 && (
            <Box sx={{ maxWidth: 600 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Security Settings
              </Typography>
              <TextField
                label="Current Password"
                type="password"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="New Password"
                type="password"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button variant="contained">Update Password</Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
