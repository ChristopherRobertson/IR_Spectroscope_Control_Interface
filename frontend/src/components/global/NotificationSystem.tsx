import React, { useEffect } from 'react';
import { Snackbar, Alert, AlertTitle, Slide, SlideProps } from '@mui/material';
import { useAppContext, useAppActions } from '../../contexts/AppContext';

/**
 * Slide transition component for notifications
 */
function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

/**
 * NotificationSystem component that displays toast notifications
 * for user feedback on actions, errors, and system status updates.
 * Automatically manages notification lifecycle and dismissal.
 */
const NotificationSystem: React.FC = () => {
  const { state } = useAppContext();
  const { removeNotification } = useAppActions();

  // Get the most recent notification to display
  const currentNotification = state.notifications[state.notifications.length - 1];

  // Auto-dismiss notifications after their duration
  useEffect(() => {
    if (currentNotification && currentNotification.duration) {
      const timer = setTimeout(() => {
        removeNotification(currentNotification.id);
      }, currentNotification.duration);

      return () => clearTimeout(timer);
    }
  }, [currentNotification, removeNotification]);

  // Handle manual dismissal
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    if (currentNotification) {
      removeNotification(currentNotification.id);
    }
  };

  // Don't render if no notifications
  if (!currentNotification) {
    return null;
  }

  // Map notification types to MUI Alert severities
  const getSeverity = (type: string) => {
    switch (type) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'info';
    }
  };

  // Get appropriate title for notification type
  const getTitle = (type: string) => {
    switch (type) {
      case 'success':
        return 'Success';
      case 'error':
        return 'Error';
      case 'warning':
        return 'Warning';
      case 'info':
        return 'Information';
      default:
        return '';
    }
  };

  return (
    <Snackbar
      open={true}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      sx={{
        mb: 6, // Margin bottom to account for status bar
      }}
    >
      <Alert
        onClose={handleClose}
        severity={getSeverity(currentNotification.type)}
        variant="filled"
        sx={{
          minWidth: 300,
          maxWidth: 500,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
          borderRadius: 2,
        }}
      >
        <AlertTitle sx={{ fontWeight: 600 }}>
          {getTitle(currentNotification.type)}
        </AlertTitle>
        {currentNotification.message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationSystem;

