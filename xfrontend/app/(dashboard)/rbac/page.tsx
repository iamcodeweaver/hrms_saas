"use client";

import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  Chip,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
import { Add, Shield, Key } from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import PageHeader from "@/components/common/PageHeader";
import { Role, Permission } from "@/types/dto";

const PERMISSIONS = [
  "VIEW_EMPLOYEES",
  "CREATE_EMPLOYEE",
  "UPDATE_EMPLOYEE",
  "DELETE_EMPLOYEE",
  "VIEW_PAYROLL",
  "PROCESS_PAYROLL",
  "VIEW_ATTENDANCE",
  "MANAGE_ATTENDANCE",
  "VIEW_LEAVE",
  "APPROVE_LEAVE",
  "VIEW_RECRUITMENT",
  "MANAGE_RECRUITMENT",
  "VIEW_ANALYTICS",
  "MANAGE_SETTINGS",
  "MANAGE_RBAC",
];

export default function RbacPage() {
  const [tab, setTab] = useState(0);
  const [openRoleDialog, setOpenRoleDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const response = await apiClient.get("/rbac/roles");
      return response.data as Role[];
    },
  });

  const { data: permissions } = useQuery({
    queryKey: ["permissions"],
    queryFn: async () => {
      const response = await apiClient.get("/rbac/permissions");
      return response.data as Permission[];
    },
  });

  const createRoleMutation = useMutation({
    mutationFn: (data: any) => apiClient.post("/rbac/roles", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      setOpenRoleDialog(false);
    },
  });

  const attachPermissionMutation = useMutation({
    mutationFn: ({
      roleId,
      permissionId,
    }: {
      roleId: string;
      permissionId: string;
    }) => apiClient.post(`/rbac/roles/${roleId}/permissions/${permissionId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["roles"] }),
  });

  return (
    <Box>
      <PageHeader
        title="Role-Based Access Control"
        subtitle="Manage roles and permissions"
      />

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Roles" icon={<Shield />} iconPosition="start" />
        <Tab label="Permissions" icon={<Key />} iconPosition="start" />
      </Tabs>

      {tab === 0 && (
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                Roles
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setOpenRoleDialog(true)}
              >
                Create Role
              </Button>
            </Box>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Role Name</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Permissions</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roles?.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>
                      <Typography fontWeight={600}>{role.name}</Typography>
                    </TableCell>
                    <TableCell>{role.companyId}</TableCell>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}
                      >
                        {PERMISSIONS.slice(0, 3).map((p) => (
                          <Chip
                            key={p}
                            size="small"
                            label={p}
                            variant="outlined"
                          />
                        ))}
                        <Chip size="small" label="+3 more" />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        onClick={() => setSelectedRole(role.id)}
                      >
                        Manage Permissions
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Dialog
              open={!!selectedRole}
              onClose={() => setSelectedRole(null)}
              maxWidth="md"
              fullWidth
            >
              <DialogTitle>Manage Role Permissions</DialogTitle>
              <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  {PERMISSIONS.map((permission) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={permission}>
                      <Card variant="outlined">
                        <CardContent
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            py: 1,
                            "&:last-child": { pb: 1 },
                          }}
                        >
                          <Checkbox
                            onChange={(e) => {
                              if (e.target.checked && selectedRole) {
                                attachPermissionMutation.mutate({
                                  roleId: selectedRole,
                                  permissionId: permission,
                                });
                              }
                            }}
                          />
                          <Typography variant="body2">{permission}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setSelectedRole(null)}>Done</Button>
              </DialogActions>
            </Dialog>
          </CardContent>
        </Card>
      )}

      {tab === 1 && (
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                Permissions
              </Typography>
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Permission Key</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {permissions?.map((perm) => (
                  <TableRow key={perm.id}>
                    <TableCell>
                      <Chip
                        label={perm.key}
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(perm.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Dialog
        open={openRoleDialog}
        onClose={() => setOpenRoleDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Role</DialogTitle>
        <DialogContent>
          <TextField label="Role Name" fullWidth sx={{ mt: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRoleDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() =>
              createRoleMutation.mutate({
                name: "New Role",
                companyId: "comp1",
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
