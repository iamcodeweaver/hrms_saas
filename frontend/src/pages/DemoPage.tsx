import { Box, Typography, Grid, Paper } from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';

const attendanceData = [
  { month: 'Jan', attendance: 92 },
  { month: 'Feb', attendance: 88 },
  { month: 'Mar', attendance: 95 },
  { month: 'Apr', attendance: 90 },
  { month: 'May', attendance: 93 },
  { month: 'Jun', attendance: 97 },
];

const payrollData = [
  { name: 'Salaries', value: 60 },
  { name: 'Benefits', value: 25 },
  { name: 'Deductions', value: 15 },
];
const COLORS = ['#1976d2', '#4caf50', '#ff9800'];

const recruitmentData = [
  { stage: 'Applied', count: 40 },
  { stage: 'Screened', count: 30 },
  { stage: 'Interviewed', count: 20 },
  { stage: 'Hired', count: 10 },
];

export default function DemoPage() {
  return (
    <Box sx={{ py: 8, px: 4 }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        HRMS Dashboard Demo
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        gutterBottom
        sx={{
          textAlign: 'center',
        }}
      >
        Explore live analytics for attendance, payroll, and recruitment.
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {/* Attendance Overview */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Attendance Overview</Typography>
            <LineChart width={400} height={250} data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="attendance" stroke="#1976d2" strokeWidth={2} />
            </LineChart>
          </Paper>
        </Grid>

        {/* Payroll Summary */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Payroll Summary</Typography>
            <PieChart width={400} height={250}>
              <Pie
                data={payrollData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {payrollData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Paper>
        </Grid>

        {/* Recruitment Funnel */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Recruitment Funnel</Typography>
            <BarChart width={800} height={300} data={recruitmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#4caf50" />
            </BarChart>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
