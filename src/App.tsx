// src/App.tsx
import React, { useState, useEffect } from 'react';
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
  Switch,
  CssBaseline,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CalendarPage from './pages/CalendarPage';

const App: React.FC = () => {
  // Manage dark mode state, optionally persisting preference in localStorage
  const storedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode, setDarkMode] = useState(storedDarkMode);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // Create a MUI theme based on the darkMode flag
  const customTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      // You can customize primary/secondary colors as needed:
      primary: {
        main: darkMode ? '#90caf9' : '#2196f3',
      },
      secondary: {
        main: darkMode ? '#f48fb1' : '#f50057',
      },
    },
  });

  // Use customTheme for breakpoints
  const isMobile = useMediaQuery(customTheme.breakpoints.down('sm'));

  // Drawer state for mobile navigation
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

  // Handler for toggling dark mode
  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={customTheme}>
      {/* CssBaseline applies a consistent baseline styling */}
      <CssBaseline />
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

            {/* Navigation for desktop */}
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

            {/* Dark mode toggle switch */}
            <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ mr: 0.5 }}>
                {darkMode ? 'Dark' : 'Light'}
              </Typography>
              <Switch checked={darkMode} onChange={handleDarkModeToggle} />
            </Box>
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
    </ThemeProvider>
  );
};

export default App;