"use client";
import { Box, Typography, Button, Breadcrumbs, Link } from "@mui/material";
import { Add } from "@mui/icons-material";

export default function PageHeader({
  title,
  subtitle,
  action,
  breadcrumbs,
}: {
  title: string;
  subtitle?: string;
  action?: { label: string; onClick: () => void };
  breadcrumbs?: { label: string; href?: string }[];
}) {
  return (
    <Box sx={{ mb: 3 }}>
      {breadcrumbs && (
        <Breadcrumbs sx={{ mb: 1 }}>
          {breadcrumbs.map((c, i) => (
            <Link key={i} href={c.href || "#"} color="inherit" underline="hover">{c.label}</Link>
          ))}
        </Breadcrumbs>
      )}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>{title}</Typography>
          {subtitle && <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{subtitle}</Typography>}
        </Box>
        {action && (
          <Button variant="contained" startIcon={<Add />} onClick={action.onClick}>{action.label}</Button>
        )}
      </Box>
    </Box>
  );
}
