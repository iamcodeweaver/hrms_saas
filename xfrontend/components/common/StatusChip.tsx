"use client";
import { Chip } from "@mui/material";

const statusConfig: Record<string, { color: "success" | "error" | "warning" | "info" | "default"; label: string }> = {
  ACTIVE: { color: "success", label: "Active" },
  TERMINATED: { color: "error", label: "Terminated" },
  PENDING: { color: "warning", label: "Pending" },
  APPROVED: { color: "success", label: "Approved" },
  REJECTED: { color: "error", label: "Rejected" },
  PRESENT: { color: "success", label: "Present" },
  ABSENT: { color: "error", label: "Absent" },
  DRAFT: { color: "default", label: "Draft" },
  PAID: { color: "success", label: "Paid" },
};

export default function StatusChip({ status }: { status: string }) {
  const config = statusConfig[status] || { color: "default", label: status };
  return <Chip size="small" color={config.color} label={config.label} />;
}
