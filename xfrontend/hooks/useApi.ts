import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { useCompanyStore } from "@/stores/companyStore";

// ==================== EMPLOYEES ====================
export const useEmployees = (companyId: string) =>
  useQuery({
    queryKey: ["employees", companyId],
    queryFn: async () => {
      const res = await apiClient.get(`/employees/company/${companyId}`);
      return res.data;
    },
    enabled: !!companyId,
  });

export const useEmployee = (id: string) =>
  useQuery({
    queryKey: ["employee", id],
    queryFn: async () => {
      const res = await apiClient.get(`/employees/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

// ==================== ATTENDANCE ====================
export const useAttendanceLogs = (companyId: string) =>
  useQuery({
    queryKey: ["attendance-logs", companyId],
    queryFn: async () => {
      const res = await apiClient.get(`/attendance/logs/${companyId}`);
      return res.data;
    },
    enabled: !!companyId,
  });

export const useClockIn = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => apiClient.post("/attendance/clock-in", data),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["attendance-logs", vars.companyId] });
    },
  });
};

export const useClockOut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => apiClient.post("/attendance/clock-out", data),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["attendance-logs", vars.companyId] });
    },
  });
};

// ==================== LEAVE ====================
export const useLeaveTypes = (companyId: string) =>
  useQuery({
    queryKey: ["leave-types", companyId],
    queryFn: async () => {
      const res = await apiClient.get(`/leave/types/${companyId}`);
      return res.data;
    },
    enabled: !!companyId,
  });

export const useLeaveRequests = (companyId: string) =>
  useQuery({
    queryKey: ["leave-requests", companyId],
    queryFn: async () => {
      const res = await apiClient.get(`/leave/requests/${companyId}`);
      return res.data;
    },
    enabled: !!companyId,
  });

// ==================== PAYROLL ====================
export const usePayrollRuns = (companyId: string) =>
  useQuery({
    queryKey: ["payroll-runs", companyId],
    queryFn: async () => {
      const res = await apiClient.get(`/payroll/runs/${companyId}`);
      return res.data;
    },
    enabled: !!companyId,
  });

export const usePayrolls = (companyId: string) =>
  useQuery({
    queryKey: ["payrolls", companyId],
    queryFn: async () => {
      const res = await apiClient.get(`/payroll/company/${companyId}`);
      return res.data;
    },
    enabled: !!companyId,
  });

// ==================== RECRUITMENT ====================
export const useJobPositions = (companyId: string) =>
  useQuery({
    queryKey: ["job-positions", companyId],
    queryFn: async () => {
      const res = await apiClient.get(`/recruitment/job-positions/${companyId}`);
      return res.data;
    },
    enabled: !!companyId,
  });

export const useApplicants = (companyId: string) =>
  useQuery({
    queryKey: ["applicants", companyId],
    queryFn: async () => {
      const res = await apiClient.get(`/recruitment/applicants/${companyId}`);
      return res.data;
    },
    enabled: !!companyId,
  });

export const useApplications = (jobId: string) =>
  useQuery({
    queryKey: ["applications", jobId],
    queryFn: async () => {
      const res = await apiClient.get(`/recruitment/applications/${jobId}`);
      return res.data;
    },
    enabled: !!jobId,
  });

// ==================== WALLET ====================
export const useWallet = (id: string) =>
  useQuery({
    queryKey: ["wallet", id],
    queryFn: async () => {
      const res = await apiClient.get(`/wallets/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

// ==================== COMPANY-AWARE HELPER ====================
export const useCurrentCompanyId = () => {
  const { currentCompany } = useCompanyStore();
  return currentCompany?.id;
};
