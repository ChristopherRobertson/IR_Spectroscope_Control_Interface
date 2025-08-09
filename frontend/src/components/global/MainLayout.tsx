import React from 'react';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import StatusBar from './StatusBar';
import NotificationSystem from './NotificationSystem';

/**
 * MainLayout component that provides the overall page structure
 * for the IR Spectroscopy Control Interface application.
 * 
 * Layout structure:
 * - Navbar at the top
 * - Main content area in the middle (where device panels are displayed)
 * - StatusBar at the bottom
 * - NotificationSystem for toast messages
 */
const MainLayout: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          pt: 2, // Padding top to account for navbar
          pb: 2, // Padding bottom to account for status bar
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* This is where the routed content (device panels) will be displayed */}
          <Outlet />
        </Container>
      </Box>

      {/* Status Bar */}
      <StatusBar />

      {/* Notification System for Toast Messages */}
      <NotificationSystem />
    </Box>
  );
};

export default MainLayout;

