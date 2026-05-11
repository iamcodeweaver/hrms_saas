"use client";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import PageHeader from "@/components/common/PageHeader";

const attendanceData = [
  { name: "Mon", present: 45, absent: 5 },
  { name: "Tue", present: 48, absent: 2 },
  { name: "Wed", present: 47, absent: 3 },
  { name: "Thu", present: 46, absent: 4 },
  { name: "Fri", present: 44, absent: 6 },
];

const departmentData = [
  { name: "Engineering", value: 25, color: "#3b82f6" },
  { name: "HR", value: 10, color: "#10b981" },
  { name: "Sales", value: 15, color: "#f59e0b" },
  { name: "Marketing", value: 12, color: "#8b5cf6" },
];

export default function AnalyticsPage() {
  return (
    <Box>
      <PageHeader title="Analytics" subtitle="Reports and KPIs" />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Weekly Attendance</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="present" fill="#10b981" />
                  <Bar dataKey="absent" fill="#f43f5e" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Department Distribution</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={departmentData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
