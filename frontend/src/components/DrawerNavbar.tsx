import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, ListItemButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';

export default function DrawerNavbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  const navLinks = [
    { text: 'Home', path: '/' },
    { text: 'Demo', path: '/demo' },
    { text: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">HRMS</Typography>
          <IconButton color="inherit" edge="end" onClick={toggleDrawer(true)} sx={{ display: { xs: 'block', md: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {navLinks.map((link) => (
              <Typography
                key={link.text}
                component={RouterLink}
                to={link.path}
                style={{ color: 'white', marginLeft: 16, textDecoration: 'none' }}
              >
                {link.text}
              </Typography>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {navLinks.map((link) => (
              <ListItem disablePadding key={link.text}>
                <ListItemButton
                  component={RouterLink}
                  to={link.path}
                >
                  <ListItemText primary={link.text} />
                </ListItemButton>
              </ListItem>            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
