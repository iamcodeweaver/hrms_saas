"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Business,
  Email,
  Lock,
} from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import { useCompanyStore } from "@/stores/companyStore";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  companyId: z.string().min(1, "Company ID is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const { setCompany } = useCompanyStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", companyId: "" },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiClient.post("/auth/login", data);
      return response.data;
    },
    onSuccess: async (data, variables) => {
      localStorage.setItem("access_token", data.access_token);
      
      // Decode JWT payload to get user info (base64 middle section)
      try {
        const payload = JSON.parse(atob(data.access_token.split('.')[1]));
        setAuth(data.access_token, {
          id: payload.sub || 'unknown',
          email: payload.email || variables.email,
          companyId: payload.companyId || variables.companyId,
          isActive: true,
        });
      } catch {
        setAuth(data.access_token, {
          id: 'unknown',
          email: variables.email,
          companyId: variables.companyId,
          isActive: true,
        });
      }

      // Fetch company details
      try {
        const companyRes = await apiClient.get(`/companies/${variables.companyId}`);
        setCompany(companyRes.data);
      } catch {
        setCompany({
          id: variables.companyId,
          name: "Company",
          slug: "",
          timezone: "Africa/Lagos",
          currency: "NGN",
          locale: "en",
        });
      }

      router.push("/");
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 480, width: "100%", borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
              HRMS
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to your account
            </Typography>
          </Box>

          {loginMutation.isError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Invalid credentials. Please try again.
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="companyId"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Company ID"
                  margin="normal"
                  error={!!errors.companyId}
                  helperText={errors.companyId?.message}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Business color="action" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email"
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="action" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? <CircularProgress size={24} /> : "Sign In"}
            </Button>

            <Box sx={{ textAlign: "center" }}>
              <Link href="#" variant="body2" color="primary">
                Forgot password?
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
