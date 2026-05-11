"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Box, Drawer, AppBar, Toolbar, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, IconButton, Typography, Avatar,
  Menu, MenuItem, Badge, Divider, Collapse, Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon, ChevronLeft, ExpandLess, ExpandMore,
  Notifications, Logout, AccountCircle,
} from "@mui/icons-material";
import { navigation } from "@/lib/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useCompanyStore } from "@/stores/companyStore";

const DRAWER_WIDTH = 280;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const pathname = usePathname();
  const { logout, user } = useAuthStore();
  const { currentCompany } = useCompanyStore();

  const handleMenuToggle = (title: string) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: "primary.main", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700 }}>
          H
        </Box>
        {!collapsed && <Typography variant="h6" fontWeight={700} color="primary">HRMS</Typography>}
      </Box>
      <Divider />
      <List sx={{ flex: 1, px: 2, py: 1 }}>
        {navigation.map((item) => {
          const isActive = pathname === item.path || pathname.startsWith(item.path + "/");
          const hasChildren = !!item.children;
          return (
            <Box key={item.title}>
              <ListItem disablePadding>
                <ListItemButton
                  component={hasChildren ? "div" : Link}
                  href={hasChildren ? undefined : item.path}
                  selected={isActive}
                  onClick={hasChildren ? () => handleMenuToggle(item.title) : undefined}
                  sx={{ borderRadius: 2, mb: 0.5, minHeight: 44, "&.Mui-selected": { bgcolor: "primary.main", color: "primary.contrastText", "&:hover": { bgcolor: "primary.dark" }, "& .MuiListItemIcon-root": { color: "inherit" } } }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: isActive ? "inherit" : "text.secondary" }}>
                    <item.icon />
                  </ListItemIcon>
                  {!collapsed && (
                    <>
                      <ListItemText primary={<Typography variant="body2" fontWeight={500}>{item.title}</Typography>} />
                      {hasChildren && (openMenus[item.title] ? <ExpandLess /> : <ExpandMore />)}
                    </>
                  )}
                </ListItemButton>
              </ListItem>
              {hasChildren && !collapsed && (
                <Collapse in={openMenus[item.title]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child) => (
                      <ListItemButton key={child.path} component={Link} href={child.path} selected={pathname === child.path} sx={{ pl: 6, borderRadius: 2, mb: 0.5, "&.Mui-selected": { bgcolor: "action.selected" } }}>
                        <ListItemText primary={<Typography variant="body2" fontSize="0.8125rem">{child.title}</Typography>} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          );
        })}
      </List>
      <Divider />
      {!collapsed && currentCompany && (
        <Box sx={{ p: 2 }}>
          <Typography variant="caption" color="text.secondary">Current Company</Typography>
          <Typography variant="body2" fontWeight={600} noWrap>{currentCompany.name}</Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar position="fixed" sx={{ width: { md: `calc(100% - ${collapsed ? 72 : DRAWER_WIDTH}px)` }, ml: { md: `${collapsed ? 72 : DRAWER_WIDTH}px` } }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2, display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
          <IconButton color="inherit" onClick={() => setCollapsed(!collapsed)} sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
            {collapsed ? <MenuIcon /> : <ChevronLeft />}
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit"><Badge badgeContent={4} color="error"><Notifications /></Badge></IconButton>
          <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ ml: 1 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>{user?.email?.[0]?.toUpperCase() || "U"}</Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
            <MenuItem onClick={() => setAnchorEl(null)}><AccountCircle sx={{ mr: 1 }} /> Profile</MenuItem>
            <MenuItem onClick={() => { logout(); window.location.href = "/login"; }}><Logout sx={{ mr: 1 }} /> Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { md: collapsed ? 72 : DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        <Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)} ModalProps={{ keepMounted: true }} sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: DRAWER_WIDTH } }}>
          {drawer}
        </Drawer>
        <Drawer variant="permanent" sx={{ display: { xs: "none", md: "block" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: collapsed ? 72 : DRAWER_WIDTH, transition: "width 0.3s", overflowX: "hidden" } }} open>
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${collapsed ? 72 : DRAWER_WIDTH}px)` }, mt: 8, backgroundColor: "background.default", minHeight: "100vh" }}>
        {children}
      </Box>
    </Box>
  );
}
