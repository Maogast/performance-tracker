// src/App.tsx
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme, useMediaQuery } from '@mui/material';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CalendarPage from './pages/CalendarPage';

const App: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const navLinks = [
    { title: 'Dashboard', path: '/' },
    { title: 'History', path: '/history' },
    { title: 'Analytics', path: '/analytics' },
    { title: 'Calendar', path: '/calendar' },
  ];

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navLinks.map((link) => (
          <ListItem
            key={link.title}
            component={Link}
            to={link.path}
            sx={{ cursor: 'pointer' }} // Mimic button behavior
          >
            <ListItemText primary={link.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Performance Tracker for Magare
          </Typography>
          {!isMobile && (
            <>
              {navLinks.map((link) => (
                <Button
                  key={link.title}
                  color="inherit"
                  component={Link}
                  to={link.path}
                >
                  {link.title}
                </Button>
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>

      <Box sx={{ mt: 2 }}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;