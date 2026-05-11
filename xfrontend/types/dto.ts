// ==================== AUTH ====================
export interface LoginDto {
  email: string;
  password: string;
  companyId: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface User {
  id: string;
  email: string;
  companyId: string | null;
  isActive: boolean;
}

// ==================== COMPANY ====================
export interface Company {
  id: string;
  name: string;
  slug: string;
  timezone: string;
  currency: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
}

// ==================== EMPLOYEE ====================
export interface Employee {
  id: string;
  employeeNo: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  email: string | null;
  phone: string | null;
  gender: string | null;
  maritalStatus: string | null;
  dateOfBirth: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  photoUrl: string | null;
  hireDate: string | null;
  terminationDate: string | null;
  employmentType: string | null;
  employmentStatus: string | null;
  salary: number | null;
  currency: string | null;
  companyId: string;
  branchId: string | null;
  departmentId: string | null;
  positionId: string | null;
  createdAt: string;
  updatedAt: string;
  branch?: { id: string; name: string };
  department?: { id: string; name: string };
  position?: { id: string; title: string };
  wallet?: { id: string; balance: number };
}

// ==================== ATTENDANCE ====================
export interface AttendanceLog {
  id: string;
  employeeId: string;
  companyId: string;
  punchType: "IN" | "OUT";
  timestamp: string;
  sessionId: string | null;
  deviceId: string | null;
  shiftId: string | null;
}

export interface AttendanceSession {
  id: string;
  employeeId: string;
  companyId: string;
  workDate: string;
  firstIn: string | null;
  lastOut: string | null;
  totalHours: number;
  totalEvents: number;
  lateArrival: boolean;
}

// ==================== LEAVE ====================
export interface LeaveType {
  id: string;
  name: string;
  companyId: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  companyId: string;
  status: string;
  leaveTypeId: string | null;
  approvedById: string | null;
  employee?: { firstName: string; lastName: string };
  leaveType?: { name: string };
  approvedBy?: { email: string };
  createdAt: string;
}

// ==================== PAYROLL ====================
export interface PayrollRun {
  id: string;
  companyId: string;
  periodStart: string;
  periodEnd: string;
  status: "DRAFT" | "PROCESSED" | "PAID";
  createdAt: string;
  updatedAt: string;
}

// ==================== WALLET ====================
export interface WalletTransaction {
  id: string;
  walletId: string;
  companyId: string;
  type: string;
  amount: number;
  reference: string | null;
  status: string;
  createdAt: string;
}

// ==================== RECRUITMENT ====================
export interface JobPosition {
  id: string;
  title: string;
  description: string;
  isPublished: boolean;
  expiresAt: string | null;
}

export interface Applicant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
}

export interface JobApplication {
  id: string;
  applicantId: string;
  jobId: string;
  status: string;
  applicant?: Applicant;
  job?: JobPosition;
}

// ==================== RBAC ====================
export interface Role {
  id: string;
  name: string;
  companyId: string;
}

export interface Permission {
  id: string;
  key: string;
  createdAt: string;
}
