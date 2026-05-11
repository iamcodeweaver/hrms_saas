"use client";

import { useState } from "react";
import { MenuItem,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tabs,
  Tab,
  Avatar,
} from "@mui/material";
import { Add, Person } from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import PageHeader from "@/components/common/PageHeader";
import { JobPosition, JobApplication, Applicant } from "@/types/dto";

const APPLICATION_STAGES = [
  { id: "APPLIED", label: "Applied", color: "#64748b" },
  { id: "SHORTLISTED", label: "Shortlisted", color: "#3b82f6" },
  { id: "INTERVIEW", label: "Interview", color: "#f59e0b" },
  { id: "OFFERED", label: "Offered", color: "#8b5cf6" },
  { id: "HIRED", label: "Hired", color: "#10b981" },
  { id: "REJECTED", label: "Rejected", color: "#f43f5e" },
];

export default function RecruitmentPage() {
  const [tab, setTab] = useState(0);
  const [openJobDialog, setOpenJobDialog] = useState(false);
  const queryClient = useQueryClient();

  const { data: jobPositions } = useQuery({
    queryKey: ["job-positions"],
    queryFn: async () => {
      const response = await apiClient.get("/recruitment/job-positions/comp1");
      return response.data as JobPosition[];
    },
  });

  const { data: applications } = useQuery({
    queryKey: ["job-applications"],
    queryFn: async () => {
      const response = await apiClient.get("/recruitment/applications/j1");
      return response.data as JobApplication[];
    },
  });

  const { data: applicants } = useQuery({
    queryKey: ["applicants"],
    queryFn: async () => {
      const response = await apiClient.get("/recruitment/applicants/comp1");
      return response.data as Applicant[];
    },
  });

  const createJobMutation = useMutation({
    mutationFn: (data: any) =>
      apiClient.post("/recruitment/job-position", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-positions"] });
      setOpenJobDialog(false);
    },
  });

  return (
    <Box>
      <PageHeader
        title="Recruitment"
        subtitle="Manage job postings and track applicants"
        action={{ label: "Post Job", onClick: () => setOpenJobDialog(true) }}
      />

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Job Positions" />
        <Tab label="Applications" />
        <Tab label="Applicants" />
      </Tabs>

      {tab === 0 && (
        <Grid container spacing={3}>
          {jobPositions?.map((job) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={job.id}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" fontWeight={600}>
                      {job.title}
                    </Typography>
                    <Chip
                      size="small"
                      label={job.isPublished ? "Published" : "Draft"}
                      color={job.isPublished ? "success" : "default"}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {job.description}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {job.expiresAt
                        ? `Expires: ${new Date(job.expiresAt).toLocaleDateString()}`
                        : "No expiry"}
                    </Typography>
                    <Button size="small" variant="outlined">
                      View Applications
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tab === 1 && (
        <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 2 }}>
          {APPLICATION_STAGES.map((stage) => (
            <Box key={stage.id} sx={{ minWidth: 280, maxWidth: 280 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: stage.color,
                  }}
                />
                <Typography variant="subtitle2" fontWeight={600}>
                  {stage.label}
                </Typography>
                <Chip
                  size="small"
                  label={
                    applications?.filter((a) => a.status === stage.id)
                      .length || 0
                  }
                />
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
              >
                {applications
                  ?.filter((app) => app.status === stage.id)
                  .map((app) => (
                    <Card key={app.id} sx={{ cursor: "grab" }}>
                      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mb: 1,
                          }}
                        >
                          <Avatar sx={{ width: 32, height: 32 }}>
                            {app.applicant?.firstName?.[0]}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight={600}>
                              {app.applicant?.firstName}{" "}
                              {app.applicant?.lastName}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {app.applicant?.email}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          Applied for: {app.job?.title}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {tab === 2 && (
        <Grid container spacing={3}>
          {applicants?.map((applicant) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={applicant.id}>
              <Card>
                <CardContent>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: 2 }}
                  >
                    <Avatar sx={{ width: 48, height: 48 }}>
                      <Person />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {applicant.firstName} {applicant.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {applicant.email}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={openJobDialog}
        onClose={() => setOpenJobDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Post New Job</DialogTitle>
        <DialogContent>
          <Box
            sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField label="Job Title" fullWidth />
            <TextField label="Description" multiline rows={4} fullWidth />
            <TextField select label="Department" fullWidth>
              <MenuItem value="eng">Engineering</MenuItem>
              <MenuItem value="hr">Human Resources</MenuItem>
            </TextField>
            <TextField
              type="date"
              label="Expiry Date"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenJobDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() =>
              createJobMutation.mutate({
                companyId: "comp1",
                title: "Software Engineer",
                description: "Build amazing products",
              })
            }
          >
            Post Job
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
