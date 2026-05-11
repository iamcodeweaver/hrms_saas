"use client";

import { useParams } from "next/navigation";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Avatar,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { Employee } from "@/types/dto";
import { useState } from "react";

function TabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
  return value === index ? <Box sx={{ py: 3 }}>{children}</Box> : null;
}

export default function EmployeeDetailPage() {
  const { id } = useParams();
  const [tab, setTab] = useState(0);

  const { data: employee } = useQuery({
    queryKey: ["employee", id],
    queryFn: async () => {
      const response = await apiClient.get(`/employees/${id}`);
      return response.data as Employee;
    },
    enabled: !!id,
  });

  if (!employee) return null;

  return (
    <Box>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
            <Avatar src={employee.photoUrl || undefined} sx={{ width: 100, height: 100, fontSize: "2.5rem" }}>
              {employee.firstName[0]}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" fontWeight={700}>
                {employee.firstName} {employee.middleName} {employee.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {employee.position?.title} • {employee.department?.name}
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Chip size="small" label={employee.employeeNo} color="primary" variant="outlined" />
                <Chip size="small" label={employee.employmentStatus || "Unknown"} color={employee.employmentStatus === "ACTIVE" ? "success" : "default"} />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ px: 2, pt: 2 }}>
          <Tab label="Overview" />
          <Tab label="Employment" />
          <Tab label="Attendance" />
          <Tab label="Leaves" />
          <Tab label="Payroll" />
          <Tab label="Wallet" />
          <Tab label="Documents" />
        </Tabs>
        <Divider />
        <CardContent>
          <TabPanel value={tab} index={0}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>Personal Information</Typography>
                <InfoTable rows={[
                  { label: "Email", value: employee.email },
                  { label: "Phone", value: employee.phone },
                  { label: "Date of Birth", value: employee.dateOfBirth ? new Date(employee.dateOfBirth).toLocaleDateString() : "-" },
                  { label: "Gender", value: employee.gender },
                  { label: "Marital Status", value: employee.maritalStatus },
                  { label: "Address", value: [employee.address, employee.city, employee.state, employee.country].filter(Boolean).join(", ") || "-" },
                ]} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>Emergency Contact</Typography>
                <InfoTable rows={[
                  { label: "Name", value: "—" },
                  { label: "Phone", value: "—" },
                ]} />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <InfoTable rows={[
              { label: "Hire Date", value: employee.hireDate ? new Date(employee.hireDate).toLocaleDateString() : "-" },
              { label: "Employment Type", value: employee.employmentType || "-" },
              { label: "Branch", value: employee.branch?.name || "-" },
              { label: "Department", value: employee.department?.name || "-" },
              { label: "Position", value: employee.position?.title || "-" },
              { label: "Salary", value: employee.salary ? `${employee.currency} ${employee.salary.toLocaleString()}` : "-" },
            ]} />
          </TabPanel>
          <TabPanel value={tab} index={2}><Typography color="text.secondary">Attendance calendar and logs will appear here...</Typography></TabPanel>
          <TabPanel value={tab} index={3}><Typography color="text.secondary">Leave history will appear here...</Typography></TabPanel>
          <TabPanel value={tab} index={4}><Typography color="text.secondary">Payroll history will appear here...</Typography></TabPanel>
          <TabPanel value={tab} index={5}><Typography color="text.secondary">Wallet and transactions will appear here...</Typography></TabPanel>
          <TabPanel value={tab} index={6}><Typography color="text.secondary">Documents will appear here...</Typography></TabPanel>
        </CardContent>
      </Card>
    </Box>
  );
}

function InfoTable({ rows }: { rows: { label: string; value: React.ReactNode }[] }) {
  return (
    <Table size="small">
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.label}>
            <TableCell component="th" scope="row" sx={{ width: 140, color: "text.secondary", border: "none", py: 1 }}>
              {row.label}
            </TableCell>
            <TableCell sx={{ border: "none", py: 1, fontWeight: 500 }}>{row.value || "-"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
