"use client";

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Chip,
  LinearProgress,
} from "@mui/material";
import {
  People,
  AccessTime,
  EventNote,
  Payments,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Warning,
  Schedule,
  Add,
  ArrowForward,
} from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { useCurrentCompanyId } from "@/stores/companyStore";
import { useAuthStore } from "@/stores/authStore";

const statCards = [
  {
    title: "Total Employees",
    icon: People,
    color: "#3b82f6",
    bgColor: "#eff6ff",
    key: "employees",
    trend: "+12%",
    trendUp: true,
  },
  {
    title: "Present Today",
    icon: AccessTime,
    color: "#10b981",
    bgColor: "#ecfdf5",
    key: "attendance",
    trend: "+5%",
    trendUp: true,
  },
  {
    title: "Pending Leaves",
    icon: EventNote,
    color: "#f59e0b",
    bgColor: "#fffbeb",
    key: "leaves",
    trend: "-2%",
    trendUp: false,
  },
  {
    title: "Payroll Runs",
    icon: Payments,
    color: "#8b5cf6",
    bgColor: "#f5f3ff",
    key: "payroll",
    trend: "+8%",
    trendUp: true,
  },
];

const recentActivity = [
  { action: "New employee onboarded", detail: "John Doe joined Engineering", time: "2 hours ago", type: "success" },
  { action: "Leave approved", detail: "Jane Smith - Annual Leave", time: "4 hours ago", type: "info" },
  { action: "Payroll processed", detail: "May 2026 payroll completed", time: "1 day ago", type: "success" },
  { action: "Attendance alert", detail: "3 employees late today", time: "1 day ago", type: "warning" },
  { action: "New job posted", detail: "Senior Developer position", time: "2 days ago", type: "info" },
];

const upcomingEvents = [
  { title: "Team Standup", date: "Today, 9:00 AM", type: "meeting" },
  { title: "Performance Reviews", date: "Tomorrow, 10:00 AM", type: "review" },
  { title: "Payroll Deadline", date: "May 15, 2026", type: "deadline" },
  { title: "Company Holiday", date: "May 29, 2026", type: "holiday" },
];

export default function HomePage() {
  const companyId = useCurrentCompanyId();
  const { user } = useAuthStore();

  const { data: employees } = useQuery({
    queryKey: ["employees", companyId],
    queryFn: async () => {
      if (!companyId) return [];
      const res = await apiClient.get(`/employees/company/${companyId}`);
      return res.data;
    },
    enabled: !!companyId,
  });

  const { data: attendanceLogs } = useQuery({
    queryKey: ["attendance-logs", companyId],
    queryFn: async () => {
      if (!companyId) return [];
      const res = await apiClient.get(`/attendance/logs/${companyId}`);
      return res.data;
    },
    enabled: !!companyId,
  });

  const { data: leaveRequests } = useQuery({
    queryKey: ["leave-requests", companyId],
    queryFn: async () => {
      if (!companyId) return [];
      const res = await apiClient.get(`/leave/requests/${companyId}`);
      return res.data;
    },
    enabled: !!companyId,
  });

  const { data: payrollRuns } = useQuery({
    queryKey: ["payroll-runs", companyId],
    queryFn: async () => {
      if (!companyId) return [];
      const res = await apiClient.get(`/payroll/runs/${companyId}`);
      return res.data;
    },
    enabled: !!companyId,
  });

  const stats = {
    employees: employees?.length || 0,
    attendance: attendanceLogs?.filter((a: any) => a.punchType === "IN").length || 0,
    leaves: leaveRequests?.filter((l: any) => l.status === "PENDING").length || 0,
    payroll: payrollRuns?.length || 0,
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "meeting": return <Schedule sx={{ color: "#3b82f6" }} />;
      case "review": return <People sx={{ color: "#8b5cf6" }} />;
      case "deadline": return <Warning sx={{ color: "#f59e0b" }} />;
      case "holiday": return <EventNote sx={{ color: "#10b981" }} />;
      default: return <Schedule sx={{ color: "#64748b" }} />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle sx={{ color: "#10b981" }} />;
      case "warning": return <Warning sx={{ color: "#f59e0b" }} />;
      default: return <Schedule sx={{ color: "#3b82f6" }} />;
    }
  };

  return (
    <Box>
      {/* Welcome Banner */}
      <Card sx={{ mb: 3, background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", color: "white" }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
                Welcome back, {user?.email?.split("@")[0] || "Admin"} 👋
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.8 }}>
                Here's what's happening at your company today.
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{
                bgcolor: "white",
                color: "#0f172a",
                "&:hover": { bgcolor: "#f1f5f9" },
                display: { xs: "none", sm: "flex" },
              }}
            >
              Quick Actions
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {statCards.map((card) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={card.key}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                  <Avatar sx={{ bgcolor: card.bgColor, color: card.color, width: 48, height: 48 }}>
                    <card.icon />
                  </Avatar>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {card.trendUp ? (
                      <TrendingUp sx={{ color: "#10b981", fontSize: 16 }} />
                    ) : (
                      <TrendingDown sx={{ color: "#f43f5e", fontSize: 16 }} />
                    )}
                    <Typography
                      variant="caption"
                      sx={{ color: card.trendUp ? "#10b981" : "#f43f5e", fontWeight: 600 }}
                    >
                      {card.trend}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {stats[card.key as keyof typeof stats]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.title}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={70}
                  sx={{
                    mt: 2,
                    height: 4,
                    borderRadius: 2,
                    bgcolor: card.bgColor,
                    "& .MuiLinearProgress-bar": { bgcolor: card.color },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Recent Activity */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, height: "100%" }}>
                  Recent Activity
                </Typography>
                <Button size="small" endIcon={<ArrowForward />}>
                  View All
                </Button>
              </Box>
              <List sx={{ p: 0 }}>
                {recentActivity.map((item, index) => (
                  <Box key={index}>
                    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: item.type === "warning" ? "#fffbeb" : "#eff6ff", color: item.type === "warning" ? "#f59e0b" : "#3b82f6" }}>
                          {getActivityIcon(item.type)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {item.action}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary" component="span">
                              {item.detail}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                              {item.time}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentActivity.length - 1 && <Divider component="li" />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Events & Quick Actions */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600}} gutterBottom>
                Upcoming Events
              </Typography>
              <List sx={{ p: 0 }}>
                {upcomingEvents.map((event, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 1 }}>
                    <ListItemAvatar sx={{ minWidth: 40 }}>
                      {getEventIcon(event.type)}
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body2" sx={{ fontWeight: 600 }} >
                          {event.title}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="caption" color="text.secondary">
                          {event.date}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Button variant="outlined" fullWidth startIcon={<Add />} sx={{ justifyContent: "flex-start" }}>
                  Add New Employee
                </Button>
                <Button variant="outlined" fullWidth startIcon={<EventNote />} sx={{ justifyContent: "flex-start" }}>
                  Process Leave Request
                </Button>
                <Button variant="outlined" fullWidth startIcon={<Payments />} sx={{ justifyContent: "flex-start" }}>
                  Run Payroll
                </Button>
                <Button variant="outlined" fullWidth startIcon={<People />} sx={{ justifyContent: "flex-start" }}>
                  Post Job Opening
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
