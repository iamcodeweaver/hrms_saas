import {
  Dashboard, Business, People, AccessTime, EventNote,
  Payments, AccountBalanceWallet, Work, TrendingUp,
  School, Inventory, Gavel, BarChart, Settings, Shield,
  AccountTree,
} from "@mui/icons-material";

export interface NavItem {
  title: string;
  path: string;
  icon: React.ElementType;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  { title: "Dashboard", path: "/", icon: Dashboard },
  {
    title: "Organization", path: "/organization", icon: AccountTree,
    children: [
      { title: "Companies", path: "/companies", icon: Business },
      { title: "Branches", path: "/branches", icon: Business },
      { title: "Departments", path: "/departments", icon: Business },
      { title: "Positions", path: "/positions", icon: Business },
    ],
  },
  { title: "Employees", path: "/employees", icon: People },
  { title: "Attendance", path: "/attendance", icon: AccessTime },
  { title: "Leave", path: "/leave", icon: EventNote },
  { title: "Payroll", path: "/payroll", icon: Payments },
  { title: "Wallet", path: "/wallet", icon: AccountBalanceWallet },
  { title: "Recruitment", path: "/recruitment", icon: Work },
  { title: "Performance", path: "/performance", icon: TrendingUp },
  { title: "Training", path: "/training", icon: School },
  { title: "Assets", path: "/assets", icon: Inventory },
  { title: "Compliance", path: "/compliance", icon: Gavel },
  { title: "Analytics", path: "/analytics", icon: BarChart },
  { title: "RBAC", path: "/rbac", icon: Shield },
  { title: "Settings", path: "/settings", icon: Settings },
];
