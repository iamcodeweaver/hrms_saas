"use client";

import { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
  Divider,
} from "@mui/material";
import {
  AccountBalanceWallet,
  ArrowUpward,
  ArrowDownward,
  History,
} from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import PageHeader from "@/components/common/PageHeader";
import { WalletTransaction } from "@/types/dto";

export default function WalletPage() {
  const [openTransactionDialog, setOpenTransactionDialog] = useState(false);
  const [transactionType, setTransactionType] = useState<"CREDIT" | "DEBIT">(
    "CREDIT"
  );
  const queryClient = useQueryClient();

  const { data: transactions } = useQuery({
    queryKey: ["wallet-transactions"],
    queryFn: async () => {
      const response = await apiClient.get("/wallet/transactions/comp1");
      return response.data as WalletTransaction[];
    },
  });

  const createTransactionMutation = useMutation({
    mutationFn: (data: any) => apiClient.post("/wallets/transactions", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet-transactions"] });
      setOpenTransactionDialog(false);
    },
  });

  const transactionColumns: GridColDef<WalletTransaction>[] = [
    {
      field: "createdAt",
      headerName: "Date",
      width: 180,
      valueGetter: (v) => new Date(v).toLocaleString(),
    },
    {
      field: "type",
      headerName: "Type",
      width: 100,
      renderCell: (p) => (
        <Chip
          size="small"
          color={p.value === "CREDIT" ? "success" : "error"}
          icon={p.value === "CREDIT" ? <ArrowUpward /> : <ArrowDownward />}
          label={p.value}
        />
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      valueGetter: (v) => `₦${Number(v).toLocaleString()}`,
    },
    { field: "reference", headerName: "Reference", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (p) => <Chip size="small" label={p.value} />,
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Wallet Management"
        subtitle="Employee wallets and transactions"
        action={{
          label: "New Transaction",
          onClick: () => setOpenTransactionDialog(true),
        }}
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <AccountBalanceWallet color="primary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Wallet Balance
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                    ₦2,450,000
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="body2" color="success.main">
                    +₦500,000
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    This month
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="body2" color="error.main">
                    -₦150,000
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    This month
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                <History sx={{ verticalAlign: "middle", mr: 1 }} />
                Transaction History
              </Typography>
              <DataGrid
                rows={transactions || []}
                columns={transactionColumns}
                pageSizeOptions={[10]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                disableRowSelectionOnClick
                sx={{ border: "none", height: 400 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={openTransactionDialog}
        onClose={() => setOpenTransactionDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>New Transaction</DialogTitle>
        <DialogContent>
          <Box
            sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              select
              label="Transaction Type"
              value={transactionType}
              onChange={(e) =>
                setTransactionType(e.target.value as "CREDIT" | "DEBIT")
              }
              fullWidth
            >
              <MenuItem value="CREDIT">Credit (Add Funds)</MenuItem>
              <MenuItem value="DEBIT">Debit (Deduct Funds)</MenuItem>
            </TextField>
            <TextField label="Wallet ID" fullWidth />
            <TextField label="Amount" type="number" fullWidth />
            <TextField label="Reference" fullWidth />
            <TextField label="Description" multiline rows={2} fullWidth />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTransactionDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              createTransactionMutation.mutate({
                walletId: "w1",
                companyId: "comp1",
                type: transactionType,
                amount: 1000,
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
