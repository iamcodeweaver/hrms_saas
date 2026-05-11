"use client";

import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import PageHeader from "@/components/common/PageHeader";
import StatusChip from "@/components/common/StatusChip";
import { LeaveRequest, LeaveType } from "@/types/dto";
import { useCurrentCompanyId } from "@/stores/companyStore";

export default function LeavePage() {
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();
  const companyId = useCurrentCompanyId();

  const { data: leaveRequests } = useQuery({
    queryKey: ["leave-requests", companyId],
    queryFn: async () => {
      const res = await apiClient.get(`/leave/requests/${companyId}`);
      return res.data as LeaveRequest[];
    },
    enabled: !!companyId,
  });

  const { data: leaveTypes } = useQuery({
    queryKey: ["leave-types", companyId],
    queryFn: async () => {
      const res = await apiClient.get(`/leave/types/${companyId}`);
      return res.data as LeaveType[];
    },
    enabled: !!companyId,
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => apiClient.post("/leave/requests", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave-requests", companyId] });
      setOpenDialog(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiClient.patch(`/leave/requests/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["leave-requests", companyId] }),
  });

  const columns: GridColDef<LeaveRequest>[] = [
    {
      field: "employee",
      headerName: "Employee",
      width: 200,
      valueGetter: (_, row) =>
        row.employee ? `${row.employee.firstName} ${row.employee.lastName}` : "-",
    },
    {
      field: "leaveType",
      headerName: "Type",
      width: 150,
      valueGetter: (_, row) => row.leaveType?.name || "-",
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (p) => <StatusChip status={p.value as string} />,
    },
    {
      field: "approvedBy",
      headerName: "Approved By",
      width: 150,
      valueGetter: (_, row) => row.approvedBy?.email || "-",
    },
    {
      field: "createdAt",
      headerName: "Requested",
      width: 180,
      valueGetter: (v) => new Date(v).toLocaleDateString(),
    },
    {
      field: "actions",
      type: "actions",
      width: 200,
      getActions: (params) => [
        <Button
          key="approve"
          size="small"
          color="success"
          onClick={() =>
            updateMutation.mutate({ id: params.id as string, data: { status: "APPROVED" } })
          }
          disabled={params.row.status !== "PENDING"}
        >
          Approve
        </Button>,
        <Button
          key="reject"
          size="small"
          color="error"
          onClick={() =>
            updateMutation.mutate({ id: params.id as string, data: { status: "REJECTED" } })
          }
          disabled={params.row.status !== "PENDING"}
        >
          Reject
        </Button>,
      ],
    },
  ];

  if (!companyId) {
    return (
      <Box>
        <PageHeader title="Leave Management" subtitle="Manage leave types and requests" />
        <Card>
          <CardContent>
            <Typography>Please log in to view leave data</Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader
        title="Leave Management"
        subtitle="Manage leave types and requests"
        action={{ label: "Request Leave", onClick: () => setOpenDialog(true) }}
      />
      <Card>
        <CardContent>
          <DataGrid
            rows={leaveRequests || []}
            columns={columns}
            pageSizeOptions={[10]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            disableRowSelectionOnClick
            sx={{ border: "none", height: 500 }}
          />
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Request Leave</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField select fullWidth label="Leave Type" defaultValue="" sx={{ mb: 2 }}>
              {leaveTypes?.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField type="date" fullWidth label="Start Date" InputLabelProps={{ shrink: true }} sx={{ mb: 2 }} />
            <TextField type="date" fullWidth label="End Date" InputLabelProps={{ shrink: true }} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() =>
              createMutation.mutate({
                employeeId: "emp-123",
                companyId,
                leaveTypeId: "lt1",
                status: "PENDING",
              })
            }
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
