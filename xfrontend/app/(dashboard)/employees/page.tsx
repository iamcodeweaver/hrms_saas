"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Card, CardContent,
  TextField,
  InputAdornment,
  Typography,
  Avatar,
} from "@mui/material";
import { Search, Edit, Visibility, Delete } from "@mui/icons-material";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import PageHeader from "@/components/common/PageHeader";
import StatusChip from "@/components/common/StatusChip";
import { Employee } from "@/types/dto";
import { useCurrentCompanyId } from "@/stores/companyStore";

export default function EmployeesPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const companyId = useCurrentCompanyId();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: employees, isLoading } = useQuery({
    queryKey: ["employees", companyId],
    queryFn: async () => {
      const res = await apiClient.get(`/employees/company/${companyId}`);
      return res.data as Employee[];
    },
    enabled: !!companyId,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/employees/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["employees", companyId] }),
  });

  const filtered = employees?.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.employeeNo} ${emp.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const columns: GridColDef<Employee>[] = [
    { field: "employeeNo", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      width: 250,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar src={params.row.photoUrl || undefined} sx={{ width: 36, height: 36 }}>
            {params.row.firstName[0]}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "department",
      headerName: "Department",
      width: 150,
      valueGetter: (_, row) => row.department?.name || "-",
    },
    {
      field: "position",
      headerName: "Position",
      width: 150,
      valueGetter: (_, row) => row.position?.title || "-",
    },
    {
      field: "employmentStatus",
      headerName: "Status",
      width: 120,
      renderCell: (params) => <StatusChip status={params.value as string} />,
    },
    {
      field: "hireDate",
      headerName: "Hire Date",
      width: 130,
      valueGetter: (value) => (value ? new Date(value).toLocaleDateString() : "-"),
    },
    {
      field: "actions",
      type: "actions",
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          key="view"
          icon={<Visibility />}
          label="View"
          onClick={() => router.push(`/employees/${params.id}`)}
        />,
        <GridActionsCellItem
          key="edit"
          icon={<Edit />}
          label="Edit"
          onClick={() => router.push(`/employees/${params.id}/edit`)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<Delete />}
          label="Delete"
          onClick={() => {
            if (confirm("Delete this employee?")) {
              deleteMutation.mutate(params.id as string);
            }
          }}
        />,
      ],
    },
  ];

  if (!companyId) {
    return (
      <Box>
        <PageHeader title="Employees" subtitle="Manage your workforce" />
        <Card>
          <CardContent>
            <Typography>Please log in to view employees</Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader
        title="Employees"
        subtitle="Manage your workforce"
        action={{
          label: "Add Employee",
          onClick: () => router.push("/employees/new"),
        }}
      />
      <Card>
        <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
          <TextField
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ width: 360 }}
          />
        </Box>
        <DataGrid
          rows={filtered || []}
          columns={columns}
          loading={isLoading}
          pageSizeOptions={[10, 25, 50]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          disableRowSelectionOnClick
          sx={{ border: "none" }}
        />
      </Card>
    </Box>
  );
}
