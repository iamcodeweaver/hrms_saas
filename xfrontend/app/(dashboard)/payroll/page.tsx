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
  Stepper,
  Step,
  StepLabel,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import PageHeader from "@/components/common/PageHeader";
import StatusChip from "@/components/common/StatusChip";
import { PayrollRun } from "@/types/dto";
import { useCurrentCompanyId } from "@/stores/companyStore";

export default function PayrollPage() {
  const [openRunDialog, setOpenRunDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const queryClient = useQueryClient();
  const companyId = useCurrentCompanyId();

  const { data: payrollRuns } = useQuery({
    queryKey: ["payroll-runs", companyId],
    queryFn: async () => {
      const res = await apiClient.get(`/payroll/runs/${companyId}`);
      return res.data as PayrollRun[];
    },
    enabled: !!companyId,
  });

  const createRunMutation = useMutation({
    mutationFn: (data: any) => apiClient.post("/payroll/runs", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payroll-runs", companyId] });
      setOpenRunDialog(false);
    },
  });

  const columns: GridColDef<PayrollRun>[] = [
    {
      field: "periodStart",
      headerName: "Period Start",
      width: 150,
      valueGetter: (v) => new Date(v).toLocaleDateString(),
    },
    {
      field: "periodEnd",
      headerName: "Period End",
      width: 150,
      valueGetter: (v) => new Date(v).toLocaleDateString(),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (p) => <StatusChip status={p.value as string} />,
    },
    {
      field: "createdAt",
      headerName: "Created",
      width: 180,
      valueGetter: (v) => new Date(v).toLocaleDateString(),
    },
    {
      field: "actions",
      type: "actions",
      width: 150,
      getActions: () => [
        <Button size="small" key="process" onClick={() => setActiveStep(1)}>
          Process
        </Button>,
      ],
    },
  ];

  const steps = ["Select Period", "Review Employees", "Calculate", "Review", "Finalize"];

  if (!companyId) {
    return (
      <Box>
        <PageHeader title="Payroll" subtitle="Manage payroll runs" />
        <Card>
          <CardContent>
            <Typography>Please log in to view payroll</Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader
        title="Payroll"
        subtitle="Manage payroll runs and employee payments"
        action={{ label: "New Payroll Run", onClick: () => setOpenRunDialog(true) }}
      />

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <DataGrid
            rows={payrollRuns || []}
            columns={columns}
            pageSizeOptions={[10]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            disableRowSelectionOnClick
            sx={{ border: "none", height: 400 }}
          />
        </CardContent>
      </Card>

      {activeStep > 0 && (
        <Card>
          <CardContent>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === 1 && <Typography>Review employee list...</Typography>}
            {activeStep === 2 && <Typography>Calculating salaries...</Typography>}
            {activeStep === 3 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Payroll Summary
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Employee</TableCell>
                      <TableCell align="right">Gross Pay</TableCell>
                      <TableCell align="right">Deductions</TableCell>
                      <TableCell align="right">Net Pay</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell align="right">₦500,000</TableCell>
                      <TableCell align="right">₦50,000</TableCell>
                      <TableCell align="right">₦450,000</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            )}

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
              <Button disabled={activeStep === 0} onClick={() => setActiveStep((s) => s - 1)}>
                Back
              </Button>
              <Button variant="contained" onClick={() => setActiveStep((s) => s + 1)}>
                {activeStep === steps.length - 1 ? "Finalize" : "Next"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      <Dialog open={openRunDialog} onClose={() => setOpenRunDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Payroll Run</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField type="date" label="Period Start" slotProps={{ inputLabel: { shrink: true } }} fullWidth />
            <TextField type="date" label="Period End" slotProps={{ inputLabel: { shrink: true } }} fullWidth />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRunDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() =>
              createRunMutation.mutate({
                companyId,
                periodStart: new Date().toISOString(),
                periodEnd: new Date().toISOString(),
              })
            }
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
