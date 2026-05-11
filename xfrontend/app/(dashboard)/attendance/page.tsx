"use client";

import { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  Chip,
} from "@mui/material";
import { Login, Logout, AccessTime } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import PageHeader from "@/components/common/PageHeader";
import { AttendanceLog } from "@/types/dto";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useCurrentCompanyId } from "@/stores/companyStore";

export default function AttendancePage() {
  const queryClient = useQueryClient();
  const companyId = useCurrentCompanyId();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const { data: logs } = useQuery({
    queryKey: ["attendance-logs", companyId],
    queryFn: async () => {
      const res = await apiClient.get(`/attendance/logs/${companyId}`);
      return res.data as AttendanceLog[];
    },
    enabled: !!companyId,
  });

  const clockInMutation = useMutation({
    mutationFn: (data: any) => apiClient.post("/attendance/clock-in", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["attendance-logs", companyId] }),
  });

  const clockOutMutation = useMutation({
    mutationFn: (data: any) => apiClient.post("/attendance/clock-out", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["attendance-logs", companyId] }),
  });

  const isClockedIn = logs?.some(
    (l) =>
      l.punchType === "IN" &&
      !logs.some((o) => o.punchType === "OUT" && new Date(o.timestamp) > new Date(l.timestamp))
  );

  const columns: GridColDef<AttendanceLog>[] = [
    {
      field: "timestamp",
      headerName: "Time",
      width: 180,
      valueGetter: (v) => new Date(v).toLocaleString(),
    },
    {
      field: "punchType",
      headerName: "Type",
      width: 100,
      renderCell: (p) => (
        <Chip
          size="small"
          color={p.value === "IN" ? "success" : "error"}
          label={p.value}
        />
      ),
    },
    { field: "employeeId", headerName: "Employee ID", width: 150 },
  ];

  if (!companyId) {
    return (
      <Box>
        <PageHeader title="Attendance" subtitle="Track employee attendance" />
        <Card>
          <CardContent>
            <Typography>Please log in to view attendance</Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader title="Attendance" subtitle="Track employee attendance and sessions" />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ textAlign: "center", py: 4 }}>
              <AccessTime color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h3" fontWeight={700}>
                {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </Typography>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  color="success"
                  startIcon={<Login />}
                  onClick={() =>
                    clockInMutation.mutate({
                      employeeId: "emp-123",
                      companyId,
                      punchType: "IN",
                    })
                  }
                  disabled={isClockedIn || clockInMutation.isPending}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Clock In
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  color="error"
                  startIcon={<Logout />}
                  onClick={() =>
                    clockOutMutation.mutate({
                      employeeId: "emp-123",
                      companyId,
                      punchType: "OUT",
                      sessionId: "sess-123",
                    })
                  }
                  disabled={!isClockedIn || clockOutMutation.isPending}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Clock Out
                </Button>
              </Box>
              {isClockedIn && (
                <Chip label="Currently Clocked In" color="success" sx={{ mt: 2 }} />
              )}
            </CardContent>
          </Card>
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar value={selectedDate} onChange={setSelectedDate} />
              </LocalizationProvider>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Today&apos;s Attendance Logs
              </Typography>
              <DataGrid
                rows={logs || []}
                columns={columns}
                pageSizeOptions={[10]}
                initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                disableRowSelectionOnClick
                sx={{ border: "none", height: 400 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
